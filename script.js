/* ========================================
   SGT. V'S MESS HALL
   Cookie Catalog and Shopping Cart
======================================== */

/* INDIVIDUAL COOKIES */

const cookies = [
    {
        id: "puddin-individual",
        name: "Puddin' On Duty",
        description: "One Puddin' On Duty cookie.",
        price: 5.00,
        stock: 15,
        emoji: "🍌",
        image: "images/puddin-individual.jpg",
        available: true
    },
    {
        id: "berry-individual",
        name: "Berry on Guard",
        description: "One Berry on Guard cookie.",
        price: 5.00,
        stock: 19,
        emoji: "🍓",
        image: "images/berry-individual.jpg",
        available: true
    },
    {
        id: "sergeants-individual",
        name: "Sgt. Stash",
        description: "One Sgt. Stash cookie.",
        price: 6.00,
        stock: 16,
        emoji: "🍪",
        image: "images/sergeants-stash-individual.jpeg",
        available: true
    },
    {
        id: "shortcake-individual",
        name: "Operation Shortcake",
        description: "One Operation Shortcake cookie.",
        price: null,
        stock: 0,
        emoji: "🍰",
        image: null,
        available: false
    }
];


/* MINI COOKIE BOXES */

const cookieBoxes = [
    {
        id: "mini-6-berry",
        name: "6 Mini Cookies — Berry on Guard",
        quantity: 6,
        description: "Six Berry on Guard mini cookies.",
        price: 13.00,
        stock: 0,
        emoji: "🍓",
        image: "images/berry-on-guard.jpg",
        available: false
    },
    {
        id: "mini-6-sergeants",
        name: "6 Mini Cookies — Sgt. Stash",
        quantity: 6,
        description: "Six Sgt. Stash mini cookies.",
        price: 13.00,
        stock: 0,
        emoji: "🍪",
        image: "images/sergeants-stash.jpg",
        available: false
    },
    {
        id: "mini-6-campfire",
        name: "6 Mini Cookies — Campfire Rations",
        quantity: 6,
        description: "Six Campfire Rations mini cookies.",
        price: 13.00,
        stock: 0,
        emoji: "🔥",
        image: "images/campfire-rations.jpg",
        available: false
    },
    {
        id: "mini-4-variety",
        name: "4 Mini Cookies — Variety Pack",
        quantity: 4,
        description: "A variety pack of four mini cookies.",
        price: 6.00,
        stock: 9,
        emoji: "🎁",
        image: "images/4-mini-cookie-pack.jpg",
        available: true
    },
    {
    id: "mini-3-variety",
    name: "3 Mini Cookies — Variety Pack",
    quantity: 3,
    description: "A variety pack of three mini cookies.",
    price: 4.00,
    stock: 17,
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
        name: "4 Mini Cookies — Sgt. Stash",
        quantity: 4,
        description: "Four Sgt. Stash mini cookies.",
        price: 6.00,
        stock: 2,
        emoji: "🍪",
        image: "images/sergeants-stash.jpg",
        available: true
    }
];


/* BATTLE BUDDIES */

const battleBuddies = [
    {
        id: "battle-puddin",
        name: "Puddin' On Duty Battle Buddies",
        description: "Two Puddin' On Duty cookies packed together.",
        quantity: 2,
        price: 10.00,
        stock: 5,
        emoji: "🍌",
        image: "images/battle-buddies-puddin.jpg",
        available: true
    },
    {
        id: "battle-sgt-stash",
        name: "Sgt. Stash Battle Buddies",
        description: "Two Sgt. Stash cookies packed together.",
        quantity: 2,
        price: 10.00,
        stock: 7,
        emoji: "🍪",
        image: "images/battle-buddies-sgt-stash.jpg",
        available: true
    },
    {
        id: "battle-shortcake",
        name: "Operation Shortcake Battle Buddies",
        description: "Two Operation Shortcake cookies packed together.",
        quantity: 2,
        price: 10.00,
        stock: 3,
        emoji: "🍰",
        image: "images/battle-buddies-shortcake.jpg",
        available: true
    }
];


/* SHOPPING CART */

const cart = [];


/* FIND A PRODUCT */

function findProduct(id) {
    return [...cookies, ...cookieBoxes, ...battleBuddies].find(
        product => product.id === id
    );
}


/* FORMAT PRICES */

function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(price);
}


/* CREATE A PRODUCT IMAGE */

function createProductImage(product) {
    const image = document.createElement("div");
    image.className = "product-image";

    if (product.image) {
        const photo = document.createElement("img");
        photo.src = product.image;
        photo.alt = product.name;

        photo.onerror = function () {
            image.textContent = product.emoji;
        };

        image.appendChild(photo);
    } else {
        image.textContent = product.emoji;
        image.setAttribute("aria-hidden", "true");
    }

    return image;
}


/* CREATE A REGULAR PRODUCT CARD */

function createProductCard(product, isBox = false) {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = createProductImage(product);

    const info = document.createElement("div");
    info.className = "product-info";

    const status = document.createElement("span");
    status.className = product.available
        ? "availability"
        : "availability sold-out";

    status.textContent = product.available ? "Available" : "SOLD OUT";

    const name = document.createElement("h3");
    name.textContent = product.name;

    const description = document.createElement("p");
    description.textContent = product.description;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = formatPrice(product.price);

    const button = document.createElement("button");
    button.className = "product-button";
    button.type = "button";
    button.textContent = product.available ? "Add to Cart" : "SOLD OUT";
    button.disabled = !product.available;

    button.addEventListener("click", function () {
        addToCart(product.id);
    });

    info.append(status, name, description);

    if (isBox) {
        const details = document.createElement("p");
        details.textContent = `${product.quantity} cookies per box`;
        info.appendChild(details);
    }

    info.append(price, button);
    card.append(image, info);

    return card;
}


/* DISPLAY INDIVIDUAL COOKIES WITH A DROPDOWN */

function displayCookies() {
    const cookieList = document.getElementById("cookie-list");

    cookieList.replaceChildren();

    const card = document.createElement("article");
    card.className = "product-card";

    const image = createProductImage(cookies[0]);

    const info = document.createElement("div");
    info.className = "product-info";

    const status = document.createElement("span");
    status.className = "availability";

    const name = document.createElement("h3");
    name.textContent = "Individual Cookies";

    const description = document.createElement("p");
    description.textContent = "Choose your favorite cookie flavor.";

    const label = document.createElement("label");
    label.textContent = "Select a flavor:";

    const select = document.createElement("select");
    select.className = "product-select";
    select.setAttribute("aria-label", "Choose an individual cookie flavor");

    cookies.forEach(function (cookie) {
        const option = document.createElement("option");
        option.value = cookie.id;
        option.textContent = cookie.available
            ? cookie.name
            : `${cookie.name} — SOLD OUT`;

        select.appendChild(option);
    });

    const price = document.createElement("p");
    price.className = "product-price";

    const button = document.createElement("button");
    button.className = "product-button";
    button.type = "button";

    function updateIndividualCookie() {
    const selectedCookie = findProduct(select.value);

    const currentImage = card.querySelector(".product-image");

    if (currentImage) {
        currentImage.replaceWith(createProductImage(selectedCookie));
    }

    status.textContent = selectedCookie.available
        ? "Available"
        : "SOLD OUT";

    status.className = selectedCookie.available
        ? "availability"
        : "availability sold-out";

    price.textContent = selectedCookie.price === null
        ? "Price to be confirmed"
        : formatPrice(selectedCookie.price);

    button.textContent = selectedCookie.available
        ? "Add to Cart"
        : "SOLD OUT";

    button.disabled = !selectedCookie.available;
}

    select.addEventListener("change", updateIndividualCookie);

    button.addEventListener("click", function () {
        addToCart(select.value);
    });

    info.append(
        status,
        name,
        description,
        label,
        select,
        price,
        button
    );

    card.append(image, info);
    cookieList.appendChild(card);

    updateIndividualCookie();
}


/* DISPLAY MINI COOKIE BOXES */
function createVarietyPackCard() {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = createProductImage(
        findProduct("mini-4-variety")
    );

    const info = document.createElement("div");
    info.className = "product-info";

    const status = document.createElement("span");
    status.className = "availability";
    status.textContent = "Available";

    const name = document.createElement("h3");
    name.textContent = "Variety Pack";

    const description = document.createElement("p");
    description.textContent = "Choose your pack size.";

    const label = document.createElement("label");
    label.textContent = "Select pack size:";

    const select = document.createElement("select");
    select.className = "product-select";

    const fourPack = document.createElement("option");
    fourPack.value = "mini-4-variety";
    fourPack.textContent = "4 Mini Cookies — $6.00";

    const threePack = document.createElement("option");
    threePack.value = "mini-3-variety";
    threePack.textContent = "3 Mini Cookies — $4.00";

    select.append(fourPack, threePack);

    const price = document.createElement("p");
    price.className = "product-price";

    const button = document.createElement("button");
    button.className = "product-button";
    button.type = "button";
    button.textContent = "Add to Cart";

    function updatePack() {
        const product = findProduct(select.value);

        price.textContent = formatPrice(product.price);
        status.textContent = product.available ? "Available" : "SOLD OUT";
        status.className = product.available
            ? "availability"
            : "availability sold-out";

        button.disabled = !product.available;
        button.textContent = product.available
            ? "Add to Cart"
            : "SOLD OUT";
    }

    select.addEventListener("change", updatePack);

    button.addEventListener("click", function () {
        addToCart(select.value);
    });

    info.append(
        status,
        name,
        description,
        label,
        select,
        price,
        button
    );

    card.append(image, info);

    updatePack();

    return card;
}
function displayCookieBoxes() {
    const boxList = document.getElementById("box-list");

    boxList.replaceChildren();

    boxList.appendChild(createVarietyPackCard());

    cookieBoxes.forEach(function (box) {
        if (
            box.id !== "mini-4-variety" &&
            box.id !== "mini-3-variety"
        ) {
            boxList.appendChild(createProductCard(box, true));
        }
    });
}


/* DISPLAY BATTLE BUDDIES */

function displayBattleBuddies() {
    const battleList = document.getElementById("battle-list");

    battleList.replaceChildren();

    battleBuddies.forEach(function (box) {
        battleList.appendChild(createProductCard(box, true));
    });
}


/* ADD A PRODUCT TO THE CART */

function addToCart(productId) {
    const product = findProduct(productId);

    if (!product || !product.available || product.price === null) {
        return;
    }

    const existingItem = cart.find(
        item => item.id === productId
    );

    const currentQuantity = existingItem
        ? existingItem.quantity
        : 0;

    if (currentQuantity >= product.stock) {
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

    document.getElementById("cart-panel").hidden = false;
}


/* CHANGE CART QUANTITY */

function changeQuantity(productId, change) {
    const item = cart.find(
        cartItem => cartItem.id === productId
    );

    if (!item) {
        return;
    }

    if (change > 0) {
        addToCart(productId);
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


/* DISPLAY CART ITEMS AND TOTAL */

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

        controls.append(minusButton, quantity, plusButton);
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


/* CONNECT SHOPPING CART BUTTONS */

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


/* DISPLAY CURRENT YEAR */

function displayCurrentYear() {
    document.getElementById("current-year").textContent =
        new Date().getFullYear();
}


/* START WEBSITE */

function initializeWebsite() {
    displayCookies();
    displayCookieBoxes();
    displayBattleBuddies();
    displayCart();
    setupCartButtons();
    displayCurrentYear();
}

document.addEventListener(
    "DOMContentLoaded",
    initializeWebsite
);