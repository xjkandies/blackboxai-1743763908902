const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { logger } = require('../utils/logger');

class StripeService {
    static async createPaymentIntent({ amount, currency = 'usd', metadata }) {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount * 100, // Convert to cents
                currency,
                metadata
            });
            return paymentIntent;
        } catch (error) {
            logger.error('Error creating payment intent:', error);
            throw error;
        }
    }

    static async createCheckoutSession({ quantity, codeType, userId, successUrl, cancelUrl }) {
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${codeType} Code`,
                            description: `${quantity} ${codeType} code${quantity > 1 ? 's' : ''} at $5 each`,
                        },
                        unit_amount: 500, // $5.00 in cents
                    },
                    quantity,
                }],
                mode: 'payment',
                success_url: successUrl,
                cancel_url: cancelUrl,
                metadata: {
                    userId,
                    codeType,
                    quantity
                }
            });
            return session;
        } catch (error) {
            logger.error('Error creating checkout session:', error);
            throw error;
        }
    }

    static async handleWebhook(payload, signature) {
        try {
            const event = stripe.webhooks.constructEvent(
                payload,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );
            return event;
        } catch (error) {
            logger.error('Error handling webhook:', error);
            throw error;
        }
    }
}

module.exports = StripeService;