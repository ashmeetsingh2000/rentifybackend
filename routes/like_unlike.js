const express = require('express');
const router = express.Router();
const buyers = require('../models/registerbuyer_model');
const properties = require('../models/property_model');

// Add user Liked Property id
router.post('/like', async (req, res) => {
    try {
        const { buyer_ID, property_ID } = req.body;

        // update property like counter
        const propertyDetail = await properties.findById(property_ID);
        propertyDetail.product_likes += 1;
        await propertyDetail.save();
        // update property like counter

        // update buyer list
        const buyerDetails = await buyers.findById(buyer_ID);
        buyerDetails.buyer_likedProperties.push(property_ID);
        await buyerDetails.save();
        // update buyer list

        res.status(200).json({ message: 'List updated successfully', updatedLikeCount: propertyDetail.product_likes });
    } catch (error) {
        res.status(500).json({ message: 'Rentify server error' });
    }
});
// Add user Liked Property id


// Remove user Liked Property id
router.post('/unlike', async (req, res) => {
    try {
        const { buyer_ID, property_ID } = req.body;

        // update property like counter
        const propertyDetail = await properties.findById(property_ID);
        propertyDetail.product_likes -= 1;
        await propertyDetail.save();
        // update property like counter

        // update buyer list
        const buyerDetails = await buyers.findById(buyer_ID);
        buyerDetails.buyer_likedProperties = buyerDetails.buyer_likedProperties.filter(item => item !== property_ID);
        await buyerDetails.save();
        // update buyer list

        res.status(200).json({ message: 'List updated successfully', updatedLikeCount: propertyDetail.product_likes });
    } catch (error) {
        res.status(500).json({ message: 'Rentify server error' });
    }
});
// Remove user Liked Property id

module.exports = router;