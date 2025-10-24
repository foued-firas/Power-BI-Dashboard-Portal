# Power BI Dashboard Portal

A React-based web application that provides secure access to multiple **Power BI dashboards**, personalized for each user.  
Includes authentication, multi-dashboard navigation, and a **prediction visualization module** for specific users.

---

## Features

- 🔐 User authentication (email + password)  
- 📈 Power BI dashboard embedding with tab navigation  
- 👤 User-specific dashboards  
- 🧠 Prediction page (image-based insights for specific users)  
- 🌐 Routing with `react-router-dom`  
-  Clean and responsive design using inline CSS

---

## Tech Stack

| Category   | Technology         |
|------------|------------------|
| Frontend   | React.js          |
| Routing    | React Router DOM  |
| Styling    | Inline CSS        |
| Dashboard  | Power BI Embedded |
| Version Control | Git & GitHub |

---

## Project Structure
src/
│
├── components/
│ ├── Dashboard.jsx # Displays Power BI dashboards
│ ├── Prediction.jsx # Displays prediction image
│ ├── prediction.png # Image used in Prediction page
│
├── App.js # Routing logic
├── index.js # App entry point
└── ...


---

## Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/foued-firas/Power-BI-Dashboard-Portal.git

cd Power-BI-Dashboard-Portal.git
```
Install dependencies:
npm install


Start the development server:
npm start

Open your browser:
http://localhost:3000
