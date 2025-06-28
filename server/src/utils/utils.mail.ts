import nodemailer from 'nodemailer';

export async function sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string
): Promise<void> {
    // Configure the transporter (use your SMTP credentials)
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_FROM,
            pass: process.env.SMTP_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.SMTP_FROM || '"No Reply" <no-reply@example.com>',
        to,
        subject,
        text,
        html,
    });
}