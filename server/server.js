
const express = require("express");
const path = require("path");
const { randomUUID } = require("crypto");

require("dotenv").config({
    path: path.join(__dirname, "..", ".env")
});

const { SquareClient, SquareEnvironment } = require("square");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "..")));

// Server-controlled catalog.
// Only currently available products are included.
const products = {
    "puddin": {
        name: "Puddin' On Duty",
        price: 600
    },
    "sergeants-stash": {
        name: "Sergeant's Stash",
        price: 700
    },
    "lemon-drop-zone": {
        name: "Lemon Drop Zone",
        price: 500
    },
    "campfire-rations": {
        name: "Campfire Rations",
        price: 500
    },
    "berry-on-guard": {
        name: "Berry on Guard",
        price: 500
    },
    "mini-4": {
        name: "4 Mini Cookie Pack",
        price: 600
    },
    "mini-12": {
        name: "12 Mini Cookie Pack",
        price: 1500
    }
};

app.get("/api/health", function (req, res) {
    res.json({
        status: "ok",
        message: "Sgt. V's Mess Hall server is running."
    });
});

app.get("/api/square/locations", async function (req, res) {
    try {
        const square = new SquareClient({
            token: process.env.SQUARE_ACCESS_TOKEN,
            environment: SquareEnvironment.Sandbox
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
        res.status(502).json({
            error: "Unable to retrieve Sandbox locations."
        });
    }
});

// Create a Square-hosted Sandbox checkout for validated cart items.
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

        if (!Array.isArray(items) || items.length === 0 || items.length > 30) {
            return res.status(400).json({
                error: "Your cart must contain between 1 and 30 items."
            });
        }

        const lineItems = [];

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
            environment: SquareEnvironment.Sandbox
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
        res.status(502).json({
            error: "Unable to create Sandbox checkout. Please try again."
        });
    }
});

app.listen(PORT, function () {
    console.log(
        `Sgt. V's Mess Hall server running at http://localhost:${PORT}`
    );
});
