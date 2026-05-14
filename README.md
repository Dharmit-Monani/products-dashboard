# Products Dashboard — React SPA

A React frontend for managing products with full authentication. This covers Task 2 and Task 3 of my Alfido Tech MERN Stack Internship.

It connects to the Node.js REST API and lets authenticated users manage products through a clean dashboard UI. Unauthenticated users are redirected to the login page automatically.

---

## What it does

- Login and signup with form validation
- Real-time password strength meter on signup
- Live password requirements checklist
- Show/hide password toggle on all password fields
- JWT auth via httpOnly cookies — no localStorage
- Auth persists after page refresh
- Protected routes — dashboard only accessible after login
- Full product CRUD — create, view, edit, delete
- Dashboard with live inventory stats
- Search, filter and sort products
- Dark mode with localStorage preference
- Toast notifications for all actions
- Skeleton loaders while data loads
- Confirmation modal before deleting
- Responsive design — works on mobile too
- Smooth animations with Framer Motion
- Custom 404 page

---

## Tech Stack

- **React 18** — UI
- **React Router DOM v6** — routing and protected routes
- **Axios** — API calls with credentials
- **Framer Motion** — animations
- **React Hot Toast** — notifications
- **React Icons** — icons
- **Vite** — build tool

---

## Getting Started

Make sure the backend is running first:

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

You'll see the login page. Register a new account to get started.

---

## Auth Flow

```
Open app → Login page
Register or Login → JWT cookie set by backend
Refresh page → /api/auth/me called → cookie verified → stay logged in
Logout → cookie cleared → back to login page
Try to access /products without login → redirected to login
```

---

## Password Requirements (Signup)

The signup page enforces these rules with a live checklist:

- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 number
- At least 1 special character (e.g. @, #, !)

The strength meter shows Weak / Fair / Medium / Strong in real time as you type.

---

## Environment / API Config

No `.env` needed for frontend. The API URL is set in one place:

```js
// src/services/api.js
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // sends httpOnly cookie with every request
});
```

For the backend, create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

---

## Pages and Routes

| Route | Page | Protected |
|-------|------|-----------|
| `/login` | Login | No |
| `/signup` | Signup | No |
| `/` | Dashboard | Yes |
| `/products` | All Products | Yes |
| `/products/create` | Create Product | Yes |
| `/products/:id` | Product Details | Yes |
| `/products/edit/:id` | Edit Product | Yes |
| `*` | 404 Not Found | — |

---

## Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx          → top bar with logout button
│   ├── Sidebar.jsx         → navigation links
│   ├── Breadcrumb.jsx      → enhanced breadcrumb
│   ├── ProductCard.jsx     → product card with actions
│   ├── ProductForm.jsx     → reusable create/edit form
│   ├── ProtectedRoute.jsx  → redirects to login if not authenticated
│   ├── Loader.jsx          → spinner and skeleton loaders
│   ├── ErrorMessage.jsx    → error display with retry
│   └── ConfirmModal.jsx    → delete confirmation popup
├── context/
│   └── AuthContext.jsx     → global auth state, login/signup/logout
├── pages/
│   ├── Login.jsx           → login form with show/hide password
│   ├── Signup.jsx          → signup with strength meter + checklist
│   ├── Home.jsx            → dashboard with live stats
│   ├── AllProducts.jsx     → product list with search/filter/sort
│   ├── CreateProduct.jsx   → add new product
│   ├── EditProduct.jsx     → update product
│   ├── ProductDetails.jsx  → single product view
│   └── NotFound.jsx        → 404 page
├── services/
│   └── api.js              → axios instance with credentials
├── App.jsx                 → route definitions with auth guards
├── main.jsx                → app entry with AuthProvider
└── index.css               → global styles and CSS variables
```

---

## Things I want to improve later

- Add user profile page to update name and password
- Show which user created each product
- Add product image upload
- Export products to CSV
- Deploy frontend on Vercel and backend on Render

---

## Related Repos

- Task 1 + 3 — [products-api](https://github.com/Dharmit-Monani/products-api)
- Task 2 — [products-dashboard](https://github.com/Dharmit-Monani/products-dashboard) (this repo)

---

## Author

Dharmit Monani
Alfido Tech Internship — MERN Stack Developer
Candidate ID: BS/REG/119983
