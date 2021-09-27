import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, html: string) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
    console.log(testAccount);

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "xs5kabawqyufjfem@ethereal.email", // generated ethereal user
            pass: "XeYErkh9V3WCbRYUNY", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: to, // list of receivers
        subject: "Change password", // Subject line
        html, // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

// {
//     user: 'dpmadqmohsiqxfl2@ethereal.email',
//     pass: '8kKMrqMHSnvrbQKQN1',
//     smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
//     imap: { host: 'imap.ethereal.email', port: 993, secure: true },
//     pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
//     web: 'https://ethereal.email'
//   }
