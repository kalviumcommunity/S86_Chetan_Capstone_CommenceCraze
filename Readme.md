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

- 🔐 **Role-Based Authentication** – Secure login for Admins, Organizers, and Customers using **JWT** tokens.
- 📅 **Event Management System** – Propose, approve, and manage events with a streamlined UI.
- 📣 **Real-Time Announcements** – Keep all users informed with instant updates.
- 📊 **Analytics Dashboards** – Role-specific metrics for informed decision-making.
- 🌐 **Responsive UI** – Built with **Tailwind CSS**, optimized for all devices.
- 📸 **QR-Based Check-In** – Fast participant validation at events.

---

## 🏗️ Tech Stack

| Category            | Technology                          |
|---------------------|--------------------------------------|
| **Frontend**        | React.js, Tailwind CSS               |
| **Backend**         | Node.js, Express.js (ESM)            |
| **Database**        | MongoDB with Mongoose                |
| **Authentication**  | JWT + Middleware Role Protection     |
| **UI Animations**   | Framer Motion                        |
| **Deployment**      | Vercel (Frontend), Render (Backend)  |

---

## 👥 User Roles & Capabilities

| Role        | Capabilities                                                                 |
|-------------|------------------------------------------------------------------------------|
| **Admin**   | Manage users & categories, approve events, broadcast announcements          |
| **Organizer**| Propose/manage events, view participants, communicate with customers        |
| **Customer** | Register for events, receive updates, give feedback                         |

---

## 🗓️ 45-Day Development Plan

### 🏗️ Phase 1: Core Setup & Authentication (Days 1–7)

| Day | Task                                           | Deliverable                         | Testing                         |
|-----|------------------------------------------------|-------------------------------------|---------------------------------|
| 1   | Initialize Vite + React + Tailwind frontend    | Basic frontend scaffold             | `npm run dev`                   |
| 2   | Setup Node.js, Express (ESM), MongoDB backend | Backend connected to MongoDB         | Postman / ThunderClient tests   |
| 3   | Implement JWT authentication (Login/Signup)   | Secure auth APIs                     | Token generation, route test    |
| 4   | Create admin dashboard UI                       | Admin panel placeholder            | Manual UI check                 |
| 5   | Setup organizer onboarding + event permissions | Organizer registration & login flow | Role validation tests           |
| 6   | Setup customer onboarding system                | Customer signup & login            | DB inserts, form validation     |
| 7   | Deploy backend to Render / Railway              | Live API URL                       | Smoke test, route checks        |

---

### ⚙️ Phase 2: Core Features (Days 8–21)

| Day | Task                                           | Deliverable                         | Testing                         |
|-----|------------------------------------------------|-------------------------------------|---------------------------------|
| 8   | Admin: Create/view/manage colleges             | CRUD operations on college data     | DB verification                 |
| 9   | Organizer: Create & manage events              | Event form + auto code generation   | Code uniqueness test            |
| 10  | Customer: Register for events                  | Registration form                   | DB check for customer-event link|
| 11  | Build event participation UI for organizers    | Participant list UI                 | Data reflection in DB           |
| 12  | Implement QR code-based event check-in system  | QR check-in integration             | Manual QR test                  |
| 13  | Create announcement/notice board module        | Post/view announcements             | UI + DB check                   |
| 14  | Implement role-based dashboards                | Different views: Admin/Organizer/Customer | Access control checks       |
| 15  | Customer: View registered events               | Events list                       | UI rendering + data match       |
| 16  | Organizer: Manage event participants           | Table of registered customers      | Pagination, filters             |
| 17  | Admin: View analytics dashboard                | Stats on events, users              | Test with mock data             |
| 18  | Build notification system (email/toast/pop-up) | Real-time alerts                    | Toast and email testing         |
| 19  | Set up MongoDB indexes for performance         | Optimized queries                   | Query time benchmarks           |
| 20  | Secure all backend routes with middleware      | AuthGuard and role checks           | Protected route access          |
| 21  | Deploy frontend on Vercel/Netlify              | Live React UI                      | End-to-end manual testing       |

---

### 🎨 Phase 3: UI/UX Polish & Refinement (Days 22–35)

| Day | Task                                           | Deliverable                         | Testing                         |
|-----|------------------------------------------------|-------------------------------------|---------------------------------|
| 22  | Add Framer Motion for smooth animations        | Page and modal transitions          | Visual inspection               |
| 23  | Implement dark/light theme switcher            | Theme toggle across UI              | Manual toggle test              |
| 24  | Add loading skeletons & spinners               | Enhanced UX during data fetch       | Performance test                |
| 25  | Add form validation + error handling (Yup, Toasts) | UX-friendly forms                 | Wrong input test                |
| 26  | Implement role-aware sidebar & header navigation | Role-based nav menus               | Click-through checks            |
| 27  | Make UI fully responsive (mobile-first)        | Tablet + Mobile UI pass             | Cross-device tests              |
| 28  | Add pagination, sorting & filtering to event tables | Improved data handling UX        | Filter/paginate test            |
| 29  | Optimize image and QR uploads                   | File size limits + previews         | Upload test                    |
| 30  | Add calendar view for upcoming events          | Schedule calendar integration       | Event date sync check           |
| 31  | Add copy-to-clipboard for event codes          | Fast invite system                  | Clipboard test                  |
| 32  | Improve dashboard metrics visualizations (Recharts) | Visual insights for admin         | Data mapping                    |
| 33  | Add tooltips, modals, and accessibility improvements | Better UX                        | Keyboard nav, screen reader     |
| 34  | Polish fonts, spacing, and color tokens        | Clean & branded UI                  | Style audit                     |
| 35  | Conduct design review with peers                | Final UI adjustments                | Peer feedback                   |

---

### 🚀 Phase 4: Testing, Documentation & Launch (Days 36–45)

| Day | Task                                           | Deliverable                         | Testing                         |
|-----|------------------------------------------------|-------------------------------------|---------------------------------|
| 36  | Write backend unit tests with Jest             | Test coverage for APIs              | `npm run test`                  |
| 37  | Perform E2E tests using Cypress or Playwright | Full user journey simulation        | E2E flow                       |
| 38  | Rate-limit sensitive endpoints (e.g., registration) | Protection against spam          | Repeated request test           |
| 39  | Apply MongoDB validation schemas               | Clean inserts, strict models        | Wrong input test                |
| 40  | Add 404 and error fallback pages               | Error routing                      | Broken route test               |
| 41  | Deploy full-stack version                       | Live production build               | Smoke test                     |
| 42  | Record full walkthrough demo video             | 3–5 min feature showcase            | Peer review                    |
| 43  | Write detailed `README.md`, API Docs, and Setup Guides | Project documentation           | Markdown lint                  |
| 44  | Collect user feedback from early testers       | Feedback forms                    | Interview notes                |
| 45  | Plan v2 roadmap (mobile app, gamification, offline mode) | Internal expansion proposal     | Not applicable                 |

---

## 🖼️ Design Guidelines

- 🎨 **Colors:**  
  - Background: `#1a1a1a`  
  - Primary Accents: `#FF7E33`, `#FACC15`

- 🖋️ **Typography:**  
  - **Poppins** – Headings  
  - **Inter** – Body text

- 📱 **Layout:**  
  - Mobile-first, responsive design  
  - Grid-based event display  
  - Smooth transitions with **Framer Motion**

---

## 🚀 Installation Guide

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/kalviumcommunity/S86_Chetan_Capstone_CommenceCraze.git
cd S86_Chetan_Capstone_CommenceCraze


cd frontend
npm install
npm run dev


cd ../backend
npm install
npm run dev
