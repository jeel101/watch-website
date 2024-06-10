// prepareImages.js

const fs = require('fs');
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'images';

// Create a new MongoClient
const client = new MongoClient(uri);

async function main() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    console.log('Connected to the database');

    // Database instance
    const db = client.db(dbName);

    // Read the image file as a Buffer
    const imageBuffer = fs.readFileSync('public/img/bg-image.jpg');

    // Convert the image buffer to a Base64-encoded string
    const base64Image = imageBuffer.toString('base64');

    // Insert the image data into the database
    const result = await db.collection('images').insertOne({
      name: 'example.jpg',
      data: base64Image,
      contentType: 'image/jpeg'
    });

    console.log('Image stored in the database');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

// Call the main function
main();
