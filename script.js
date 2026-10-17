
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
        id: "code-red",
        name: "Code Red Velvet",
        description:
            "A rich red velvet cookie loaded with Oreo pieces, Hershey's Cookies 'n' Creme, and Ghirardelli chocolate. A chocolate-packed mission in every bite!",
        price: 7.00,
        emoji: "❤️",
        image: "images/code-red-velvet.jpg",
        available: false
    },
    {
        id: "shortcake",
        name: "Operation Shortcake",
        description:
            "A strawberry-infused sugar cookie with strawberry pieces and sweet white chocolate. A berry-sweet mission from the first bite to the last!",
        price: 7.00,
        emoji: "🍓",
        image: "images/operation-shortcake.jpg",
        available: false
    },
    {
        id: "puddin",
        name: "Puddin' On Duty",
        description:
            "A soft, thick banana pudding cookie with NILLA wafer pieces and creamy white chocolate chips. A sweet mission in every bite!",
        price: 6.00,
        emoji: "🍌",
        image: "images/puddin-on-duty.jpg",
        available: true
    },
    {
        id: "sergeants-stash",
        name: "Sergeant's Stash",
        description:
            "A thick, loaded chocolate chip cookie packed with semi-sweet and milk chocolate chips, crushed vanilla wafers, and a touch of flaky sea salt. Serious reinforcements for your sweet tooth!",
        price: 7.00,
        emoji: "🍪",
        image: "images/sergeants-stash.jpg",
        available: true
    },
    {
        id: "battle-buddies",
        name: "Battle Buddies",
        description:
            "Two cookies. One sweet mission. Choose any two cookies from Sgt. V's Mess Hall and create your perfect sweet duo!",
        price: 12.00,
        emoji: "💕",
        image: "",
        available: false
    },
    {
        id: "lemon-drop-zone",
        name: "Lemon Drop Zone",
        description:
            "A bright, buttery lemon cookie finished with a sweet white drizzle. A little citrus backup for your sweet tooth!",
        price: 5.00,
        emoji: "🍋",
        image: "images/lemon-drop-zone.jpg",
        available: true
    },
    {
        id: "campfire-rations",
name: "Campfire Rations",
description:
    "A golden, campfire-inspired cookie topped with marshmallow pieces. Sweet, cozy, and ready for snack duty!",
price: 5.00,
emoji: "🔥",
image: "images/campfire-rations.jpg",
available: true
    },
    {
        id: "berry-on-guard",
        name: "Berry on Guard",
        description:
            "A berry-inspired pink cookie finished with sweet white drizzle and strawberry-colored crumbles. Reporting for sweet duty!",
        price: 5.00,
        emoji: "🍓",
        image: "images/berry-on-guard.jpg",
        available: true
    }
];


/*
   PRESET  MINI COOKIE BOXES

   These are preset assortments. Customers do not
   select individual flavors for these boxes.
*/




const cookieBoxes = [
    {
        id: "mini-4",
        name: "4 Mini Cookie Pack",
        quantity: 4,
        description:
            "Four bite-sized cookies packed for a little sweet mission.",
        price: 6.00,
        emoji: "🍪",
        image: "images/4-mini-cookie-pack.jpg",
        available: true
    },
    {
        id: "mini-6",
        name: "6 Mini Cookie Pack",
        quantity: 6,
        description:
            "Six bite-sized cookies. Coming soon!",
        price: null,
        emoji: "🎀",
        image: "",
        available: false
    },
    {
        id: "mini-12",
        name: "12 Mini Cookie Pack",
        quantity: 12,
        description:
            "Twelve mini cookies packed for sharing with your whole crew.",
        price: 15.00,
        emoji: "🎁",
        image: "images/12-mini-cookie-pack.jpg",
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
