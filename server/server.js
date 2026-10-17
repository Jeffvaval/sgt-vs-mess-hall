
const express = require("express");
const path = require("path");
const { randomUUID } = require("crypto");

require("dotenv").config({
    path: path.join(__dirname, "..", ".env")
});

const { SquareClient, SquareEnvironment } = require("square");

// Use Production only when SQUARE_ENVIRONMENT is "production".
// Otherwise, default to Sandbox.
const squareEnvironment =
    process.env.SQUARE_ENVIRONMENT === "production"
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "..")));

// Server-controlled catalog.
const products = {

    "puddin-individual": {
        name: "Puddin' On Duty — Individual Cookie",
        price: 500,
        stock: 15
    },
    "berry-individual": {
        name: "Berry on Guard — Individual Cookie",
        price: 500,
        stock: 19
    },
    "sergeants-individual": {
        name: "Sergeant's Stash — Individual Cookie",
        price: 600,
        stock: 16
    },

    "mini-6-berry": {
        name: "6 Mini Cookies — Berry on Guard",
        price: 1300,
        stock: 1
    },
    "mini-6-sergeants": {
        name: "6 Mini Cookies — Sergeant's Stash",
        price: 1300,
        stock: 1
    },
    "mini-6-campfire": {
        name: "6 Mini Cookies — Campfire Rations",
        price: 1300,
        stock: 2
    },
    "mini-4-variety": {
        name: "4 Mini Cookies — Variety Pack",
        price: 600,
        stock: 28
    },
    "mini-4-puddin": {
        name: "4 Mini Cookies — Puddin' On Duty",
        price: 600,
        stock: 4
    },
    "mini-4-berry": {
        name: "4 Mini Cookies — Berry on Guard",
        price: 600,
        stock: 2
    },
    "mini-4-sergeants": {
        name: "4 Mini Cookies — Sergeant's Stash",
        price: 600,
        stock: 2
    }
};


app.get("/api/health", function (req, res) {
    res.json({
        status: "ok",
        message: "Sgt. V's Mess Hall server is running."
    });
});

// Retrieve locations from the selected Square environment.
app.get("/api/square/locations", async function (req, res) {
    try {
        if (!process.env.SQUARE_ACCESS_TOKEN) {
            return res.status(500).json({
                error: "Square access token is not configured."
            });
        }

        const square = new SquareClient({
            token: process.env.SQUARE_ACCESS_TOKEN,
            environment: squareEnvironment
        });

        const result = await square.locations.list();

        res.json({
            locations: (result.locations || []).map(function (location) {
                return {
                    id: location.id,
                    name: location.name,
                    status: location.status
                };
            })
        });
    } catch (error) {
        console.error("Square location request failed.");
        console.error("Error message:", error.message);

        res.status(502).json({
            error: "Unable to retrieve Square locations."
        });
    }
});


 // Create a Square-hosted checkout for validated cart items.
app.post("/api/create-checkout", async function (req, res) {
    try {
        if (
            !process.env.SQUARE_ACCESS_TOKEN ||
            !process.env.SQUARE_LOCATION_ID
        ) {
            return res.status(500).json({
                error: "Square configuration is incomplete."
            });
        }

        const items = req.body.items;

        if (
            !Array.isArray(items) ||
            items.length === 0 ||
            items.length > 30
        ) {
            return res.status(400).json({
                error: "Your cart must contain between 1 and 30 items."
            });
        }

        const lineItems = [];
        const requestedQuantities = {};

        for (const item of items) {
            if (
                !item ||
                typeof item.id !== "string" ||
                !Number.isSafeInteger(item.quantity) ||
                item.quantity < 1 ||
                item.quantity > 20
            ) {
                return res.status(400).json({
                    error: "A cart item or quantity is invalid."
                });
            }

            const product = products[item.id];

            if (!product) {
                return res.status(400).json({
                    error: "A product is unavailable for checkout."
                });
            }

            requestedQuantities[item.id] =
                (requestedQuantities[item.id] || 0) + item.quantity;

            if (
                Number.isSafeInteger(product.stock) &&
                requestedQuantities[item.id] > product.stock
            ) {
                return res.status(400).json({
                    error:
                        product.name +
                        " has only " +
                        product.stock +
                        " available. Please update your cart."
                });
            }

            lineItems.push({
                name: product.name,
                quantity: String(item.quantity),
                basePriceMoney: {
                    amount: BigInt(product.price),
                    currency: "USD"
                }
            });
        }

        const square = new SquareClient({
            token: process.env.SQUARE_ACCESS_TOKEN,
            environment: squareEnvironment
        });

        const result = await square.checkout.paymentLinks.create({
            idempotencyKey: randomUUID(),
            order: {
                locationId: process.env.SQUARE_LOCATION_ID,
                lineItems: lineItems
            }
        });

        if (!result.paymentLink || !result.paymentLink.url) {
            return res.status(502).json({
                error: "Square did not return a checkout link."
            });
        }

        res.json({
            checkoutUrl: result.paymentLink.url
        });
    } catch (error) {
        console.error("Square checkout creation failed.");
        console.error("Error message:", error.message);

        if (error.errors) {
            console.error(
                "Square API errors:",
                JSON.stringify(error.errors)
            );
        }

        res.status(502).json({
            error: "Unable to create Square checkout. Please try again."
        });
    }
});


app.listen(PORT, "0.0.0.0", function () {
    console.log(
        `Sgt. V's Mess Hall server running on port ${PORT}`
    );
});
