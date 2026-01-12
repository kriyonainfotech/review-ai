const nodemailer = require('nodemailer');

const sendOTPEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // You can change this to your email provider
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for ReviewAI',
        text: `Your OTP for login/registration is: ${otp}. It is valid for 5 minutes.`,
        html: `<h3>ReviewAI Verification</h3><p>Your OTP for login/registration is: <b>${otp}</b></p><p>It is valid for 5 minutes.</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}`);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = { sendOTPEmail };
