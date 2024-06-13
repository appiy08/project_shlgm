# Second-Hand Luxury Goods Marketplace

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About

The Second-Hand Luxury Goods Marketplace is a MERN stack-based website designed to facilitate the buying and selling of pre-owned luxury goods. This platform allows users to list, browse, and purchase high-end products with ease.

## Features

- User Authentication (Signup/Login)
- JWT-based secure authentication
- Product listing with detailed descriptions
- Search and filter functionality
- User profiles with order history
- Admin panel for managing listings and users
- Responsive design

## Installation

To set up the project locally, follow these steps:

### Prerequisites

- Node.js
- MongoDB
- npm (Node Package Manager) or yarn

### Steps

1. **Clone the repository**

    ```bash
    git clone https://github.com/appiy08/project_shlgm.git
    cd project_shlgm
    ```

2. **Install server dependencies**

    ```bash
    cd server
    npm install
    ```

3. **Install client dependencies**

    ```bash
    cd ../client
    npm install
    ```

4. **Run the development servers**

    In the `server` directory:

    ```bash
    npm start
    ```

    In the `client` directory:

    ```bash
    npm start
    ```

## Usage

After installation, you can use the following commands:

- **Run the development server**

    ```bash
    npm start
    ```

- **Build for production**

    ```bash
    npm run build
    ```

- **Run tests**

    ```bash
    npm test
    ```

## Configuration

To configure the project, create a `.env` file in the `server` directory and add the following environment variables:

```env
JWT_SECRET_KEY=your_secret_key
DATABASE_URL=mongodb://localhost:27017/your_db_name
```

## API Reference

### Authentication

- **POST /api/auth/signup**
  - Registers a new user.
  - **Request Body:** `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`
  - **Response:** `{ "token": "JWT_TOKEN" }`

- **POST /api/auth/login**
  - Logs in an existing user.
  - **Request Body:** `{ "email": "john@example.com", "password": "password123" }`
  - **Response:** `{ "token": "JWT_TOKEN" }`

### Products

- **GET /api/products**
  - Fetches all products.
  - **Response:** `[{ "id": 1, "name": "Luxury Bag", "price": 250 }]`

- **POST /api/products**
  - Adds a new product (Admin only).
  - **Request Body:** `{ "name": "Luxury Bag", "description": "A high-end bag", "price": 250, "category": "Bags" }`
  - **Response:** `{ "id": 1, "name": "Luxury Bag", "price": 250 }`

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

Adarsh Patidar - [@adarshpatidar](https://x.com/AdarshP50654465) - adarshpatidar.dev08@gmail.com

Project Link: [https://github.com/appiy08/project_shlgm](https://github.com/appiy08/project_shlgm)
