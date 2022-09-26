# Coding Challenge for Web Engineers

This app is deployed on Vercel and is viewable [here](https://mighty-jaxx-challenge.vercel.app/).

```
Email: admin@email.com
Password: 1234
```

> The CRUD operation is performed on pessimistic basis.

> May experience delayed/lag while performing CRUD. It's because this app is using free tier on everything related to cloud hosting.

## Architecture
Frontend is created using Next.js and deployed on **Vercel**.

Backend is created using Node.js with Express.js and deployed on **Heroku**.

MongoDB is used as database and is hosted on MongoDB Atlas.

## Checklist
### Requirements
- [x] React
- [ ] Redux
- [x] MongoDB

> Instead of Redux, [zustand](https://github.com/pmndrs/zustand) is chosen for its simplicity of use.

### Create an login page
- [x] Text inputs for email and password.
- [x] Submit button.
- [x] Show and error message for incorrect credentials.
- [x] Make the page responsive for mobile and desktop devices.
- [x] Redirect to the admin dashboard page (to be built in the next step) for correct credentials.

### Build the admin dashboard page:
- [x] Show a list of products (the products should be fetched from a database). Each product has the following data: SKU, title and image.
- [x] Add the option to add a new product (should be added to the database as well).
- [x] Add the option to edit an existing product (should be edited in the database as well).
- [x] Add the option to remove an existing product (should be removed from the database as well).
- [x] Add a logout button that redirects to the login page.
- [x] Make the page responsive for mobile and desktop devices.

### Extra flavor
- [x] Added a search bar in the admin dashboard to search for products.
- [x] Using jsonwebtoken to authenticate the user directly when token exists in local storage.
- [x] Added spinner animation to indicate loading process.