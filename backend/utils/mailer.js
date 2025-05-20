const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

exports.sendResetEmail = async (to, resetLink) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Worker Password Reset Request',
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 1 hour.</p>`
    };
    await transporter.sendMail(mailOptions);
};
