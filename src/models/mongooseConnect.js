const mongoose = require("mongoose");

async function mongoseConnect(url) {
  return await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}

module.exports = mongoseConnect;

