# Solution Quantiphi - Personal Finance Dashboard

A full-stack personal finance dashboard for tracking recurring SaaS and streaming subscriptions. The app helps users monitor monthly cash-flow burn, manage renewal dates, and simulate savings by pausing subscriptions instead of deleting them.

## What This Project Does

This project is built around the following product goals:

- Collect recurring subscription details from an onboarding form.
- Normalize annual subscription prices into monthly burn values.
- Track renewal dates and highlight subscriptions renewing within 7 days.
- Show a live summary of total monthly burn and upcoming renewal alerts.
- Allow each subscription to be toggled between Active and Paused.
- Exclude paused subscriptions from the monthly burn metric to simulate savings in real time.

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- cors

### Frontend
- React
- Vite
- Tailwind CSS
- Axios

## Project Structure

```text
solution_quantiphi/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── dashboardController.js
│   │   └── subcriptionController.js
│   ├── models/
│   │   └── Subcription.js
│   ├── routes/
│   │   ├── dashboardRoute.js
│   │   └── subcriptionRoute.js
│   ├── seed.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BrandHeader.jsx
│   │   │   ├── EngineCard.jsx
│   │   │   ├── MetricCard.jsx
│   │   │   ├── MetricsRow.jsx
│   │   │   ├── SubscriptionForm.jsx
│   │   │   └── SubscriptionTable.jsx
│   │   ├── lib/
│   │   │   └── subscriptions.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── finance.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Frontend Features

### 1. Entry Form
The onboarding form allows users to add a subscription with:
- Service name
- Cost
- Billing cycle: Monthly or Yearly
- Next renewal date

### 2. Metrics Row
The top section of the dashboard shows:
- Total Monthly Burn Rate
- Upcoming Renewals Alert Count

### 3. Subscription Grid
The subscription table displays:
- Service name
- Billing cycle
- Original cost
- Monthly equivalent cost
- Renewal date
- Days left until renewal
- Active / Paused status
- Toggle switch for status updates

### 4. Renewal Warning State
If a subscription renews within 7 days, the row is highlighted and a **Renewing Soon** badge is shown.

### 5. Paused State Behavior
When a subscription is toggled to **Paused**:
- The row is visually greyed out
- The cost is excluded from the total monthly burn calculation
- The data is not deleted, only its active status changes

## Backend Features

### Subscription CRUD-style API
The backend currently supports:
- Fetching all subscriptions
- Creating a new subscription
- Updating a subscription status

### Business Logic
- Annual prices are normalized to monthly values for dashboard metrics.
- Renewal date differences are calculated against a fixed reference date.
- Status changes are persisted to MongoDB.

### Seed Data
A seed script is included to populate the database with sample subscriptions.

## Environment Variables

### Backend `.env`
Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/subscription_dashboard
```

### Frontend `.env`
Create a `.env` file inside `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Setup Instructions

### 1. Clone the repository
```bash
git clone git@github.com:PriyaTripathi15/vibe_coding_solution.git
cd vibe_coding_solution
```

### 2. Configure the backend
Install backend dependencies:
```bash
cd backend
npm install
```

Make sure MongoDB is running locally and your backend `.env` file is configured.

Seed the database with sample subscriptions:
```bash
npm run seed
```

### 3. Configure the frontend
Install frontend dependencies:
```bash
cd ..\frontend
npm install
```

Make sure the frontend `.env` file is configured.

## Run the Application

### Start the backend
```bash
cd backend
npm start
```

### Start the frontend
```bash
cd frontend
npm start
```

Open the frontend in the browser after both servers are running.

## API Endpoints

### Subscriptions
- `GET /api/subscriptions` - Fetch all subscriptions
- `POST /api/subscriptions` - Create a new subscription
- `PATCH /api/subscriptions/:id/status` - Update status to Active or Paused

## Notes

- The frontend is componentized for readability and maintainability.
- Axios is used for all backend communication through a shared service layer.
- The frontend build command has been verified successfully.
- The seed script inserts sample subscriptions only when the collection is empty.

## Available Scripts

### Backend
- `npm run seed` - Insert sample subscriptions into MongoDB

### Frontend
- `npm start` - Start the Vite development server
- `npm run dev` - Start the Vite development server
- `npm run build` - Build the production frontend
- `npm run preview` - Preview the production build
