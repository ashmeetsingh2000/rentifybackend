const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const sellers = require('../models/registerseller_model');
const buyers = require('../models/registerbuyer_model');
const properties = require('../models/property_model');

// Create a transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});


// send Email to Bouyer
router.post('/email', async (req, res) => {

    const { sellerId, propertyID, buyerEmail } = req.body;

    const sellerData = await sellers.findOne({ seller_id: sellerId });
    const buyerData = await buyers.findOne({ buyer_email: buyerEmail });
    const propertyData = await properties.findOne({ _id: propertyID });

    const buyer_mailOptions = {
        from: 'rentalapp18@gmail.com',
        to: buyerEmail,
        subject: 'RentifyApp enquiry response',
        html: `
<p>Enquire About Property ${propertyData.product_title}</p><br>
<b>Property Detail</b>
<p> <b>Title</b>: ${propertyData.product_title}</p>
<p> <b>Location</b>: ${propertyData.product_location}</p>
<p> <b>Rent Per Month</b>: $${propertyData.product_price}/month</p>
<p> <b>Number Of Bedrooms</b>: ${propertyData.product_bedrooms}</p>
<p> <b>Number Of bathrooms</b>: ${propertyData.product_bathrooms}</p>
<p> <b>Description</b>: ${propertyData.product_description}</p><br>
<b>Seller Detail:-</b>
<p> <b>Full Name</b>: ${sellerData.seller_fullname}</p>
<p> <b>Email Address</b>: ${sellerData.seller_email}</p>
<p> <b>Contact No.</b>: ${sellerData.seller_phoneNumber}</p>
<p> <b>Business Name</b>: ${sellerData.seller_businessName}</p>
<br>
<p>Regards,</p>
<p>Rentify Team</p>
        `
    };

    const seller_mailOptions = {
        from: 'rentalapp18@gmail.com',
        to: sellerData.seller_email,
        subject: `Buyer showed interest in ${propertyData.product_title} Property`,
        html: `
<p><b>Buyer Detail:-</b></p>
<p> <b>Full Name</b>: ${buyerData.buyer_fullname}</p>
<p> <b>Email Address</b>: ${buyerData.buyer_email}</p>
<p> <b>Contact No.</b>: ${buyerData.buyer_phoneNumber}</p>
<br>
<p>Regards,</p>
<p>Rentify Team</p>
        `
    };

    // Send mail to buyer
    transporter.sendMail(seller_mailOptions);
    // Send mail to buyer

    // Send mail to Seller
    transporter.sendMail(buyer_mailOptions, (error, info) => {
        if (error) {
            return res.status(400).json({ message: 'Unable to sent email' });
        }
        res.status(200).json({ message: 'Sent Successfully', data: sellerData });
    });
    // Send mail to Seller

})
// send Email to Bouyer

module.exports = router;