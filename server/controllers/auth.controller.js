const authService = require('../service/auth.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userFromDb = await authService.getUserByemail(email);
        if (!userFromDb)
            return res.status(401).json({ error: 'שם משתמש או הסיסמה שגויים' });

        const storedPassword = await authService.getPasswordByUser_id(userFromDb.id);
        const isPasswordCorrect = await bcrypt.compare(password, storedPassword[0][0].password_hash);

        if (!isPasswordCorrect)
            return res.status(401).json({ error: 'שם משתמש או הסיסמה שגויים' });

        if (userFromDb.isBlocked)
            return res.status(403).json({ error: 'המשתמש נחסם על ידי מנהל ואינו יכול להתחבר' });

        const user = {
            id: userFromDb.id,
            username: userFromDb.username,
            email: userFromDb.email,
            role: userFromDb.role
        };

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development ',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error. ' + error.message });
    }
};

exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await authService.getUserByemail(email);
        if (existingUser)
            return res.status(400).json({ error: 'המייל כבר קיים, אנא נסה עם מייל אחר' });

        const password_hash = await bcrypt.hash(password, 10);
        req.body.password = password_hash;

        const newUser = await authService.createUser(req.body);

        const user = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        };

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development ',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({ user });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'אירעה שגיאה בעת יצירת חשבונך. אנא נסה שוב מאוחר יותר.' });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'התנתקת בהצלחה' });
};

exports.getCurrentUser = (req, res) => {
    
    if (req.user) {
        return res.status(200).json(req.user);
    }

    return res.status(401).json({ error: 'לא מחובר' });
};
