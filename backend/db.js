const mongoose = require('mongoose');


// Force using Google's DNS to resolve SRV records if the local DNS is failing (NXDOMAIN)


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // No longer exiting process so server can stay alive for health checks/debugging
  }
};

module.exports = connectDB;
