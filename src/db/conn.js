const mongoose = require("mongoose");

// Define Mongoose schema for Image
const imageSchema = new mongoose.Schema({
    name: String, // Add any other fields you need for the image
    data: Buffer, // Store the image data as Buffer
    contentType: String // Specify the content type of the image (e.g., 'image/jpeg', 'image/png')
  });

  // Create Mongoose model for Image
const Image = mongoose.model('Image', imageSchema);

// connection creation and creating new db
mongoose.connect("mongodb://0.0.0.0:27017/signup", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`connection successful`);
}).catch((err) => {
    console.log(err);
});

// module.exports = mongoose.connection;
module.exports = {
    Image, // Export the Image model for use in other files
    mongoose // Export the mongoose connection object for advanced usage if needed
  };
