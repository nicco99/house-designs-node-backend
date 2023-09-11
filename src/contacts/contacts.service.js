const nodemailer = require("nodemailer");

// ... existing code ...

async function create(body) {
  // Call the existing create function
  const contact = body;

  // Send email notification
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "smartdesign12@outlook.com", // user
      pass: "Mwihoko160", //  password
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  const emailContent = `
  <div style=" padding-left: 20px; border-radius: 10px;">
    <h1 style="font-size: 24px; color: #668550; margin-bottom: 16px;">New contact from SMART | DESIGNS</h1>
    <p style="display: flex; flex-direction: column; gap: 10px;">

      <span style="font-size: 16px; color: #3e5f2e;">${contact.name}</span>
    </p>
    <p style="display: flex; flex-direction: column; gap: 10px;">
      <span style="font-size: 16px; color: #3e5f2e;">${contact.email}</span>
    </p>
    <p style="display: flex; flex-direction: column; gap: 10px;">
      <span style="font-size: 16px; color: #3e5f2e;">${contact.subject}</span>
    </p>
    <p style="display: flex; flex-direction: column;">
      <span style="font-size: 16px; color: #3e5f2e;">${contact.message}</span>
    </p>
  </div>
`;

  const mailOptions = {
    from: "smartdesign12@outlook.com",
    to: "nicholasnjeru917@gmail.com",
    subject: "Smart Designs",
    html: emailContent,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  return contact;
}

module.exports = {
  create,
};
