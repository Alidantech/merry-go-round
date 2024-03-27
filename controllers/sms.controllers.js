import AfricasTalking from "africastalking";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.SMS_API_KEY;
const username = process.env.SMS_USERNAME;

// Create an instance of the Africastalking SMS service
const smsApi = AfricasTalking({
  apiKey: apiKey,
  username: username,
});

export async function sendAlertViaSMS(phoneNumber, message) {
  try {
    const options = {
      to: `+${phoneNumber}`, // Ensure phone number is in international format
      message: message,
      from: "GROUP NAME", // Set the sender name or identifier
    };

    // Send the SMS
    const response = await smsApi.SMS.send(options);

    // Log the response
    console.log("SMS sent successfully:", response);
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
}

sendAlertViaSMS("254746977253", "You have sent a message");
