# Products Dashboard — React SPA

A React frontend for managing products, built as Task 2 of my Alfido Tech MERN Stack Internship. It connects to the REST API I built in Task 1 and lets you perform all CRUD operations through a clean dashboard UI.

---

## What it does

- View all products in a card grid layout
- Search products by name or category
- Filter by category and sort by price, stock or date
- Add a new product with form validation
- Edit an existing product
- View full product details
- Delete a product with a confirmation popup
- Dashboard shows live stats — total products, inventory value, low stock count
- Dark mode toggle that saves your preference
- Toast notifications for every action
- Skeleton loaders while data is being fetched
- Works on mobile too

---

## Tech Stack

- **React 18** — UI
- **React Router DOM v6** — routing
- **Axios** — API calls
- **Framer Motion** — animations
- **React Hot Toast** — notifications
- **React Icons** — icons
- **Vite** — build tool

---

## Getting Started

Make sure the backend (products-api) is running first.

```bash
# In products-api folder
npm run dev
# Should show: MongoDB Connected + Server running on port 5000
```

Then set up the frontend:

```bash
cd products-dashboard
npm install
npm run dev
```

App opens at `http://localhost:5173`

---

## Environment / API Config

No `.env` needed for the frontend. The API URL is set in one place:

```js
// src/services/api.js
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});
```

For the backend, create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## Pages and Routes

| Route | Page |
|-------|------|
| `/` | Dashboard with stats |
| `/products` | All products with search and filter |
| `/products/create` | Create new product |
| `/products/:id` | Product details |
| `/products/edit/:id` | Edit product |
| `*` | 404 Not Found |

---

## Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── ProductCard.jsx
│   ├── ProductForm.jsx
│   ├── Loader.jsx
│   ├── ErrorMessage.jsx
│   └── ConfirmModal.jsx
├── pages/
│   ├── Home.jsx
│   ├── AllProducts.jsx
│   ├── CreateProduct.jsx
│   ├── EditProduct.jsx
│   ├── ProductDetails.jsx
│   └── NotFound.jsx
├── services/
│   └── api.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## API Endpoints used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/products` | Load all products |
| GET | `/api/products/:id` | Load one product |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

---

## Things I want to improve

- Add user login and protected routes
- Show a chart on the dashboard for inventory trends
- Add export to CSV option
- Add image upload for products
- Deploy frontend on Vercel and backend on Render

---

## Related Repos

- Task 1 — [products-api](https://github.com/Dharmit-Monani/products-api)
- Task 2 — [products-dashboard](https://github.com/Dharmit-Monani/products-dashboard) (this repo)

---

## Author

Dharmit Monani
Alfido Tech Internship — MERN Stack Developer
Candidate ID: BS/REG/119983
