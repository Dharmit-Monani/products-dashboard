# 🛒 Products Dashboard — React SPA

A production-quality **React Single Page Application** built as part of the **Alfido Tech MERN Stack Internship — Task 2**.

Connects to the Node.js + Express + MongoDB REST API (Task 1) and provides a full-featured dashboard for product management.

---

## ✨ Features

- 📊 **Dashboard** with live inventory statistics
- 📋 **View All Products** with search, filter & sort
- ➕ **Create Product** with form validation
- ✏️ **Edit Product** — update any field
- 🔍 **Product Details** — full product view
- 🗑️ **Delete** with confirmation modal
- 🌙 **Dark Mode** toggle (saved in localStorage)
- 🔔 **Toast Notifications** for all actions
- 💀 **Skeleton Loaders** while data loads
- 📱 **Responsive Design** — mobile friendly
- 🎞️ **Animations** with Framer Motion
- 🔎 **Search & Filter** by name, category
- 📈 **Sort** by price, name, stock, date
- ❌ **404 Not Found** page

---

## 🚀 Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI Framework |
| React Router DOM v6 | Client-side routing |
| Axios | HTTP API calls |
| Framer Motion | Animations |
| React Hot Toast | Notifications |
| React Icons | Icon library |
| Vite | Build tool |

---

## ⚙️ Installation & Setup

### 1. Make sure backend is running

```bash
# In products-api folder:
npm run dev
# Server should be at: http://localhost:5000
```

### 2. Clone / Extract this project

```bash
cd products-dashboard
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

App runs at: **http://localhost:5173**

---

## 📡 API Integration

The frontend connects to:
```
http://localhost:5000/api/products
```

Configured in: `src/services/api.js`

To change the base URL, edit:
```js
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});
```

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx        → Top navigation bar
│   ├── Sidebar.jsx       → Side navigation
│   ├── ProductCard.jsx   → Product grid card
│   ├── ProductForm.jsx   → Reusable create/edit form
│   ├── Loader.jsx        → Spinner + skeleton loader
│   ├── ErrorMessage.jsx  → Error display
│   └── ConfirmModal.jsx  → Delete confirmation popup
├── pages/
│   ├── Home.jsx          → Dashboard with stats
│   ├── AllProducts.jsx   → Products list with search/filter
│   ├── CreateProduct.jsx → Add new product
│   ├── EditProduct.jsx   → Update existing product
│   ├── ProductDetails.jsx→ Single product view
│   └── NotFound.jsx      → 404 page
├── services/
│   └── api.js            → Axios API configuration
├── App.jsx               → Routes setup
├── main.jsx              → App entry point
└── index.css             → Global styles + CSS variables
```

---

## 🔗 Routes

| Route | Page |
|-------|------|
| `/` | Dashboard / Home |
| `/products` | All Products |
| `/products/create` | Create New Product |
| `/products/:id` | Product Details |
| `/products/edit/:id` | Edit Product |
| `*` | 404 Not Found |

---

## 👤 Author

**Dharmit Monani**
Alfido Tech Internship — MERN Stack Developer
Candidate ID: BS/REG/119983
