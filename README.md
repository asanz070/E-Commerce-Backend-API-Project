# 🛒 MegaMart - E-Commerce Backend API

## Overview

**MegaMart** is a fully functional backend API built for a simplified e-commerce platform. This project showcases backend development using **Node.js**, **Express**, and **MongoDB**, focusing on core functionality such as:

- Designing flexible data models with Mongoose  
- Building a RESTful API with modular architecture  
- Enabling advanced product filtering, sorting, and querying  
- Managing relationships between resources (products, customers, orders, etc.)  
- Clean code practices with proper error handling and structured routing  

This project is backend-only and built with scalability and clarity in mind. Authentication and security layers are excluded from the current scope, but the system is ready to support those features in the future.

---

## 🧩 Features

### 🔍 Products

- Full CRUD operations  
- Supports advanced query filters:  
  - Filter by category, price range, and in-stock status  
  - Sort by price or name (ascending/descending)  
- Fields:  
  - `name` *(string)*  
  - `description` *(string)*  
  - `price` *(number)*  
  - `category` *(string)*  
  - `stock` *(number)*  
  - `images` *(array of URLs)*

**Sample Query:**

```
GET /products?category=<categoryId>&minPrice=20&maxPrice=100&inStock=true&sort=-price
```

---

### 📁 Categories

- Full CRUD operations  
- Fields:  
  - `name` *(string)*  
  - `description` *(string)*

---

### 👤 Customers

- Full CRUD operations  
- Fields:  
  - `name` *(string)*  
  - `email` *(string)*  
  - `address` *(string)*  
  - `phone` *(string)*

---

### 🛒 Shopping Carts

- One cart per customer  
- Cart functionality:  
  - Add/update/remove products  
  - Clear entire cart  
  - Retrieve cart with total cost calculated  
- Fields:  
  - `customer` *(ref: Customer)*  
  - `items` *(array of objects with `productId` and `quantity`)*

---

### 📦 Orders

- Orders are generated from shopping carts  
- Order lifecycle includes status management and timestamps  
- Fields:  
  - `customer` *(ref: Customer)*  
  - `items` *(copied from cart)*  
  - `total` *(calculated)*  
  - `status` *("pending", "shipped", "delivered", "cancelled")*  
  - `createdAt` *(timestamp)*

**Order endpoints allow:**

- Placing an order from a cart  
- Viewing a customer's order history  
- Filtering orders by status  
- Updating order status

---

## 🗂 Project Structure

Organized using MVC architecture for clarity and maintainability.

```
/models
  Product.js
  Category.js
  Customer.js
  Cart.js
  Order.js

/routes
  products.js
  categories.js
  customers.js
  carts.js
  orders.js

/controllers
  productController.js
  categoryController.js
  customerController.js
  cartController.js
  orderController.js

/index.js
```
---

## 💡 Bonus Features

Optional extras that enhance the API:

- ✅ Pagination with `page` and `limit` query params  
- ✅ Input validation via `express-validator`  
- ✅ Automatic stock decrement when orders are placed  
- ✅ Customer product reviews (leave feedback and ratings)

---

## 🚀 Tech Stack

- **Node.js** + **Express** – API and routing  
- **MongoDB** + **Mongoose** – NoSQL database and ODM  
- **Postman** – For testing endpoints  
- **dotenv** – Environment variable management  
- **express-validator** – Middleware validation (optional)

---

## 🛠 Future Improvements

- Add authentication and user roles  
- Implement product image uploads (e.g., Cloudinary or S3)  
- Stripe/PayPal integration for payments  
- Email order confirmations  
- Admin dashboard for analytics

---

## 📬 Feedback or Ideas?

Got suggestions? Feel free to open an issue or drop a comment. This repo is a continuous work-in-progress, so all feedback is welcome!