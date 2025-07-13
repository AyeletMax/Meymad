const db = require('../../database/db');

exports.createManagerMessage = async (messageData) => {
    try {
        const { reservation_id, user_id, message_type, message_content } = messageData;

        const sql = `
            INSERT INTO messages (reservation_id, user_id, message_type, message_content, status)
            VALUES (?, ?, ?, ?, 'pending')
        `;

        const [result] = await db.query(sql, [reservation_id, user_id, message_type, message_content]);

        return {
            id: result.insertId,
            ...messageData,
            status: 'pending',
            created_at: new Date().toISOString()
        };
    } catch (error) {
        console.error('Error in createManagerMessage:', error);
        throw error;
    }
};

exports.getAllManagerMessages = async () => {
    try {
        const sql = `
            SELECT 
                mm.*,
                r.openTime,
                r.closeTime,
                r.status AS reservation_status,
                r.num_of_people,
                r.manager_comment,
                r.payment,
                u.username,
                u.email,
                u.phone,
                u.address
            FROM messages mm
            LEFT JOIN reservations r ON mm.reservation_id = r.id
            LEFT JOIN users u ON mm.user_id = u.id
            ORDER BY mm.created_at DESC;
        `;
        const [rows] = await db.query(sql);
        return rows;
    } catch (error) {
        console.error('Error in getAllManagerMessages:', error);
        throw error;
    }
};

exports.deleteManagerMessage = async (messageId) => {
    try {
        const sql = `DELETE FROM messages WHERE id = ?`;
        const [result] = await db.query(sql, [messageId]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error in deleteManagerMessage:', error);
        throw error;
    }
};
