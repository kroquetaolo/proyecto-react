<img src="https://raw.githubusercontent.com/kroquetaolo/proyecto-react/main/src/assets/logo.png" alt="Unique Nook Logo" width="300">

# Welcome to Unique Nook,
 A web application developed for CoderHouse Academy as the final project in the ReactJS course.

## Dependencies

| React | React Icons | Toastify | HTML | CSS | Vite | React Hook Form | Firebase |
| ----- | ---------- | -------- | ---- | --- | ----| --------------- | -------- |
| <p align="center"><a href="https://reactjs.org/"><img src="https://imgur.com/D0LgId0.png" alt="React" width="50"></a></p> | <p align="center"><a href="https://react-icons.github.io/react-icons/"><img src="https://raw.githubusercontent.com/react-icons/react-icons/master/react-icons.svg" alt="react icons Logo" width="50"></a></p> | <p align="center"><a href="https://github.com/fkhadra/react-toastify"><img src="https://fkhadra.github.io/react-toastify/img/favicon.ico" alt="Toastify " width="50"></a></p> | <p align="center"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://imgur.com/JC4hUSh.png" alt="HTML " width="50"></a></p> | <p align="center"><a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://imgur.com/MzztIsF.png" alt="css " width="50"></a></p> | <p align="center"><a href="https://vitejs.dev/"><img src="https://vitejs.dev/logo-with-shadow.png" alt="vite " width="50"></a></p> | <p align="center"><a href="https://react-hook-form.com/"><img src="https://react-hook-form.com/images/logo/react-hook-form-logo-only.png" alt="react form" width="50"></a></p> | <p align="center"><a href="https://firebase.google.com/"><img src="https://www.gstatic.com/devrel-devsite/prod/v50a9748f336f0601961fb23638b43fbbc8f87f50f5f0aa83e2751247a72fbd3b/firebase/images/favicon.png" alt="Firebase" width="50"></a></p> |

## How to installation
```bash
#Clone the repository.
git clone https://github.com/kroquetaolo/proyecto-react.git [folder_name]
#Navigate to the folder path.
cd [folder_name]
#Create .env.local file
touch .env.local
#Install the packages.
npm install
#Run the application
npm run dev
```
## .env.local format

This needs to be configured so that the products are displayed.

```
VITE_SOME_API_KEY=
VITE_SOME_AUTH_DOMAIN=
VITE_SOME_PROJECT_ID=
VITE_SOME_STORAGE_BUCKET=
VITE_SOME_MESSAGIN_SENDER_ID=
VITE_SOME_APP_ID=
VITE_SOME_MEASUREMENT_IT=
```
## Instructions for firebase
This is the required format for creating a product.
```
#Create a collection named "products"
#Add a document with an id

#Follow this format for the fields
category: {string}
color: {string}
description: {string}
id: {number} #IMPORTANT must be equal to the document ID
title: {string}
price: {number}
stock: {number}
title: {string}
```
## A little gift
To use this, you must have configured your Firestore keys in .env.local and you just have to replace the App.jsx with this one and press the button on the website.
```javascript
import { useEffect, useState } from 'react';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

function App() {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        //You can replace this with your own .json, make sure to follow the same format.
        fetch('https://raw.githubusercontent.com/kroquetaolo/trampita/main/products.json')
            .then((res) => {
                return res.json();
        })
            .then((data) => {
                setProducts(data)
            })
            .catch((err) => console.error(err));
    }, []);

    function sendOrder() {
        const db = getFirestore();
        products.map((product) => {
            const productId = product.id;
            setDoc(doc(db, "products", "" + productId), product);
        })
        alert("You added " + products.length + " products to you firestore")
    }

    return (
        <button onClick={sendOrder}> Send Products to firebase</button>
    );
}

export default App;
```
## Overview of Application Features

### Navigation and Product Display:
- Users can browse different categories of products using the navigation menu.
- Every product is showcased with its corresponding image, title, description, category, color, and price
- Each product includes a link for more details

### Dark Mode:
- The application offers the option to deactivate dark mode to enhance the user visual experience.
- Users can toggle between dark (default) and light mode according to their preferences.

### Shopping Cart:
- Users can add products to the shopping cart from the product list or from the product detail page.
- In the shopping cart, a list of selected products is displayed, along with their quantity and subtotal.
- Users can adjust the quantity of each product in the cart or remove individual products.
- The total purchase amount is displayed, and links are provided to continue shopping or proceed to the checkout process.

### Checkout Process:
- Users are required to complete a form with their name, email, and phone number.
- The form is validated to ensure that the required data is provided and that the formatting criteria are met.
- Once the form is completed, the data is sent to a server for order processing.
- A confirmation message is displayed with the order ID, and the shopping cart is cleared.

### Interaction with Firebase:
- The application interacts with Firebase to store and retrieve data, such as products and orders.
- Firestore is used to store product details and user orders.
- Firebase Authentication is utilized to manage user authentication, which is not explicitly mentioned in the provided code.

>*Developed by Benjamin Zamora*