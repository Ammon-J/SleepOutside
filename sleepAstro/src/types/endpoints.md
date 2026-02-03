Codes (200, 400, 401, 403, 404, 500)

Code 200: OK

Code

## Endpoints

We're using a mix of REST & RPC

### Users should be able to search and filter products to find what they are looking for.

GET /products/$searchString
GET /products/$filter(s)

### Users should be able to see details about selected products including what other users thought about the product (reviews).

GET /products/$id

### Users should be able to add products to a shopping cart and then check out. The cart should persist across sessions.

POST /users/id/cart/add

### Users should be able to see their order history.

GET /users/id/cart

### Users should be able to log in and log out.

POST /login
POST /logout

### Users should be able to see their account information.

GET /users/$id

### Developers should be able to read (search) products.

GET /products

### Developers should be able to create, read, update, and delete orders.

GET /orders
GET /orders/$id
POST /orders
PUT /orders/$id

### Developers should be able to create, read, update, and delete users.

GET /users
GET /users/$id
POST /users
PUT /users/$id
DELETE /users/$id

### Developers should be able to read, create, update, and delete alerts that will show under certain conditions to users.

GET /alerts
GET /alerts/$id
****CONTINUE WITH ALERTS

***** UPDATE AND DELETE FOR EACH




## Swagger

```yml

openapi: 3.0.3
info:
  title: Sleep Outside API
  version: 1.0.0
  description: API documentation for the store entities.

components:
  schemas:
    # --------------- Address ---------------
    Address:
      type: object
      required: [id, name, line1, city, state, postalCode, country]
      properties:
        id:
          type: string
        name:
          type: string
        line1:
          type: string
        line2:
          type: string
          nullable: true
        city:
          type: string
        state:
          type: string
        postalCode:
          type: string
        country:
          type: string

    # --------------- User ---------------
    User:
      type: object
      required: [id, name, email, password, addressIds, joinDate]
      properties:
        id:
          type: string
        name:
          type: string
        email:
          type: string
          format: email
        password:
          type: string
          format: password
        addressIds:
          type: array
          items:
            type: string
        joinDate:
          type: string
          format: date-time

    # --------------- Order ---------------
    ProductSnapshot:
      type: object
      required: [productId, nameSnapshot, priceSnapshot, quantity]
      properties:
        productId:
          type: string
        nameSnapshot:
          type: string
        priceSnapshot:
          type: number
        quantity:
          type: integer

    Order:
      type: object
      required: [id, userId, items, paymentStatus, orderStatus, shippingAddress, createdAt, subtotal, tax, total]
      properties:
        id:
          type: string
        userId:
          type: string
        items:
          type: array
          items:
            $ref: '#/components/schemas/ProductSnapshot'
        paymentStatus:
          type: string
          enum: [unpaid, pending, paid, refunded]
        orderStatus:
          type: string
          enum: [processing, shipped, delivered, cancelled]
        paymentMethodType:
          type: string
          nullable: true
        shippingAddress:
          $ref: '#/components/schemas/Address'
        createdAt:
          type: string
          format: date-time
        subtotal:
          type: number
        tax:
          type: number
        total:
          type: number

    # --------------- Product ---------------
    Image:
      type: object
      required: [url, alt]
      properties:
        url:
          type: string
        alt:
          type: string

    Product:
      type: object
      required: [id, brandId, name, slug, description, price, categoryIds, images, stock, isActive, createdAt, updatedAt, ratingAverage, ratingCount]
      properties:
        id:
          type: string
        brandId:
          type: string
        name:
          type: string
        slug:
          type: string
        description:
          type: string
        price:
          type: number
        categoryIds:
          type: array
          items:
            type: string
        images:
          type: array
          items:
            $ref: '#/components/schemas/Image'
        stock:
          type: integer
        isActive:
          type: boolean
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
        ratingAverage:
          type: number
        ratingCount:
          type: integer

    # --------------- Category ---------------
    Category:
      type: object
      required: [id, name, slug, image]
      properties:
        id:
          type: string
        name:
          type: string
        slug:
          type: string
        image:
          $ref: '#/components/schemas/Image'

    # --------------- Brand ---------------
    Brand:
      type: object
      required: [id, name, logo]
      properties:
        id:
          type: string
        name:
          type: string
        logo:
          $ref: '#/components/schemas/Image'

    # --------------- Alert ---------------
    Alert:
      type: object
      required: [id, title, type, scope, targetIds, status, startsAt]
      properties:
        id:
          type: string
        title:
          type: string
        type:
          type: string
          enum: [warning, info, promotion]
        scope:
          type: string
          enum: [brand, category, product]
        targetIds:
          type: array
          items:
            type: string
        status:
          type: string
          enum: [active, inactive]
        startsAt:
          type: string
          format: date-time
        endsAt:
          type: string
          format: date-time
          nullable: true

    # --------------- Review ---------------
    Review:
      type: object
      required: [id, productId, userId, rating, title, comment, createdAt, modifiedAt, isVerifiedPurchase]
      properties:
        id:
          type: string
        productId:
          type: string
        userId:
          type: string
        rating:
          type: number
          minimum: 1
          maximum: 5
        title:
          type: string
        comment:
          type: string
        createdAt:
          type: string
          format: date-time
        modifiedAt:
          type: string
          format: date-time
        isVerifiedPurchase:
          type: boolean
  
  ```