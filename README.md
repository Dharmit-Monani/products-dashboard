# 🛒 Products Dashboard — React SPA

> A production-quality **React Single Page Application** built as **Task 2** of the Alfido Tech MERN Stack Developer Internship.
> Connects to a Node.js + Express + MongoDB REST API (Task 1) to provide a full-featured Product Management Dashboard.

---

## 📸 Screenshots

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### All Products
![All Products](./screenshots/all-products.png)

### Product Details
![Product Details](./screenshots/product-details.png)

### Create Product
![Create Product](./screenshots/create-product.png)

### Edit Product
![Edit Product](./screenshots/edit-product.png)

### Delete Confirmation
![Delete Confirmation](./screenshots/delete-confirm.png)

### Error State
![Error State](./screenshots/error-state.png)

---

## ✨ Features

- 📊 **Dashboard** — Live inventory stats (total products, inventory value, low stock, out of stock)
- 📋 **All Products** — Grid view with real-time search, category filter & sort
- ➕ **Create Product** — Form with full client-side validation
- ✏️ **Edit Product** — Pre-filled update form
- 🔍 **Product Details** — Complete product information view
- 🗑️ **Delete Product** — Confirmation modal before deletion
- 🌙 **Dark Mode** — Toggle with localStorage persistence
- 🔔 **Toast Notifications** — Success/error feedback for all actions
- 💀 **Skeleton Loaders** — Placeholder UI while data loads
- 📱 **Responsive Design** — Works on desktop and mobile
- 🎞️ **Smooth Animations** — Powered by Framer Motion
- 🔎 **Search & Filter** — By name, description, category
- 📈 **Sort** — By price (asc/desc), name, stock, newest
- ❌ **404 Page** — Custom not found page
- ⚡ **Error Handling** — Graceful API failure states with retry button

---

## 🚀 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | ^18.2.0 | UI Framework |
| React Router DOM | ^6.20.1 | Client-side routing |
| Axios | ^1.6.2 | HTTP API calls |
| Framer Motion | ^10.16.4 | Animations |
| React Hot Toast | ^2.4.1 | Toast notifications |
| React Icons | ^4.12.0 | Icon library |
| Vite | ^5.0.0 | Build tool & dev server |

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v18+
- npm v9+
- Backend API running on `http://localhost:5000` (see Task 1)

---

### 1. Make sure the backend is running

```bash
# In products-api folder:
npm run dev
# ✅ MongoDB Connected!
# 🚀 Server running on port 5000
```

---

### 2. Install frontend dependencies

```bash
cd products-dashboard
npm install
```

---

### 3. Start the development server

```bash
npm run dev
```

App runs at: **http://localhost:5173**

---

### 4. Build for production

```bash
npm run build
npm run preview
```

---

## 🔐 Environment Variables

### Backend (`products-api/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

> Copy from `.env.example` and fill in your MongoDB Atlas URI.

### Frontend

No `.env` file needed. API base URL is configured in:

```js
// src/services/api.js
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products |
| `GET` | `/api/products/:id` | Get single product |
| `POST` | `/api/products` | Create new product |
| `PUT` | `/api/products/:id` | Update a product |
| `DELETE` | `/api/products/:id` | Delete a product |

---

## 📁 Folder Structure

```
products-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          → Top navigation bar with dark mode toggle
│   │   ├── Sidebar.jsx         → Side navigation with active link highlighting
│   │   ├── ProductCard.jsx     → Product grid card with actions
│   │   ├── ProductForm.jsx     → Reusable create/edit form with validation
│   │   ├── Loader.jsx          → Spinner + skeleton loader cards
│   │   ├── ErrorMessage.jsx    → Error display with retry button
│   │   └── ConfirmModal.jsx    → Animated delete confirmation popup
│   ├── pages/
│   │   ├── Home.jsx            → Dashboard with live stats & recent products
│   │   ├── AllProducts.jsx     → Full product list with search/filter/sort
│   │   ├── CreateProduct.jsx   → Add new product page
│   │   ├── EditProduct.jsx     → Update existing product page
│   │   ├── ProductDetails.jsx  → Single product full detail view
│   │   └── NotFound.jsx        → 404 page
│   ├── services/
│   │   └── api.js              → Axios instance & all API call functions
│   ├── App.jsx                 → Route definitions
│   ├── main.jsx                → App entry point
│   └── index.css               → Global styles & CSS variables (light/dark)
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🔗 Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Dashboard with stats |
| `/products` | All Products | List with search & filter |
| `/products/create` | Create Product | Add new product form |
| `/products/:id` | Product Details | Single product view |
| `/products/edit/:id` | Edit Product | Update product form |
| `*` | Not Found | 404 page |

---

## 🔮 Future Improvements

- 🔐 **User Authentication** — JWT login/signup with protected routes
- 📊 **Product Analytics** — Sales charts and trend graphs
- 📤 **Export Functionality** — Download products as CSV or PDF
- 🔍 **Advanced Filtering** — Multi-tag filter, price range slider
- 👥 **Role-Based Access** — Admin, manager, viewer roles
- 📷 **Image Upload** — Product photo with Cloudinary integration
- 📦 **Bulk Actions** — Select multiple products to update/delete
- 🌐 **Deployment** — Vercel (frontend) + Render (backend)

---

## 👤 Author

**Dharmit Monani**
- 🏢 Alfido Tech — MERN Stack Developer Intern
- 🪪 Candidate ID: `BS/REG/119983`
- 📅 Internship Start: 10 May 2026
- 👨‍💻 Domain: MERN Stack Development

---

## 🔗 Related Repositories

| Task | Repository | Description |
|------|-----------|-------------|
| Task 1 | [products-api](https://github.com/Dharmit-Monani/products-api) | Node.js + Express + MongoDB REST API |
| Task 2 | [products-dashboard](https://github.com/Dharmit-Monani/products-dashboard) | React SPA Frontend (this repo) |

---

## 📄 License

This project is built for educational and internship submission purposes.
