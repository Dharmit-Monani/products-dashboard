# Products Dashboard — React SPA

A React frontend for managing products with full authentication and Docker support. This project covers Task 2, Task 3 and Task 4 of my Alfido Tech MERN Stack Internship.

It connects to the Node.js REST API and lets authenticated users manage products through a clean dashboard UI. The entire stack runs in Docker containers.

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
- Responsive on all screen sizes
- Smooth animations with Framer Motion
- Custom 404 page
- Served via Nginx in Docker (port 80)

---

## Tech Stack

- **React 18** — UI
- **React Router DOM v6** — routing and protected routes
- **Axios** — API calls with credentials
- **Framer Motion** — animations
- **React Hot Toast** — notifications
- **React Icons** — icons
- **Vite** — build tool
- **Nginx** — production server inside Docker

---

## Running Locally (without Docker)

Make sure the backend is running first:

```bash
cd products-api
npm run dev
# MongoDB Connected + Server running on port 5000
```

Then:

```bash
cd products-dashboard
npm install
npm run dev
```

App opens at `http://localhost:5173`

---

## Running with Docker

The easiest way to run everything is with Docker Compose:

```bash
cd D:\Alfido
docker compose up
```

This starts three containers:
- MongoDB on port 27017
- Backend on port 5000
- Frontend on port 80 via Nginx

Visit `http://localhost` in your browser — that's it.

To stop:

```bash
docker compose down
```

To stop and delete all data:

```bash
docker compose down -v
```

---

## Docker Setup

The frontend uses a multi-stage Dockerfile:

```
Stage 1 — Node 18 Alpine
  Install dependencies
  Build React app with Vite

Stage 2 — Nginx Alpine
  Copy built files
  Serve on port 80
```

Nginx is configured to handle React Router properly — refreshing any page like `/products` or `/login` works correctly.

---

## Auth Flow

```
Open app → redirected to login page
Register or login → JWT cookie set by backend
Refresh page → cookie verified → stay logged in
Logout → cookie cleared → back to login
Try /products without login → redirected to login
```

---

## Password Requirements (Signup)

The signup page enforces these rules with a live checklist:

- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 number
- At least 1 special character

The strength meter shows Weak / Fair / Medium / Strong as you type.

---

## API Config

```js
// src/services/api.js
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});
```

`withCredentials: true` makes sure cookies are sent with every request — this is what makes JWT auth work correctly in Docker.

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
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── Breadcrumb.jsx
│   ├── ProductCard.jsx
│   ├── ProductForm.jsx
│   ├── ProtectedRoute.jsx
│   ├── Loader.jsx
│   ├── ErrorMessage.jsx
│   └── ConfirmModal.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── Login.jsx
│   ├── Signup.jsx
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

## Things I want to improve

- Add user profile page
- Show product images
- Export products to CSV
- Deploy frontend on Vercel and backend on Render
- Add CI/CD pipeline with GitHub Actions

---

## Related Repos

- Task 1 + 3 + 4 — [products-api](https://github.com/Dharmit-Monani/products-api)
- Task 2 + 4 — [products-dashboard](https://github.com/Dharmit-Monani/products-dashboard) (this repo)

---

## Author

Dharmit Monani
Alfido Tech Internship — MERN Stack Developer
Candidate ID: BS/REG/119983
