const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth');
const StripeService = require('../services/stripeService');
const Code = require('../models/Code');
const { logger } = require('../utils/logger');

// Create checkout session for code purchase
router.post('/create-checkout-session', authMiddleware, async (req, res, next) => {
    try {
        const { quantity, codeType } = req.body;
        const userId = req.user.userId;

        const session = await StripeService.createCheckoutSession({
            quantity,
            codeType,
            userId,
            successUrl: `${process.env.FRONTEND_URL}/codes/success?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: `${process.env.FRONTEND_URL}/codes/cancel`
        });

        res.json({ url: session.url });
    } catch (error) {
        logger.error('Create checkout session error:', error);
        next(error);
    }
});

// Stripe webhook handler
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    try {
        const sig = req.headers['stripe-signature'];
        const event = await StripeService.handleWebhook(req.body, sig);

        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                const { userId, codeType, quantity } = session.metadata;

                // Generate and store codes
                for (let i = 0; i < parseInt(quantity); i++) {
                    const codeValue = await Code.generateUniqueCode(codeType);
                    await Code.create({
                        userId: parseInt(userId),
                        codeType,
                        codeValue
                    });
                }

                break;
            }
        }

        res.json({ received: true });
    } catch (error) {
        logger.error('Webhook error:', error);
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
});

module.exports = router;