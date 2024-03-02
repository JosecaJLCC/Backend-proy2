
import cleverbot from 'cleverbot-free'



//require("dotenv").config();

export const askToChatGpt = async function (req, res) {
  const { message } = req.body;
  const response = await cleverbot(message);
  res.json({
    response: response,
  });
};




