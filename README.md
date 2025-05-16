🚀 **Taskify – Backend API Overview**

🔗 **Live Frontend**: [Taskify](https://taskify.taniyakamboj.info)
📁 **Frontend Repository**: [Go to Frontend](https://github.com/taniyakamboj15/taskify_frontend)

---

A robust, secure, and scalable backend solution for **Taskify**, a task and project management platform. Developed using **Node.js**, **Express**, and **MongoDB**, it integrates seamlessly with **Firebase Authentication**, **Redis caching**, and exposes efficient REST APIs for task handling.

---

### 🛠️ Key Features

* 🔐 **OTP Authentication** via Firebase Admin SDK
* 📁 **CRUD Operations** for Projects & Tasks
* 🧠 **User Management** using MongoDB + Mongoose
* ⚙️ **JWT & Cookie-based Authentication**
* ✉️ **Email Notifications** using Nodemailer
* 💨 **API Security** through Rate Limiting & Input Validation
* 🧾 **Redis Integration** for Caching and OTP Handling

---

### 💻 Tech Stack

**Backend**

* **Node.js + Express** – Server-side framework
* **MongoDB + Mongoose** – NoSQL database & ORM
* **Firebase Admin** – OTP-based user verification
* **Redis** – In-memory caching for sessions & OTPs
* **Nodemailer** – Email services
* **JWT** – Authentication token management
* **dotenv** – Environment variable configuration

**Middleware & Utilities**

* `bcrypt` / `bcryptjs` – Secure password hashing
* `express-rate-limit` – API request throttling
* `express-validator` – Input validation
* `cookie-parser` – Cookie handling
* `validator` – Data schema validation

---

### 📁 Folder Structure

```
taskify_backend/
├── .gitignore
├── package.json
├── server.js
├── vercel.json
├── server/
│   ├── config/
│   │   ├── dbConfig.js          # MongoDB connection setup
│   │   ├── email.js             # Nodemailer config
│   │   └── firebase.js          # Firebase Admin SDK setup
│   ├── controller/
│   │   ├── authController.js    # Signup/Login logic
│   │   ├── deleteProjectTask.js
│   │   ├── updateProjectTask.js
│   │   ├── uploadProjectTask.js
│   │   └── userData.js
│   ├── middleware/
│   │   ├── userauth.js          # JWT validation
│   │   └── validateUserSignup.js
│   ├── models/
│   │   ├── TaskSchema.js        # Task data model
│   │   └── UserSchema.js        # User data model
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── deleteRoutes.js
│   │   ├── updateRoutes.js
│   │   ├── uploadRoutes.js
│   │   └── userDataRoutes.js
│   └── utils/
│       ├── generateOtp.js
│       └── redisClient.js
```

---

### ⚙️ Getting Started

#### 🔄 Clone the Repository

```bash
git clone https://github.com/taniyakamboj15/taskify_backend.git
cd taskify_backend
```

#### 📦 Install Dependencies

```bash
npm install
```

#### 🔐 Configure Environment Variables

Create a `.env` file in the project root:

```ini
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_url
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

#### 🚀 Start Development Server

```bash
npm run start
```



---

### 👩‍💻 Author

**Taniya Kamboj**
🔗 [GitHub](https://github.com/taniyakamboj15)

---

### 📄 License

Licensed under the **ISC License**

---

### 🤝 Contributing

We welcome contributions! Feel free to fork the repo, open pull requests, or submit issues to help improve and enhance Taskify.
