
/* ========================================
   SGT. V'S MESS HALL
   Cookie Catalog and Shopping Cart
======================================== */

/*
   BUSINESS SETTINGS

   Update prices and availability here.

   available: false means customers cannot add
   that product to the cart yet.

   IMPORTANT:
   Confirm prices and inventory before selling.
*/



const cookies = [
    {
        id: "puddin-individual",
        name: "Puddin' On Duty — Individual Cookie",
        description: "One Puddin' On Duty cookie.",
        price: 5.00,
        stock: 15,
        emoji: "🍌",
        image: "images/puddin-on-duty.jpg",
        available: true
    }
];

const cookieBoxes = [
    {
        id: "mini-6-berry",
        name: "6 Mini Cookies — Berry on Guard",
        quantity: 6,
        description: "Six Berry on Guard mini cookies.",
        price: 13.00,
        stock: 1,
        emoji: "🍓",
        image: "images/berry-on-guard.jpg",
        available: true
    },
    {
        id: "mini-6-sergeants",
        name: "6 Mini Cookies — Sergeant's Stash",
        quantity: 6,
        description: "Six Sergeant's Stash mini cookies.",
        price: 13.00,
        stock: 1,
        emoji: "🍪",
        image: "images/sergeants-stash.jpg",
        available: true
    },
    {
        id: "mini-6-campfire",
        name: "6 Mini Cookies — Campfire Rations",
        quantity: 6,
        description: "Six Campfire Rations mini cookies.",
        price: 13.00,
        stock: 2,
        emoji: "🔥",
        image: "images/campfire-rations.jpg",
        available: true
    },
    {
        id: "mini-4-variety",
        name: "4 Mini Cookies — Variety Pack",
        quantity: 4,
        description: "A variety pack of four mini cookies.",
        price: 6.00,
        stock: 28,
        emoji: "🎁",
        image: "images/4-mini-cookie-pack.jpg",
        available: true
    },
    {
        id: "mini-4-puddin",
        name: "4 Mini Cookies — Puddin' On Duty",
        quantity: 4,
        description: "Four Puddin' On Duty mini cookies.",
        price: 6.00,
        stock: 4,
        emoji: "🍌",
        image: "images/puddin-on-duty.jpg",
        available: true
    },
    {
        id: "mini-4-berry",
        name: "4 Mini Cookies — Berry on Guard",
        quantity: 4,
        description: "Four Berry on Guard mini cookies.",
        price: 6.00,
        stock: 2,
        emoji: "🍓",
        image: "images/berry-on-guard.jpg",
        available: true
    },
    {
        id: "mini-4-sergeants",
        name: "4 Mini Cookies — Sergeant's Stash",
        quantity: 4,
        description: "Four Sergeant's Stash mini cookies.",
        price: 6.00,
        stock: 2,
        emoji: "🍪",
        image: "images/sergeants-stash.jpg",
        available: true
    }
];


/*
   SHOPPING CART

   Items are stored in memory while the page is open.
   A refresh clears the cart in this first version.
*/

const cart = [];

/* Find a product by its ID. */

function findProduct(id) {
    return [...cookies, ...cookieBoxes].find(
        product => product.id === id
    );
}

/* Display money in US dollars. */

function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(price);
}

/* Create a product card. */

function createProductCard(product, isBox = false) {
    const card = document.createElement("article");
    card.className = "product-card";

    
const image = document.createElement("div");
image.className = "product-image";

if (product.image) {
    const photo = document.createElement("img");
    photo.src = product.image;
    photo.alt = product.name;
    image.appendChild(photo);
} else {
    image.textContent = product.emoji;
    image.setAttribute("aria-hidden", "true");
}


    const info = document.createElement("div");
    info.className = "product-info";

    const status = document.createElement("span");
    status.className = "availability";
    status.textContent = product.available
        ? "Available"
        : "Currently Unavailable";

    const name = document.createElement("h3");
    name.textContent = product.name;

    const description = document.createElement("p");
    description.textContent = product.description;

    const details = document.createElement("p");

    if (isBox) {
        details.textContent = `${product.quantity}-cookie preset box`;
    }

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = product.price === null
        ? "Price to be confirmed"
        : formatPrice(product.price);

    const button = document.createElement("button");
    button.className = "product-button";
    button.type = "button";

    button.textContent = product.available
        ? "Add to Cart"
        : "Unavailable";

    button.disabled =
        !product.available || product.price === null;

    
button.addEventListener("click", function () {
    addToCart(product.id);
});


    info.append(
        status,
        name,
        description
    );

    if (isBox) {
        info.append(details);
    }

    info.append(price, button);
    card.append(image, info);

    return card;
}

/* Display all cookie products. */

function displayCookies() {
    const cookieList = document.getElementById("cookie-list");

    cookieList.replaceChildren();

    cookies.forEach(function (cookie) {
        cookieList.appendChild(
            createProductCard(cookie)
        );
    });
}

/* Display the three preset cookie boxes. */

function displayCookieBoxes() {
    const boxList = document.getElementById("box-list");

    boxList.replaceChildren();

    cookieBoxes.forEach(function (box) {
        boxList.appendChild(
            createProductCard(box, true)
        );
    });
}

/* Add a product to the cart. */


function addToCart(productId) {
    const product = findProduct(productId);

    if (
        !product ||
        !product.available ||
        product.price === null
    ) {
        return;
    }

    const existingItem = cart.find(
        item => item.id === productId
    );

    const currentQuantity = existingItem
        ? existingItem.quantity
        : 0;

    if (
        product.stock !== undefined &&
        currentQuantity >= product.stock
    ) {
        alert("Sorry, we don't have any more of this item in stock.");
        return;
    }

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }

    displayCart();

    const cartPanel = document.getElementById("cart-panel");
    cartPanel.hidden = false;
}


/* Change the quantity of an item in the cart. */

function changeQuantity(productId, change) {
    const item = cart.find(
        cartItem => cartItem.id === productId
    );

    if (!item) {
        return;
    }

    item.quantity += change;

    if (item.quantity <= 0) {
        const index = cart.findIndex(
            cartItem => cartItem.id === productId
        );

        cart.splice(index, 1);
    }

    displayCart();
}

/* Display cart items and calculate the total. */

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.replaceChildren();

    let total = 0;
    let itemCount = 0;

    cart.forEach(function (item) {
        const product = findProduct(item.id);

        if (!product) {
            return;
        }

        total += product.price * item.quantity;
        itemCount += item.quantity;

        const row = document.createElement("div");
        row.className = "cart-item";

        const details = document.createElement("div");

        const name = document.createElement("p");
        name.textContent = product.name;

        const subtotal = document.createElement("p");
        subtotal.textContent = formatPrice(
            product.price * item.quantity
        );

        details.append(name, subtotal);

        const controls = document.createElement("div");
        controls.className = "quantity-controls";

        const minusButton = document.createElement("button");
        minusButton.type = "button";
        minusButton.textContent = "−";
        minusButton.setAttribute(
            "aria-label",
            `Remove one ${product.name}`
        );

        minusButton.addEventListener("click", function () {
            changeQuantity(product.id, -1);
        });

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const plusButton = document.createElement("button");
        plusButton.type = "button";
        plusButton.textContent = "+";
        plusButton.setAttribute(
            "aria-label",
            `Add one ${product.name}`
        );

        plusButton.addEventListener("click", function () {
            addToCart(product.id);
        });

        controls.append(
            minusButton,
            quantity,
            plusButton
        );

        row.append(details, controls);
        cartItems.appendChild(row);
    });

    if (cart.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent =
            "Your cart is waiting for its first cookie!";

        cartItems.appendChild(emptyMessage);
    }

    cartCount.textContent = itemCount;
    cartTotal.textContent = formatPrice(total);
}


/* Connect the shopping cart buttons. */

function setupCartButtons() {
    const cartButton = document.getElementById("cart-button");
    const closeButton = document.getElementById("close-cart");
    const clearButton = document.getElementById("clear-cart");
    const cartPanel = document.getElementById("cart-panel");
    const checkoutButton = document.getElementById("checkout-button");
    const checkoutMessage = document.getElementById("checkout-message");

    cartButton.addEventListener("click", function () {
        cartPanel.hidden = false;
    });

    closeButton.addEventListener("click", function () {
        cartPanel.hidden = true;
    });

    clearButton.addEventListener("click", function () {
        cart.length = 0;
        displayCart();
        checkoutMessage.textContent = "";
    });

    checkoutButton.addEventListener("click", async function () {
        if (cart.length === 0) {
            checkoutMessage.textContent =
                "Please add a cookie to your cart first.";
            return;
        }

        checkoutButton.disabled = true;
        checkoutMessage.textContent =
            "Preparing your secure Square checkout...";

        try {
            const response = await fetch("/api/create-checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    items: cart.map(function (item) {
                        return {
                            id: item.id,
                            quantity: item.quantity
                        };
                    })
                })
            });

            const result = await response.json();

            if (!response.ok || !result.checkoutUrl) {
                throw new Error(
                    result.error || "Could not create checkout."
                );
            }

            window.location.href = result.checkoutUrl;
        } catch (error) {
            console.error("Checkout error:", error);
            checkoutMessage.textContent =
                "Checkout could not be started. Please try again.";
            checkoutButton.disabled = false;
        }
    });
}


/* Set the current year in the footer. */

function displayCurrentYear() {
    document.getElementById("current-year").textContent =
        new Date().getFullYear();
}

/* Start the website. */

function initializeWebsite() {
    displayCookies();
    displayCookieBoxes();
    displayCart();
    setupCartButtons();
    displayCurrentYear();
}

document.addEventListener(
    "DOMContentLoaded",
    initializeWebsite
);
