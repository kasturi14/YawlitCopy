const functions = require("firebase-functions");
const Razorpay = require("razorpay");
const crypto = require("crypto");
var key_id = "*"; 
var key_secret = "*";
var request = require("request");
const cors = require('cors')({origin: true});
var instance = new Razorpay({
  key_id: key_id, //key_id given in the razorpay window
  key_secret: key_secret //key_secret given in the razorpay window
});


//sends a post request to the orders api razorpay with all the details of the orders
exports.createOrder = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    console.log(req.body.notes);
    var options = {
      amount: req.body.amount,
      currency: "INR",
      receipt: req.body.receipt,
      payment_capture: 1,
      notes: req.body.notes
    };
    instance.orders.create(options, (err, order) => {
      order ? res.status(200).send(order) : res.status(500).send(err);
    });
  });
});

//to capture the payment and check the validity of the razorpay signature
exports.capturePayments = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    const order = req.body;
  const text = order.razorpay_order_id + "|" + order.razorpay_payment_id;
  
  //checks the validity of the razorpay signature and sends payment successful if correct
  var signature = crypto
    .createHmac("sha256", key_secret)
    .update(text)
    .digest("hex");
  if (signature === order.razorpay_signature) {
    console.log("PAYMENT SUCCESSFULL");

    res.send({message:"Payment Successful"});
  } else {
    res.send({message:"Something went wrong"});
    res.end();
  }
});
});
