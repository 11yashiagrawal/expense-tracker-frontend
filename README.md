Trackify – Manage Your Expenses & Subscriptions

Trackify is a full-stack web application designed to help users effortlessly manage their daily expenses and monthly subscription payments. It allows users to record, view, update, and analyze their spending patterns while also tracking upcoming subscription renewals.

📌 Problem Statement

Managing expenses and recurring subscriptions manually can be time-consuming and error-prone. People often lose track of weekly spending, struggle to maintain a budget, and forget upcoming due payments.

Trackify solves this by providing a centralized platform where users can:

Log expenses and subscriptions

View spending analytics

Track monthly budgets

Search, sort, filter, and paginate through transactions

Analyze trends with clean visualizations

🧱 System Architecture
Frontend → Backend (REST API) → Database

Frontend

Next.js (Pages Router)

TailwindCSS, Material UI

Axios for API communication

Backend
Code -> https://github.com/11yashiagrawal/expense-tracker-backend

Node.js + Express

JWT-based authentication

REST API architecture

Database

MongoDB (MongoDB Atlas)

Hosting

Frontend → Vercel

Backend → Railway

Database → MongoDB Atlas

🚀 Key Features
🔐 Authentication & Authorization

User Registration

Login & Logout

Access + Refresh tokens (JWT)

Secure password update

📝 CRUD Operations

Create, Read, Update, Delete:

Expenses

Subscriptions

Payments

📍 Frontend Routing (Next.js App Router)

Dashboard

Login / Logout

Landing Page

Profile

Expenses

Subscriptions
(All pages fetch data dynamically via APIs)

🔍 Easy Data Viewing

Search expenses, transactions, subscriptions

Sort by amount (low → high, high → low)

Filter by category, type, or date

Pagination to prevent UI clutter

📊 Monitor Expenses

Monthly expense summaries

Category-wise expenditure

Charts for spending insights

☁️ Hosting

Fully deployed frontend + backend

Accessible and secure APIs

🛠️ Tech Stack
Layer	Technologies
Frontend	Next.js, Axios, TailwindCSS, Material UI
Backend	Node.js, Express.js
Database	MongoDB
Auth	JWT (Access + Refresh tokens)
Hosting	Vercel, Render
📡 API Overview
Endpoint	Method	Description	Access
/users/register	POST	Register new user	Public
/users/login	POST	Login user	Public
/users/changePassword	POST	Update password	Authenticated
/expenses	GET	Get all expenses	Authenticated
/expenses	POST	Add a new expense	Authenticated
/expenses/:id	PATCH	Update expense by ID	Authenticated
/expenses/:id	DELETE	Delete expense by ID	Authenticated


Create .env with:

MONGO_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
PORT=5000
