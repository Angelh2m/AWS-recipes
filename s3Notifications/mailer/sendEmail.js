const mailer = require('nodemailer');
const config = require('./config');

module.exports = (content) => {
    console.log("SEND MAIL LOADED");

    return new Promise((resolve, reject) => {

        // Configure transporter
        let transporter = mailer.createTransport({
            host: 'smtp.gmail.com',
            port: 507,
            secure: false,
            service: "gmail",
            auth: {
                user: config.user,
                pass: config.password,
            }
        });


        // Create a string of recipients
        let recipients = 'angelh2m@gmail.com';



        const mailOptions = {
            from: "person@gmail.com",
            to: recipients,
            subject: content.subject,
            text: content.textBody,
            html: content.htmlBody
        }

        console.log('Atempting to send *****************');


        return transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(JSON.stringify(error));
                reject(new Error(JSON.stringify(error)))
            }

            console.log(`Message sent `);
            resolve(`Message sent `)
        });
    });
};