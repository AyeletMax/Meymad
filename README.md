# 🏊‍♂️ Meymad - Smart Pool Booking System

<div align="center">

![Meymad Logo](client/img/logo.png)

**Advanced pool booking system with full management interface**

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-Database-orange.svg)](https://www.mysql.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-Real--time-red.svg)](https://socket.io/)

</div>

---

## 📋 Table of Contents

- [🎯 About the Project](#-about-the-project)
- [✨ Key Features](#-key-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Installation & Setup](#-installation--setup)
- [📱 Using the System](#-using-the-system)
- [👥 User Roles](#-user-roles)
- [🔧 Technologies](#-technologies)
- [📁 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 About the Project

**Meymad** is an advanced pool booking system that allows users to book swimming sessions, manage reservations, and receive real-time updates. The system includes a complete management interface for pool administrators with user management, booking management, and messaging capabilities.

### 🌟 Why Meymad?

- **Advanced User Interface** - Modern and user-friendly design
- **Smart Booking Management** - Advanced calendar system with busy time detection
- **Real-time Updates** - Instant notifications about booking changes
- **Advanced Permission System** - Separation between regular users and administrators
- **Full Hebrew Support** - Interface adapted to Hebrew language

---

## ✨ Key Features

### 👤 Regular Users
- 📅 **Swimming Session Booking** - Choose convenient date and time
- 📊 **Booking History** - View all previous reservations
- 💬 **Messaging System** - Direct communication with pool managers
- ⭐ **Review System** - Share experiences and ratings
- 🔔 **Real-time Notifications** - Instant updates about changes

### 👨‍💼 System Administrators
- 👥 **User Management** - Add, edit, and delete users
- 📋 **Booking Management** - Approve, reject, and edit reservations
- 📊 **Daily Reports** - Daily overview of all bookings
- 💬 **Message Management** - Respond to user messages
- ⚙️ **System Settings** - Manage general settings

---

## 🏗️ Architecture

```
Meymad/
├── 🖥️ client/          # Frontend - React + Vite
├── 🖥️ server/          # Backend - Node.js + Express
├── 🗄️ database/        # Database configuration
└── 📦 package.json     # Root dependencies
```

### 🔄 Data Flow
```
User → Frontend → Backend → Database
   ↑                                    ↓
   ←────────── Socket.io ←───────────────
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (version 18 or higher)
- MySQL Database
- npm or yarn

### Step 1: Clone the Project
```bash
git clone https://github.com/your-username/meymad.git
cd meymad
```

### Step 2: Database Setup
1. Create a new MySQL database
2. Copy the `.env.example` file to `.env`
3. Configure database connection details:

```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=meymad_db
JWT_SECRET=your_jwt_secret
```

### Step 3: Install Dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 4: Run the System

#### Start the Server
```bash
cd server
npm start
```
Server will run on: `http://localhost:3000`

#### Start the Client
```bash
cd client
npm run dev
```
Client will run on: `http://localhost:5173`

---

## 📱 Using the System

### 🆕 New User
1. Go to `http://localhost:5173`
2. Click "Register" in the top menu
3. Fill in registration details
4. Log in to the system

### 📅 Book a Swimming Session
1. Click "New Booking" in the menu
2. Select a date in the calendar
3. Choose an available time
4. Confirm the booking

### 👨‍💼 Admin Access
1. Log in with an admin account
2. Go to "Booking Management" or "User Management"
3. Manage the system

---

## 👥 User Roles

### 👤 Regular User
- Book swimming sessions
- View booking history
- Send messages
- Write reviews

### 👨‍💼 System Administrator
- Manage all users
- Approve/reject bookings
- Respond to messages
- View daily reports

---

## 🔧 Technologies

### Frontend
- **React 19** - Advanced UI library
- **Vite** - Fast build tool
- **Material-UI** - Ready-made UI components
- **React Router** - Page navigation
- **Socket.io Client** - Real-time communication
- **Day.js** - Date management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Server framework
- **Socket.io** - Real-time communication
- **JWT** - User authentication
- **bcrypt** - Password encryption

### Database
- **MySQL** - Relational database
- **mysql2** - MySQL driver

### Additional Tools
- **ESLint** - Code linting
- **Nodemon** - Auto-restart
- **CORS** - Cross-domain access

---

## 📁 Project Structure

```
Meymad/
├── 📱 client/                    # Frontend Application
│   ├── 📦 src/
│   │   ├── 🎨 component/         # React Components
│   │   │   ├── 👤 admin/        # Admin Components
│   │   │   ├── 💬 comments/     # Comments System
│   │   │   ├── 📞 contact/      # Contact Forms
│   │   │   ├── 🏠 home/         # Home Page
│   │   │   ├── 📋 orders/       # Order Management
│   │   │   └── 👤 user/         # User Authentication
│   │   ├── 🔌 ApiService.js     # API Communication
│   │   └── 🔌 socket.js         # Socket.io Client
│   └── 🖼️ img/                  # Images & Assets
├── 🖥️ server/                   # Backend Application
│   ├── 🎮 controllers/          # Request Handlers
│   ├── 🛡️ middleware/           # Authentication & Authorization
│   ├── 🛣️ routes/              # API Routes
│   └── 🔧 service/              # Business Logic
├── 🗄️ database/                 # Database Configuration
│   ├── 📊 db.js                 # Database Connection
│   └── 🚀 databaseInitialization.js
└── 📄 package.json              # Project Dependencies
```

---

## 🤝 Contributing

We're happy to receive contributions! Here's how you can contribute:

### 🐛 Bug Reports
1. Open a new Issue
2. Describe the problem in detail
3. Add screenshots if relevant

### 💡 Feature Suggestions
1. Open an Issue with "enhancement" tag
2. Describe your idea
3. Explain how it will help users

### 🔧 Code Contributions
1. Fork the project
2. Create a new branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is protected under the MIT license. See [LICENSE](LICENSE) file for more details.

---

## 📞 Support

If you have questions or issues:

- 📧 **Email**: avoda9291@gmail.com || ayelet2540@gmail.com
- 📱 **Phone**: 0504169291 || 0583282450

---

<div align="center">

**Built with ❤️ in Israel**

![Israel Flag](https://img.shields.io/badge/Made%20in-Israel-blue?style=for-the-badge&logo=israel)

</div> 