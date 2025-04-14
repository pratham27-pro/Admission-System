import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_ID_KEY,
  key_secret: RAZORPAY_SECRET_KEY
});

export const createOrder = async (req, res) => {
  try {
    const amount = req.body.amount * 100;
    const options = {
      amount: amount,
      currency: 'INR',
      receipt: 'razorUser@gmail.com'
    };

    razorpayInstance.orders.create(options, (err, order) => {
      if (!err) {
        res.status(200).json({
          success: true,
          msg: 'Order Created',
          order_id: order.id,
          amount: amount,
          key_id: RAZORPAY_ID_KEY,
          product_name: req.body.name,
          description: req.body.description,
          contact: "8567345632",
          name: "Sandeep Sharma",
          email: "sandeep@gmail.com"
        });
      } else {
        res.status(400).json({ success: false, msg: 'Something went wrong!' });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};