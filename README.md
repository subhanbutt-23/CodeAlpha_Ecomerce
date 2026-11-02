# CodeAlpha E-commerce Store

A full-stack e-commerce web application developed as part of the **CodeAlpha Full Stack Development Internship**.

## Features

- Product listing from MongoDB
- Individual product details pages
- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Shopping cart with quantity management
- Checkout and Cash on Delivery (COD)
- Order processing and storage
- My Orders page for viewing personal orders
- User-specific order access
- Responsive frontend design

## Technologies Used

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs

## Project Structure

```text
CodeAlpha_Ecommerce/
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── login.html
│   ├── register.html
│   ├── auth.js
│   ├── product.html
│   ├── product.js
│   ├── my-orders.html
│   └── my-orders.js
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env (create locally)
│
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/subhanbutt-23/CodeAlpha_Ecommerce.git
cd CodeAlpha_Ecommerce
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_secret_key
```

Replace the placeholder values with your own credentials. Never publish your `.env` file.

### 4. Start the backend server

```bash
npm run dev
```

### 5. Run the frontend

Open `frontend/index.html` using VS Code Live Server.

## API Routes

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product details |
| POST | `/api/products` | Add a product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Login a user |
| POST | `/api/orders` | Create an order |
| GET | `/api/orders/my-orders` | Get logged-in user's orders |

## Security

- Passwords are hashed using bcryptjs.
- Protected routes use JWT authentication.
- Database credentials and JWT secrets are stored in environment variables.
- `.env` and `node_modules` are excluded from Git using `.gitignore`.

## Internship

Developed as a project for the **CodeAlpha Full Stack Development Internship**.

## Author

Subhan Ijaz Butt