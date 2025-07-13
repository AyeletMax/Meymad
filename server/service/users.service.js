const db = require('../../database/db');

exports.getPasswordByUser_id = async (userId) => {
    try {
        const row = await db.query('SELECT password_hash FROM passwords WHERE user_id = ?', [userId]);
        return row;
    } catch (err) {
        throw new Error('Error fetching user password: ' + err.message);
    }
}

exports.getAllUsers = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    } catch (err) {
        throw new Error('Error fetching users: ' + err.message);
    }
}

exports.getUserById = async (id) => {
    try {
        const [row] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return row[0];
    } catch (err) {
        throw new Error('Error fetching user with ID: ' + id + ' ' + err.message);
    }
}

exports.updateUser = async (id, user) => {  
    try {   
    const { username, email ,phone, address } = user;
    await db.query(
        'UPDATE users SET username = ?, email = ?, phone = ?, address = ? WHERE id = ?',
        [username, email, phone, address, id]
    );
    return { id, username, email, phone, address };
    } catch (err) {
        throw new Error('Error updating user with ID: ' + id + ' ' + err.message);
    }
};

exports.searchUsers = async (query) => {
    try {
    let sql = 'SELECT * FROM users WHERE 1=1';
    const values = [];
    if (query.username) {
        sql += ' AND username = ?';
        values.push(query.username);
    }
      if (query.email) {
        sql += ' AND email = ?';
        values.push(query.email);
    }
    const [rows] = await db.query(sql, values);
    return rows;
    }
    catch (err) {
        throw new Error('Error searching users: ' + err.message);
    }
};


exports.deleteUser = async (id) => {
  try {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
  }
  catch (err) {
    throw new Error('Error deleting comment: ' + err.message);
  }
};

exports.toggleBlockUser = async (userId, isBlocked) => {
  try {
    await db.query('UPDATE users SET isBlocked = ? WHERE id = ?', [isBlocked, userId]);
  } catch (error) {
    throw new Error('Error updating user block status: ' + error.message);
  }
}