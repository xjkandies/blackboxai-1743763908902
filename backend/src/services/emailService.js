const nodemailer = require('nodemailer');
const { logger } = require('../utils/logger');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_PORT === '465',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }

    async sendVerificationEmail(email, verificationToken) {
        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
        
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Verify Your Email - Cross Platform Music Distribution Service',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #800080;">Welcome to Cross Platform Music Distribution Service!</h2>
                    <p>Thank you for signing up. Please verify your email address to get started.</p>
                    <a href="${verificationUrl}" 
                       style="display: inline-block; 
                              background-color: #800080; 
                              color: white; 
                              padding: 12px 24px; 
                              text-decoration: none; 
                              border-radius: 4px; 
                              margin: 16px 0;">
                        Verify Email
                    </a>
                    <p>Or copy and paste this link in your browser:</p>
                    <p>${verificationUrl}</p>
                    <p>This link will expire in 24 hours.</p>
                    <hr style="border: 1px solid #eee; margin: 20px 0;">
                    <p style="color: #666; font-size: 12px;">
                        If you didn't create an account, you can safely ignore this email.
                    </p>
                </div>
            `
        };

        try {
            await this.transporter.sendMail(mailOptions);
            logger.info(`Verification email sent to ${email}`);
        } catch (error) {
            logger.error('Error sending verification email:', error);
            throw error;
        }
    }

    async sendDistributionStatusUpdate(email, distributionTitle, platform, status) {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: `Distribution Status Update - ${platform}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #800080;">Distribution Status Update</h2>
                    <p>Your track "${distributionTitle}" has been ${status} on ${platform}.</p>
                    <div style="background-color: #f5f5f5; padding: 16px; border-radius: 4px; margin: 16px 0;">
                        <p><strong>Track:</strong> ${distributionTitle}</p>
                        <p><strong>Platform:</strong> ${platform}</p>
                        <p><strong>Status:</strong> ${status}</p>
                    </div>
                    <p>Log in to your dashboard to view more details.</p>
                    <a href="${process.env.FRONTEND_URL}/dashboard" 
                       style="display: inline-block; 
                              background-color: #800080; 
                              color: white; 
                              padding: 12px 24px; 
                              text-decoration: none; 
                              border-radius: 4px; 
                              margin: 16px 0;">
                        View Dashboard
                    </a>
                    <hr style="border: 1px solid #eee; margin: 20px 0;">
                    <p style="color: #666; font-size: 12px;">
                        This is an automated message, please do not reply.
                    </p>
                </div>
            `
        };

        try {
            await this.transporter.sendMail(mailOptions);
            logger.info(`Distribution status update email sent to ${email}`);
        } catch (error) {
            logger.error('Error sending distribution status update email:', error);
            throw error;
        }
    }

    async sendCodePurchaseConfirmation(email, codeType, codeValue) {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: `${codeType} Code Purchase Confirmation`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #800080;">${codeType} Code Purchase Confirmation</h2>
                    <p>Your ${codeType} code has been successfully purchased.</p>
                    <div style="background-color: #f5f5f5; padding: 16px; border-radius: 4px; margin: 16px 0;">
                        <p><strong>Code Type:</strong> ${codeType}</p>
                        <p><strong>Code Value:</strong> ${codeValue}</p>
                    </div>
                    <p>You can now use this code when distributing your music.</p>
                    <a href="${process.env.FRONTEND_URL}/dashboard/codes" 
                       style="display: inline-block; 
                              background-color: #800080; 
                              color: white; 
                              padding: 12px 24px; 
                              text-decoration: none; 
                              border-radius: 4px; 
                              margin: 16px 0;">
                        View My Codes
                    </a>
                    <hr style="border: 1px solid #eee; margin: 20px 0;">
                    <p style="color: #666; font-size: 12px;">
                        Keep this code safe and do not share it with others.
                    </p>
                </div>
            `
        };

        try {
            await this.transporter.sendMail(mailOptions);
            logger.info(`Code purchase confirmation email sent to ${email}`);
        } catch (error) {
            logger.error('Error sending code purchase confirmation email:', error);
            throw error;
        }
    }
}

module.exports = new EmailService();