# 🎉 Commence Craze  
**Start the Buzz. Fuel the Craze.**  
An intelligent, full-stack MERN platform for seamless event management in academic and public institutions, designed to elevate customer engagement and streamline event operations.

---

## 📌 Overview

### 🔴 The Problem  
Managing event proposals, participant registrations, updates, and communication often relies on fragmented tools and manual coordination — leading to inefficiency and disengagement.

### 🟢 The Solution  
**Commence Craze** unifies the entire event lifecycle — from creation to feedback — into a single scalable platform. With role-based access, real-time communication, and intuitive dashboards, it simplifies event coordination for admins, organizers, and customers.

---

## ✨ Features

- 🔐 **Role-Based Authentication** – Secure login for Admins, Organizers, and Customers using **JWT** tokens with HTTP-only cookies
- 📅 **Event Management System** – Create, update, delete, and manage events with image uploads via Cloudinary
- 👥 **Event Registration** – Customers can register for events with real-time capacity tracking
- 🎫 **Ticket Management** – Dynamic ticket availability and sold count tracking
- 🖼️ **Image Upload** – Event images stored on Cloudinary with multer integration
- 🌐 **Responsive UI** – Built with **Tailwind CSS** and **Framer Motion** animations
- 🔒 **Protected Routes** – Client-side route protection with role-based access control
- 📱 **State Management** – Efficient state handling with **Zustand**
- ✅ **Form Validation** – React Hook Form with Yup validation schemas
- 🎨 **Modern UI/UX** – Toast notifications, smooth animations, and intuitive design

---

## 🏗️ Tech Stack

| Category            | Technology                                      |
|---------------------|-------------------------------------------------|
| **Frontend**        | React 19, Vite, Tailwind CSS                    |
| **Backend**         | Node.js, Express.js 5 (ESM)                     |
| **Database**        | MongoDB with Mongoose                           |
| **Authentication**  | JWT + bcryptjs + HTTP-only Cookies              |
| **File Upload**     | Multer + Cloudinary                             |
| **State Management**| Zustand                                         |
| **Form Handling**   | React Hook Form + Yup                           |
| **UI Components**   | Framer Motion, React Icons, React Toastify      |
| **QR Code**         | qrcode.react, html5-qrcode                      |
| **Charts**          | Recharts                                        |
| **Date Utils**      | date-fns                                        |

---

## 👥 User Roles & Capabilities

| Role        | Capabilities                                                                 |
|-------------|------------------------------------------------------------------------------|
| **Admin**   | Manage users & categories, approve events, broadcast announcements          |
| **Organizer**| Propose/manage events, view participants, communicate with customers        |
| **Customer** | Register for events, receive updates, give feedback                         |

---

## 🎯 Current Implementation Status

### ✅ Completed Features
- JWT-based authentication with role support (customer, organizer, admin)
- User registration and login with secure password hashing
- Event creation with image uploads to Cloudinary
- Event listing with owner information
- Single event details view
- Event registration system with capacity management
- Protected routes with role-based access control
- Responsive UI with Tailwind CSS
- Toast notifications for user feedback
- State management with Zustand
- Form validation with React Hook Form and Yup
- 404 error page handling

### 🚧 In Progress / Planned
- Dashboard analytics with Recharts
- QR code check-in functionality
- Event participant management interface
- Payment integration with Razorpay
- Advanced filtering and search
- Admin panel for user management
- Event approval workflow

---

## 🖼️ Design System

- 🎨 **Colors:** Dark theme with `#1a1a1a` background and vibrant accent colors
- 🖋️ **Typography:** Modern sans-serif fonts for readability
- 📱 **Layout:** Mobile-first responsive design with Tailwind CSS
- ✨ **Animations:** Smooth transitions powered by Framer Motion
- 🎭 **Components:** Reusable React components with consistent styling

---

## 🚀 Installation Guide

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/kalviumcommunity/S86_Chetan_Capstone_CommenceCraze.git
cd S86_Chetan_Capstone_CommenceCraze
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Update .env with your MongoDB URL and other credentials
# Example:
# PORT=5000
# MONGO_URL=mongodb://localhost:27017/commence-craze
# JWT_SECRET=your_secret_key_here
# FRONTEND_URL=http://localhost:5173

# Start the development server
npm run dev
```

The backend will run on **https://s86-chetan-capstone-commencecraze.onrender.com**

### 3️⃣ Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file from example (optional)
cp .env.example .env

# Start the development server
npm run dev
```

The frontend will run on **http://localhost:5173**

### 4️⃣ Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:5173
- **Backend API:** https://s86-chetan-capstone-commencecraze.onrender.com/health

---

## 📁 Project Structure

```
S86_Chetan_Capstone_CommenceCraze/
├── Backend/
│   ├── middlewares/
│   │   └── authMiddleware.js        # JWT authentication & role-based access
│   ├── models/
│   │   ├── Event.js                 # Event schema with participants
│   │   └── User.js                  # User schema with roles
│   ├── routes/
│   │   ├── auth.js                  # Auth routes (register, login, profile, logout)
│   │   └── event.js                 # Event CRUD & registration routes
│   ├── utils/
│   │   └── cloudinary.js            # Cloudinary config for image uploads
│   ├── package.json                 # Backend dependencies
│   └── server.js                    # Express server with CORS & error handling
│
├── frontend/
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── assets/                  # Images, icons
│   │   ├── components/
│   │   │   ├── CreateEventModal.jsx # Modal for creating events
│   │   │   ├── Navbar.jsx           # Navigation bar with auth state
│   │   │   └── ProtectedRoute.jsx   # Route guard component
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx        # User dashboard
│   │   │   ├── EventDetails.jsx     # Single event view & registration
│   │   │   ├── Events.jsx           # Events listing page
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Register.jsx         # Registration page
│   │   │   └── NotFound.jsx         # 404 page
│   │   ├── services/
│   │   │   ├── api.js               # Axios instance configuration
│   │   │   ├── authService.js       # Auth API calls
│   │   │   └── eventService.js      # Event API calls
│   │   ├── store/
│   │   │   ├── authStore.js         # Zustand auth state
│   │   │   └── eventStore.js        # Zustand event state
│   │   ├── App.jsx                  # Main App with routing
│   │   ├── App.css                  # Custom styles
│   │   ├── index.css                # Global styles + Tailwind directives
│   │   └── main.jsx                 # React entry point
│   ├── eslint.config.js             # ESLint configuration
│   ├── index.html                   # HTML template
│   ├── package.json                 # Frontend dependencies
│   ├── postcss.config.js            # PostCSS with Tailwind
│   ├── tailwind.config.js           # Tailwind customization
│   └── vite.config.js               # Vite build configuration
│
└── Readme.md                        # Project documentation
```

---

## 🔧 Available Scripts

### Backend
```bash
npm run dev      # Start development server with nodemon (port 5000)
npm start        # Start production server
```

### Frontend
```bash
npm run dev      # Start development server (port 5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 🔒 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env)
```env
VITE_API_URL=https://s86-chetan-capstone-commencecraze.onrender.com
VITE_APP_NAME=Commence Craze
```

---

## 🌐 API Endpoints

### Health Check
- `GET /health` - API health status

### Authentication (/user)
- `POST /user/register` - Register new user (name, email, password, role)
- `POST /user/login` - Login user (returns JWT in cookie)
- `GET /user/profile` - Get authenticated user profile
- `POST /user/logout` - Logout user (clears cookie)

### Events (/api)
- `GET /api/` - Get all active events with owner details
- `GET /api/:id` - Get single event details
- `GET /api/my/events` - Get logged-in user's created events (Protected)
- `POST /api/create` - Create new event with image upload (Organizer/Admin)
- `PUT /api/:id` - Update event (Owner only)
- `DELETE /api/:id` - Delete event (Owner only)
- `POST /api/:id/register` - Register for event as participant
- `DELETE /api/:id/unregister` - Unregister from event

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Chetan**  
Kalvium Community - S86 Capstone Project

---

## 🙏 Acknowledgments

- Kalvium Community for support and guidance
- MongoDB for database solutions
- Vercel and Render for deployment platforms

---

## 🚀 Deployment

### Backend (Render/Railway)
1. Create new Web Service
2. Connect GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy

### Frontend (Vercel/Netlify)
1. Import GitHub repository
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables
6. Deploy

---

**Made with ❤️ by Chetan | Start the Buzz. Fuel the Craze.**
