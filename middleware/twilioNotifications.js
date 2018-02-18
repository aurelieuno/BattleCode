const twilioClient = require('../twilioClient');

function formatMessage(challenger) {
  return `You have been challenged by ${challenger}`;
}

exports.notifyOnChallenge = (challenger, phone) => {
  const phoneNb = phone.toString();
  const messageToSend = formatMessage(challenger);
  twilioClient.sendSms(`+1${phoneNb}`, messageToSend);
};
