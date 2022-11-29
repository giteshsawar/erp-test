const preset = {
  tokenExpiryTime: 24 * 60 * 60 * 1000, // 1 day
  rememberTokenExpiryTime: 5 * 24 * 60 * 60 * 1000, // 5 days
  otp_expiry_time: 30 * 60 * 1000, // half an hour
  voteExpiryTime: 50 * 24 * 60 * 60 * 1000, // fifty days for testing
};

module.exports = preset;
