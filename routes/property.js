const express = require('express');
const router = express.Router();

const properties = require('../models/property_model');

// get all property
router.post('/propertylist', async (req, res) => {

    const { title, location, bedrooms, bathrooms, page } = req.body;

    const pageNo = page;
    const limitRange = 10;
    const skip = (pageNo - 1) * limitRange;

    let filter = {};
    if (title) filter.product_title = new RegExp(title, 'i');
    if (location) filter.product_location = new RegExp(location, 'i');
    if (bedrooms !== '') filter.product_bedrooms = bedrooms;
    if (bathrooms !== '') filter.product_bathrooms = bathrooms;

    try {
        let data, total = '';
        if (Object.keys(filter).length === 0) {
            data = await properties.find().skip(skip).limit(limitRange);
            total = await properties.countDocuments();
        }
        else {
            data = await properties.find(filter).skip(skip).limit(limitRange);
            total = await properties.countDocuments(filter);
        }
        res.status(200).json({
            data,
            totalPages: Math.ceil(total / limitRange),
            currentPage: pageNo,
        });
    } catch (error) {
        res.status(500).json({ message: 'Rentify server error' });
    }
})
// get all property

// get one property Detail
router.get('/detail/:id', async (req, res) => {
    try {
        const document = await properties.findOne({ _id: req.params.id });
        if (document) {
            res.status(200).json({ data: document });
        } else {
            res.status(404).json({ message: 'Property not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Rentify server error' });
    }
});
// get one property Detail

// update one property Detail
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updateFields = req.body;
    try {
        await properties.findByIdAndUpdate(id, updateFields, { new: true });
        return res.status(200).json({ message: 'property updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Rentify server error' });
    }
})
// update one property Detail


// get all property of a seller
router.get('/:id', async (req, res) => {
    try {
        const sellerid = req.params.id;
        properties.find({ seller_id: sellerid })
            .then(results => {
                if (results.length === 0) {
                    res.status(200).json({ data: ['Zero Property Listed'] });
                }
                else {
                    res.status(200).json({ data: results });
                }
            })
            .catch(error => {
                return res.status(400).json({ message: 'Server Error' });
            });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
})
// get all property of a seller

// Add new property of a seller
router.post('/addproperty', async (req, res) => {
    const {
        title: product_title,
        location: product_location,
        price: product_price,
        bedrooms: product_bedrooms,
        bathrooms: product_bathrooms,
        description: product_description,
        likes: product_likes,
        sellerid: seller_id
    } = req.body;
    try {
        const newProperty = new properties({ seller_id, product_title, product_location, product_price, product_bedrooms, product_bathrooms, product_description, product_likes });
        await newProperty.save();
        res.status(201).json({ message: 'Property added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Rentify Server Error' });
    }
});
// Add new property of a seller

// Delete Property of a seller
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await properties.deleteOne({ _id: id })
        res.status(204).json({ message: 'Property deleted successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Rentify Server Error' });
    }
});
// Delete Property of a seller

module.exports = router;