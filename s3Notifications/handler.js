'use strict';
const mailer = require('./mailer');

module.exports.s3_notification = (event, context, callback) => {

  // console.log('\n\n\n\n\n\n', event.Records);
  // console.log('\n\n\n\n\n\n', event.Records[0].s3);


  const uploadData = event.Records.map(record => {
    return {
      bucketName: record.s3.bucket.name,
      file: record.s3.object.key,
      fileSize: record.s3.object.size
    }
  });

  console.log('\n\n', uploadData);

  mailer.generateContent(uploadData)
    .then(content => {

      console.log("MAILER LOADED");
      console.log(content.subject);
      console.log(content.textBody);
      console.log(content.htmlBody);

      return mailer.sendEmail(content)
        .then((message) => {
          const response = {
            statusCode: 200,
            body: JSON.stringify({
              message: 'Succcesfully sent an email',
              input: message,
            }),
          };

          callback(null, response);

        }).catch(error => {
          console.log(error);
          const response = {
            statusCode: 500,
            body: JSON.stringify({
              message: 'Error',
              input: error,
              error
            }),
          };

          callback(null, response);
        })

    }).catch(err => {

      console.log(err)

      const response = {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Error',
          input: err,
          err
        }),
      };

      callback(null, response);
    })




  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};