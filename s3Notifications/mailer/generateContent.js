const momentTimeZone = require('moment-timezone');


module.exports = (data) => {
    return new Promise((resolve, reject) => {
        try {
            // Timestamp
            const Timestamp = `${momentTimeZone.tz('America/Los_Angeles')
            .format('MMMM Do, h:mm:ss a')} PT.`
            // Subject Line
            const subject = `New upload to S3 bucket ${data.bucketName}`;
            // Text body
            const textBody = ` Great news your file was uploaded ${data.file}`
            // HTML body
            const htmlBody = `<h3> HTML CONTENT HERE !!</h3>`

            resolve({
                subject,
                textBody,
                htmlBody
            });

        } catch (error) {
            console.log(`Error generating email content`, error);
            reject(new Error(JSON.stringify(error)));
        }
    })
}