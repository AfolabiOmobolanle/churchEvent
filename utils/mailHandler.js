const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

const sendMail = async (eventTitle, user) => {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: `Thank You for registering for ${eventTitle}!!`,
      text: `Dear ${user}, I hope this email finds you well. 
      I want to take a moment to express our gratitude for registering for our upcoming church event. 
      Your participation means a lot to us, and we are thrilled to have you join us.
       Once again, thank you for registering, and we look forward to seeing you soon!`,
      // html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {
  sendMail,
};
