// import twilio from "twilio";

// const client = twilio(
//   process.env.TWILIO_SID,
//   process.env.TWILIO_AUTH
// );

// export const sendOtpSms = async (phone, otp) => {
//   await client.messages.create({
//     body: `Your FixNest OTP is ${otp}`,
//     messagingServiceSid: process.env.TWILIO_MSG_SID,
//     to: phone,
//   });
// };

// import axios from "axios";

// export const sendOtpSms = async (phone, otp) => {
//   try {
//     // convert +91XXXXXXXXXX → 91XXXXXXXXXX
//     const formattedPhone = phone.startsWith("+")
//       ? phone.slice(1)
//       : `91${phone}`;

//     const res = await axios.post(
//       "https://control.msg91.com/api/v5/otp",
//       {
//         mobile: formattedPhone,
//         authkey: process.env.MSG91_AUTHKEY,
//         otp: otp
//       }
//     );

//     console.log("MSG91 SUCCESS:", res.data);

//   } catch (err) {
//     console.error("MSG91 ERROR:", err.response?.data || err.message);
//     throw new Error("OTP sending failed");
//   }
// };

import SibApiV3Sdk from "sib-api-v3-sdk"

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

const emailsApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sendOtpEmail = async (email, otp) => {
    try {
    await emailsApi.sendTransacEmail({
         sender: { email: process.env.SENDER_EMAIL,
            name: "Otp"
         },

         to: [{ email: email }],
         subject: "Your FixNest OTP",
         htmlContent: `<p>Your FixNest OTP is <strong>${otp}</strong></p>`
    })
    } catch (error) {
        console.error("BREVO ERROR:", error);
        throw new Error("OTP sending failed");
    }
}

export { sendOtpEmail }