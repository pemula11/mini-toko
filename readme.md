# Mini Toko API Documentation

## Table of Contents
1. [API Documentation](#api-documentation)
2. [Web App Documentation](#web-app-documentation)

## API Documentation

### Base URL
```
http://localhost:3000/products
```

### Endpoints

#### Get All Products
```
GET /
```
- **Description:** Retrieve a list of all products.
- **Response:**
    ```json
    [
        {
                "id": 10,
                "product_code": 55,
                "product_name": "ww3rt tt",
                "price": 3,
                "stock": 3
        },
        ...
    ]
    ```



#### Create a New Product
```
POST /
```
- **Description:** Create a new product.
- **Request Body:**
    ```json
    {
        "product_code": 13,
        "product_name": "Kue"
    }
    ```
- **Response:**
    ```json
    {
        "status": "success",
        "data": {
            "id": 11,
            "product_name": "Kue",
            "price": 0,
            "stock": 0,
            "product_code": 131
        }
    }
    ```

#### Update a Product
```
PUT /:id
```
- **Description:** Update an existing product by its ID.
- **Parameters:**
    - `id` (integer): The ID of the product.
- **Request Body:**
    ```json
    {
        "product_name": "buku",
        "stock": 10,
        "price": 2000
    }
    ```
- **Response:**
    ```json
    {
        "status": "success",
        "data": {
            "id": 8,
            "product_code": 12,
            "product_name": "buku",
            "price": 2000,
            "stock": 10
        }
    }
    ```

#### Delete a Product
```
DELETE /:id
```
- **Description:** Delete a product by its ID.
- **Parameters:**
    - `id` (integer): The ID of the product.
- **Response:**
    ```json
    {
        "message": "Product deleted successfully"
    }
    ```

## Web App Documentation


### Base URL
```
http://localhost:3000/admin/
```
