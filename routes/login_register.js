const express = require('express');
const router = express.Router();

const sellers = require('../models/registerseller_model');
const buyers = require('../models/registerbuyer_model');

// Login Buyer or Seller
router.post('/login', async (req, res) => {

    if (req.body.type === 'buyer') {
        try {
            const { email: buyer_email, password: buyer_password } = req.body;
            let response = await buyers.findOne({ buyer_email });
            if (!response) {
                return res.status(401).json({ message: 'Invalid Credentials' });
            }
            else {
                if (response.buyer_password == buyer_password) {
                    return res.status(200).json({ data: response });
                }
                else {
                    return res.status(401).json({ message: 'Incorrect Password' });
                }
            }
        } catch (error) {
            res.status(500).json({ message: 'Rentify server error' });
        }
    }
    else {
        try {
            const { email: seller_email, password: seller_password } = req.body;
            let response = await sellers.findOne({ seller_email });
            if (!response) {
                return res.status(401).json({ message: 'Invalid Credentials' });
            }
            else {
                if (response.seller_password == seller_password) {
                    return res.status(200).json({ data: response });
                }
                else {
                    return res.status(401).json({ message: 'Incorrect Password' });
                }
            }
        } catch (error) {
            res.status(500).json({ message: 'Rentify server error' });
        }
    }

});
// Login Buyer or Seller



// Regsiter Buyer or Seller
router.post('/register', async (req, res) => {

    if (req.body.type === 'buyer') {
        try {
            const { fullName: buyer_fullname, email: buyer_email, password: buyer_password, phoneNumber: buyer_phoneNumber } = req.body;
            let newbuyer = await buyers.findOne({ buyer_email });
            if (newbuyer) {
                return res.status(409).json({ message: `Buyer acoount already exists with this Email-Address` });
            }
            let buyer_id = Math.floor(10000 + Math.random() * 90000);
            newbuyer = new buyers({ buyer_id, buyer_fullname, buyer_email, buyer_password, buyer_phoneNumber });
            await newbuyer.save();
            res.status(201).json({ message: 'Buyer account created successfully. Please Login!' });
        } catch (error) {
            res.status(500).json({ message: 'Rentify server error' });
        }
    }
    else {
        try {
            const { fullName: seller_fullname, email: seller_email, password: seller_password, phoneNumber: seller_phoneNumber, businessName: seller_businessName } = req.body;
            let newseller = await sellers.findOne({ seller_email });
            if (newseller) {
                return res.status(409).json({ message: `Seller acoount already exists with this Email-Address` });
            }
            let seller_id = Math.floor(10000 + Math.random() * 90000);
            newseller = new sellers({ seller_id, seller_fullname, seller_email, seller_password, seller_phoneNumber, seller_businessName });
            await newseller.save();
            res.status(201).json({ message: 'Seller account created successfully. Please Login!' });
        } catch (error) {
            res.status(500).json({ message: 'Rentify server error' });
        }

    }

});
// Regsiter Buyer or Seller


module.exports = router;