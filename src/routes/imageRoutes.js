// src/routes/imageRoutes.js

const express = require('express');
const router = express.Router();
const { Image } = require('../db/conn'); // Import the Image model

// Route to serve images
router.get('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).send('Image not found');
    }
    res.contentType(image.contentType);
    res.send(image.data);
  } catch (error) {
    console.error('Error retrieving image:', error);
    res.status(500).send('Error retrieving image');
  }
});

module.exports = router;
