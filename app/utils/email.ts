import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  region: "us-east-2",
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

function sendEmail(to: string, subject: string, message: string): boolean {
  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: message,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: "Dagpi <notifier@noreply.mail.dagpi.xyz>",
  };
  let out;
  ses.sendEmail(params, (err, data) => {
    if (err) {
      out = false;
    } else {
      out = true;
    }
  });
  return out;
}

function sendEmailTemplate(
  to: string,
  data: string,
  template: string
): boolean {
  const params = {
    Template: template,
    Destination: {
      ToAddresses: [to],
    },
    TemplateData: data,
    Source: "Dagpi <notifier@noreply.mail.dagpi.xyz>",
  };
  let out;
  ses.sendTemplatedEmail(params, (err, data) => {
    if (err) {
      out = false;
    } else {
      out = true;
    }
  });
  return out;
}

export { sendEmail, sendEmailTemplate };
