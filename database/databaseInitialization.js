const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function createDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true
  });

  const adminPassword = '1234';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const sql = `
    DROP DATABASE IF EXISTS MEYMAD;
    CREATE DATABASE MEYMAD;
    USE MEYMAD;

    CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      phone VARCHAR(20),
      address VARCHAR(150),
      role ENUM('user', 'admin') DEFAULT 'user',
      isBlocked BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE passwords (
      user_id INT PRIMARY KEY,
      password_hash VARCHAR(255) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE reservations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      opentime TIMESTAMP,
      closetime TIMESTAMP,
      status ENUM('pending', 'approved', 'rejected', 'cancelled', 'completed') DEFAULT 'pending',
      num_of_people INT NOT NULL,
      manager_comment TEXT,
      payment DECIMAL(10,2),
      isMultiDay BOOLEAN DEFAULT FALSE,
      group_description TEXT DEFAULT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    
    CREATE TABLE comments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      parent_id INT DEFAULT NULL,
      name VARCHAR(100),
      email VARCHAR(100),
      body TEXT,
      rating INT DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
    );
    
    CREATE TABLE messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      reservation_id INT,
      user_id INT,
      message_type ENUM('cancel', 'update') NOT NULL,
      message_content TEXT NOT NULL,
      status ENUM('pending', 'handled') DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      manager_response TEXT NULL,
      FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    );

    INSERT INTO users (username, email, phone, address, role, isBlocked) VALUES
      ( 'admin', 'admin@gmail.com', '0583282450', 'Ibn Ezra 10, Betar Illit, Israel', 'admin', FALSE),
      ( 'Shlomo Kipnis', 'shlomo@example.com', '050-1234567', 'Ibn Ezra 10, Betar Illit, Israel', 'user', FALSE),
      ( 'Sara Levi', 'sara@example.com', '052-7654321', 'Herzl Street 15, Tel Aviv, Israel', 'user', FALSE),
      ( 'David Cohen', 'david@example.com', '053-1122334', 'Ben Yehuda Street 22, Jerusalem, Israel', 'user', FALSE),
      ( 'Miriam Azulay', 'miriam@example.com', '054-9988776', 'Weizmann Street 8, Kfar Saba, Israel', 'user', FALSE);

    INSERT INTO reservations (user_id, opentime, closetime, status, num_of_people, manager_comment, payment, isMultiDay, createdAt) VALUES
      (2, '2025-06-01 09:00:00', '2025-06-01 10:00:00', 'approved', 2, 'Elderly couple, quiet', 100.00, FALSE, '2025-06-01 08:00:00'),
      (3, '2025-06-01 10:00:00', '2025-06-01 11:00:00', 'pending', 3, 'Wants shaded area', 200.00, FALSE, '2025-06-01 09:30:00'),
      (4, '2025-06-01 11:00:00', '2025-06-01 12:00:00', 'cancelled', 1, 'Cancelled due to rain', 0.00, FALSE, '2025-06-01 10:30:00'),
      (4, '2025-06-01 12:00:00', '2025-06-01 13:30:00', 'approved', 5, 'Group booking', 60.00, FALSE, '2025-06-01 11:30:00');

    INSERT INTO comments (user_id, name, email, body) VALUES
      (2, 'Yossi Cohen', 'yossi@example.com', 'Very interesting post!'),
      (2, 'Sara Levi', 'sara@example.com', 'Thanks for sharing'),
      (3, 'David Mizrahi', 'david@example.com', 'I liked the idea');
  `;

  try {
    await connection.query(sql);

    // Insert hashed password for admin (assumed to have id = 1)
    await connection.query(`INSERT INTO passwords (user_id, password_hash) VALUES (?, ?)`, [1, hashedPassword]);

    console.log('✅ Database created and seeded.');
  } catch (err) {
    console.error('❌ Error creating database:', err);
  } finally {
    await connection.end();
  }
}

createDatabase();
