const db = require('../../database/db');
exports.createUser = async (user) => {
    try {
        const { username, email, phone, address, password } = user;
        const [result] = await db.query(
            'INSERT INTO users (username, email, phone, address) VALUES (?, ?, ?, ?)',
            [username, email, phone, address]
        );
        const userId = result.insertId;
        await db.query(
            'INSERT INTO passwords (user_id, password_hash) VALUES (?, ?)',
            [userId, password]
        );
        return { id: userId, username, email, phone, address };
    }
    catch (err) {
        throw new Error('Error creating user: ' + err.message);
    }
};

exports.getUserByemail = async (email) => {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0] || null;
    } catch (err) {
        console.error('Error fetching user by email:', err);
        throw new Error('Error fetching user by email: ' + err.message);
    }
}

exports.getPasswordByUser_id = async (userId) => {
    try {
        const row = await db.query('SELECT password_hash FROM passwords WHERE user_id = ?', [userId]);
        return row;
    } catch (err) {
        console.error('Error fetching user password:', err);
        throw new Error('Error fetching user password: ' + err.message);
    }
}