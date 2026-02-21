# 🛒 Amazon Clone

A full-featured Amazon-inspired e-commerce web app built with **React**, **Firebase**, and **Stripe**. Products are fetched live from the [DummyJSON API](https://dummyjson.com) with CDN-backed images, real descriptions, ratings, and categories.

> **Live demo:** deployed on GitHub Pages / Vercel (coming soon)
> **Repo:** [github.com/eyob2015/Amazone-eyobs-clone](https://github.com/eyob2015/Amazone-eyobs-clone)

---

## ✨ Features

| Feature | Details |
|---|---|
| 🏠 **Home page** | Animated hero carousel, Shop by Category grid, product rows per category |
| 🔍 **Product Detail** | Multi-image gallery, buy-box, features list, related products |
| 📂 **Category Page** | Filtered product grid with loading skeletons and sort bar |
| 🛒 **Cart / Checkout** | Quantity stepper (+/−), remove item, live subtotal |
| 💳 **Stripe Payments** | Test card integration via Stripe Elements |
| 🔐 **Firebase Auth** | Sign in / register, protected routes, redirect-after-login |
| 📦 **Order History** | Firestore-backed past orders per user |
| 📱 **Fully Responsive** | Mobile hamburger nav, fluid grids at 480 / 640 / 768 / 1024 px |
| 🌐 **Live Product Data** | DummyJSON API — 194 products, CDN images, 1-hour localStorage cache |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) v16+
- npm v8+
- A Firebase project (free tier works)
- A Stripe test account (free)

### Installation

```bash
git clone https://github.com/eyob2015/Amazone-eyobs-clone.git
cd Amazone-eyobs-clone
npm install
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
```

---

## 🔑 Environment Setup

### Firebase
Replace the config object in `src/services/firebase.js` with your own project credentials from the [Firebase Console](https://console.firebase.google.com):

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

### Stripe
- Replace the **publishable key** in `src/App.js`:
  ```js
  const promise = loadStripe("pk_test_YOUR_KEY");
  ```
- Point the backend URL in `src/services/axios.js` to your payments server (see [backend repo](https://github.com/eyob2015/Amazone-eyobs-clone)):
  ```js
  baseURL: 'https://your-backend.onrender.com'
  ```

### Test card (Stripe)
```
Card number : 4242 4242 4242 4242
Expiry      : Any future date
CVC         : Any 3 digits
```

---

## 🗂️ Project Structure

```
Amazone-eyobs-clone/
├── public/
│   ├── index.html          # Site title, favicon, meta description
│   └── manifest.json
└── src/
    ├── App.js              # Router, ProtectedRoute, Stripe Elements
    ├── index.js            # ReactDOM entry, StateProvider wrapper
    ├── index.css           # Global CSS variables & reset
    │
    ├── api/
    │   └── productsAPI.js  # DummyJSON fetch, cache, schema mapping
    │
    ├── assets/
    │   └── amazon-logo.png
    │
    ├── components/
    │   ├── common/
    │   │   ├── Product.js  # Product card (used on Home & ProductDetail)
    │   │   └── Product.css
    │   └── layout/
    │       ├── Header.js   # Sticky nav, search, mobile hamburger
    │       ├── Header.css
    │       ├── Footer.js
    │       └── Footer.css
    │
    ├── context/
    │   ├── StateProvider.js  # React Context wrapper
    │   └── reducer.js        # Basket actions + selectors
    │
    ├── hooks/
    │   └── useProducts.js    # useProducts(categoryId?), useProduct(id)
    │
    ├── pages/
    │   ├── Home/             # Hero carousel + product rows
    │   ├── CategoryPage/     # Filtered grid per category
    │   ├── ProductDetail/    # Image gallery + buy box + related products
    │   ├── Checkout/         # Cart, CheckoutProduct, Subtotal
    │   ├── Login/            # Sign in / create account
    │   ├── Orders/           # Order history (Orders + Order card)
    │   └── Payment/          # Stripe form + PaymentSuccess
    │
    ├── services/
    │   ├── firebase.js       # Auth + Firestore exports
    │   └── axios.js          # Preconfigured Axios instance (payments backend)
    │
    └── utils/
        └── productsData.js   # CATEGORIES list + legacy stubs
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **UI** | React 18, React Router v6 |
| **Styling** | Plain CSS with CSS custom properties (variables) |
| **Icons** | MUI Icons (`@mui/icons-material`) |
| **Auth + DB** | Firebase v10 (compat API) — Authentication + Firestore |
| **Payments** | Stripe Elements (`@stripe/react-stripe-js`) |
| **Products API** | [DummyJSON](https://dummyjson.com) — free, no-auth, CDN images |
| **HTTP client** | Axios (payments backend) |
| **Date formatting** | date-fns |
| **State management** | React Context + `useReducer` (custom global store) |

---

## 🧭 App Routing

| Path | Page | Protected |
|---|---|---|
| `/` | Home | No |
| `/login` | Login / Register | No |
| `/product/:productId` | Product Detail | No |
| `/category/:categoryId` | Category Page | No |
| `/checkout` | Shopping Cart | ✅ Yes |
| `/Payment` | Stripe checkout | ✅ Yes |
| `/PaymentSuccess` | Order confirmed | ✅ Yes |
| `/Orders` | Order history | ✅ Yes |

---

## 🧩 Key Architecture Decisions

### Global state (`context/reducer.js`)
The basket uses quantity-aware actions:
- `ADD_TO_BASKET` — increments if item already exists
- `INCREMENT_QUANTITY` / `DECREMENT_QUANTITY` — removes at zero
- `REMOVE_FROM_BASKET` — removes entirely
- `EMPTY_BASKET` — clears after payment

### Product data (`api/productsAPI.js`)
- Fetches 194 products from DummyJSON once and caches to `localStorage` for 1 hour
- Maps DummyJSON category slugs → app category IDs (`electronics`, `fashion`, `beauty`, etc.)
- Derives badges (`Top Rated`, `Deal`, `Low Stock`, `Best Seller`)
- Builds `features[]` array from warranty, shipping, return policy fields

### Protected routes
`ProtectedRoute` in `App.js` preserves the intended URL in `location.state.from`. After login, the user is redirected back automatically.

---

## 📸 Screenshots

> _Add screenshots here once deployed_

---

## 📄 License

This project was built as an educational clone for learning purposes.  
© 2026 Eyob — all trademarks belong to their respective owners.
