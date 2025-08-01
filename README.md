# Qloo: AI-Powered Travel Experience Platform 🌍✨

Qloo is a smart, AI-integrated travel recommendation and discovery platform. It leverages user preferences, intelligent APIs, and curated insights to provide personalized travel experiences. Whether you're a solo traveler, an adventure seeker, or a cultural explorer — Qloo helps you plan smarter and explore better.

---

## 🚀 Features

- 🔍 **AI-Powered Travel Suggestions**  
  Smart recommendations based on user interests, history, and behavior.

- 🗺️ **Explore Nearby & Global Destinations**  
  Real-time discovery using the Google Maps API.

- 🧠 **Qloo Intelligence Layer**  
  Integrated with the Qloo Hackathon API to provide rich, curated insights.

- 🌐 **User Posts & Community Sharing**  
  Share experiences, get feedback, and discover travel stories from others.

- 📸 **Cloud Image Uploads**  
  Secure media uploads using Cloudinary.

- 🔒 **JWT-Based Secure Authentication**  
  Robust login and registration using JSON Web Tokens.

---

## ⚙️ Tech Stack

- **Frontend**: React.js, Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB Atlas  
- **Cloud Services**: Cloudinary, Google Maps API  
- **AI Integration**: Qloo Hackathon API

---

## 📂 Project Structure

```
qloo-taste-app/
│
├── backend/
│   ├── config/              # Database & API configs
│   ├── controllers/         # Route handlers
│   ├── middlewares/         # Validation, auth, error handlers
│   ├── models/              # Mongoose schemas (User, Post, TasteProfile)
│   ├── routes/              # Express route definitions
│   ├── utils/               # Helper functions (error wrappers, logger)
│   ├── testQlooAPI.js       # Quick Qloo API sanity check
│   ├── userSeeder.js        # Seed script for demo users
│   ├── app.js               # Express app init
│   ├── server.js            # Server startup
│   └── .env                 # Local environment variables
│
├── frontend/
│   ├── public/              # Static assets (icons, manifest)
│   ├── src/                 # React components, hooks, pages
│   ├── index.html           # HTML entrypoint
│   ├── vite.config.js       # Vite build config
│   ├── .env                 # Frontend env (API base URL)
│   └── README.md            # Frontend notes (optional)
│
├── .gitignore
├── LICENSE
└── README.md  
```

---

## 🛠️ Setup Instructions

1. **Clone the repository:**

   ```bash
   https://github.com/jeetgoyal80/QlooVerse.git
   ```

2. **Install dependencies for backend and frontend:**

   ```bash
   cd Qloo_App
   npm install
   
   Start Frontend
   cd frontend
   npm install
   npm run dev
   ```
   ```bash
   Start Backend
   
   cd ..
   cd ./backend
   npm install
   npm run dev
   
    ```

   

3. **Set up your environment variables:**  
   Create a `.env` file in the root directory and add:

   ```env
   PORT=5000
   MONGO_URI=your_mongo_uri
   JWT_SECRET=your_jwt_secret
   QLOO_API_KEY=your_qloo_api_key
   QLOO_API_BASE_URL=https://hackathon.api.qloo.com
   GOOGLE_API_KEY=your_google_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the servers:**

   ```bash
   # In root folder
   npm start

   # In frontend folder
   npm run dev
   ```

---

## 🧠 AI & Data Layer

- **Qloo API**  
  Connects to Qloo's recommendation engine to fetch smart travel insights using user context and preferences.

- **Custom Content Engine**  
  Uses AI to analyze post tags, sentiment, and recommend matching places.

---

## 🌟 Unique Selling Points

- 🔗 Real-time AI + location integration  
- 🧳 User-generated content mixed with smart insights  
- ✈️ Designed for hyper-personalized travel planning  
- 🎯 Optimized for performance and usability  

---

## 📬 Contact

For queries, contributions or suggestions:  
📧 jeetgoyal80@gmail.com  
🔗 https://www.linkedin.com/in/jeet-goyal-95bb21285

🔧 Built with ❤️ by Jeet Goyal

---



