# DevDoc AI Assistant

**DevDoc AI Assistant** is an intelligent documentation chatbot built using **Next.js**, **OpenAI GPT-3.5**, **MongoDB**, and **Tailwind CSS**. It supports real-time question-answering from scraped documentation (like Node.js, React, etc.) using vector similarity and embeddings. Users can register, login, and chat with the AI assistant to get instant help from actual developer docs.

---

## 🌟 Features

- 🔍 **Web Scraping**: Crawls official docs like Node.js, React, etc., and extracts clean page content using `cheerio`.
- 🧠 **AI-Powered Q&A**: Uses OpenAI’s GPT-3.5-turbo with a context window derived via **cosine similarity** from embedded doc chunks.
- 🧠 **Embeddings**: Generates and stores embeddings using `text-embedding-3-small` to match user queries with relevant docs.
- 🔐 **JWT Auth**: Secure registration and login using JSON Web Tokens.
- 💬 **Chat UI**: Real-time chat interface with context retention and smooth UI interactions.
- 📦 **MongoDB Storage**: Stores user data and vectorized documentation chunks.
- 🚀 **Vercel Deployment**: Fully hosted frontend and backend with Next.js API routes.

---

## 🛠️ Tech Stack

### 🔧 Frontend
- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- TypeScript

### 🧠 AI & Backend
- OpenAI API (`gpt-3.5-turbo`, `text-embedding-3-small`)
- MongoDB + Mongoose
- Node.js scraping with `axios` + `cheerio`
- JWT-based authentication
- API routes in Next.js

---

## 🌐 Web Scraping (Document Loader)

The project includes a script that:

- Recursively scrapes internal links from developer docs (e.g. [nodejs.org/api](https://nodejs.org/api))
- Uses `axios` and `cheerio` to load and parse the HTML content
- Saves cleaned `.txt` files into `docs/full-nodejs/` etc.
- Later, the content is split into chunks, embedded via OpenAI, and stored in MongoDB for vector search.

  ---

## 🔐Authentication
Implemented simple and secure authentication using:

- bcrypt for password hashing

- jsonwebtoken for signing tokens

- LocalStorage to persist token on frontend

- Route guards using useEffect to prevent access to /chat without login

  ---

 ## 🗂️Folder Structure

 
```bash
├── app/                # Next.js app directory
│   ├── login/          # Login page
│   ├── register/       # Signup page
│   ├── chat/           # AI chat interface
├── components/         # Reusable UI components
├── lib/                # DB connection and utility logic
├── models/             # Mongoose models
├── scripts/            # Scraper scripts
├── docs/               # Scraped documentation content
├── api/                # API routes
├── public/             # Static assets

```


---

## 🚀Deployment
This project is deployed on Vercel. No backend server is required — API routes run serverless.

To deploy:

- Push to GitHub

- Import on vercel.com

- Set environment variables in Project Settings > Environment Variables

- Deploy!

- Link:- [DevDoc AI Assistant](https://dev-doc-ai-assistant-mykh7mitx.vercel.app/)

  ---

  ## 📸Screenshots

  ### 1. Home Page

  ### 2. Login Page

  ### 3. Chat Interface

  ---

  ## 👤 Author

**Srinath Kamalakumar**

## 📝 License

Licensed under [MIT](https://opensource.org/licenses/MIT)

  
