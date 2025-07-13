const usersService = require('../service/users.service');
require('dotenv').config();
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    try {
        if (Object.keys(req.query).length > 0) {
            const result = await usersService.searchUsers(req.query);
            res.status(200).json(result);
        } else {
            const users = await usersService.getAllUsers();
            res.status(200).json(users);
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching users. Please try again later.' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await usersService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User with id:' + id + ' not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching user details. Please try again later.' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updated = await usersService.updateUser(id, req.body);
        if (!updated) {
            return res.status(404).json({ error: 'User with id:' + id + ' not found or update failed' }); 
        }

        const userForCookie = {
            id: updated.id,
            username: updated.username,
            email: updated.email
        };
        res.cookie('currentUser', JSON.stringify(userForCookie), {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'development ',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating user details. Please try again later.' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await usersService.deleteUser(req.params.id);
        res.status(200).json({ message: 'user ' + req.params.id + ' deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error. ' + error.message });
    }
};
exports.toggleBlockUser = async (req, res) => {
    const userId = req.params.id;
    const { isBlocked } = req.body;

    try {
        await usersService.toggleBlockUser(userId, isBlocked);
        res.status(200).json({ message: `User ${userId} block status updated to ${isBlocked}` });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error. ' + error.message });
    }
};

