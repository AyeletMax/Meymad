const db = require('../../database/db');

exports.getAllComments = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM comments ORDER BY created_at ASC');
        return rows;
    } catch (error) {
        console.error('Error in getAllComments:', error);
        throw error;
    }
};

exports.createComment = async ({ user_id, name, email, body, parent_id = null, rating = null }) => {
    try {
        const [result] = await db.query(
            'INSERT INTO comments (user_id, name, email, body, parent_id, rating) VALUES (?, ?, ?, ?, ?, ?)',
            [user_id, name, email, body, parent_id, rating]
        );

        const [newComment] = await db.query(
            'SELECT * FROM comments WHERE id = ?',
            [result.insertId]
        );

        return newComment[0];
    } catch (error) {
        console.error('Error in createComment:', error);
        throw error;
    }
};

exports.updateComment = async (id, { name, email, body, rating = null }) => {
    try {
        await db.query(
            'UPDATE comments SET name = ?, email = ?, body = ?, rating = ? WHERE id = ?',
            [name, email, body, rating, id]
        );

        const [updatedComment] = await db.query('SELECT * FROM comments WHERE id = ?', [id]);
        return updatedComment[0];
    } catch (error) {
        console.error('Error in updateComment:', error);
        throw error;
    }
};

exports.deleteComment = async (id) => {
    try {
        await db.query('DELETE FROM comments WHERE parent_id = ?', [id]);

        const [result] = await db.query('DELETE FROM comments WHERE id = ?', [id]);

        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error in deleteComment:', error);
        throw error;
    }
};

exports.getCommentById = async (id) => {
    try {
        const [comment] = await db.query('SELECT * FROM comments WHERE id = ?', [id]);
        return comment.length > 0 ? comment[0] : null;
    } catch (error) {
        console.error('Error in getCommentById:', error);
        throw error;
    }
};

exports.checkParentExists = async (parentId) => {
    try {
        const [parentExists] = await db.query('SELECT id FROM comments WHERE id = ?', [parentId]);
        return parentExists.length > 0;
    } catch (error) {
        console.error('Error in checkParentExists:', error);
        throw error;
    }
};
