document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
});

function addToCart(event) {
    const productId = event.target.dataset.id;

    fetch('/api/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId: productId })
    })
    .then(response => {
        if (response.ok) {
            alert('Product added to cart successfully!');
        } else {
            alert('Failed to add product to cart. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add product to cart. Please try again.');
    });
}
document.addEventListener("DOMContentLoaded", () => {
    loadCartItems();
});

function loadCartItems() {
    fetch('/api/cart')
        .then(response => response.json())
        .then(cartItems => {
            const cartGrid = document.querySelector('.cart-grid');
            cartGrid.innerHTML = ''; // Clear previous content
            
            cartItems.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <h3>${item.productName}</h3>
                    <img src="${item.productImage}" alt="${item.productName}">
                    <p>${item.productDescription}</p>
                    <p>$${item.productPrice.toFixed(2)}</p>
                `;
                cartGrid.appendChild(cartItemElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to load cart items. Please try again.');
        });
}

// Add event listener to add-to-cart buttons
document.addEventListener("click", (event) => {
    if (event.target.classList.contains('add-to-cart-button')) {
        const productId = event.target.dataset.id;

        fetch('/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId: productId })
        })
        .then(response => {
            if (response.ok) {
                alert('Product added to cart successfully!');
                loadCartItems(); // Reload cart items after adding a new item
            } else {
                alert('Failed to add product to cart. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to add product to cart. Please try again.');
        });
    }
});




// Assuming you're using Node.js with Express.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let cartItems = []; // Assuming this is where your cart items are stored

// Route to handle removing a product from the cart
app.post('/api/cart/remove', (req, res) => {
    const { productId } = req.body;
    const index = cartItems.findIndex(item => item.productId === productId);
    if (index !== -1) {
        cartItems.splice(index, 1); // Removing the item from the cart
        res.status(200).json({ message: 'Product removed from cart successfully!' });
    } else {
        res.status(404).json({ message: 'Product not found in cart.' });
    }
});

// Route to get the list of products
app.get('/api/products', (req, res) => {
    // Assuming you have a list of products stored somewhere
    const products = [
        {
            productId: 1,
            productName: 'Product 1',
            productImage: 'product1.jpg',
            productDescription: 'Description of Product 1',
            productPrice: 19.99
        },
        {
            productId: 2,
            productName: 'Product 2',
            productImage: 'product2.jpg',
            productDescription: 'Description of Product 2',
            productPrice: 29.99
        },
        // Add more products as needed
    ];
    res.json(products);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



