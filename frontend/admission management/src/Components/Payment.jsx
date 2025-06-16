import { useState } from "react";
import axios from "axios";

const Payment = ({
  amount = 5000,
  title = "Application Fee",
  description = "Admission Application Fee",
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const initiatePayment = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post("/api/payment", {
        name: title,
        amount: amount,
        description: description,
      });

      if (response.data.success) {
        const options = {
          key: response.data.key_id,
          amount: response.data.amount,
          currency: "INR",
          name: response.data.product_name,
          description: response.data.description,
          image: "https://dummyimage.com/600x400/000/fff",
          order_id: response.data.order_id,
          handler: function () {
            alert("Payment Successful!");
            // Redirect here
          },
          prefill: {
            contact: response.data.contact,
            name: response.data.name,
            email: response.data.email,
          },
          notes: {
            description: response.data.description,
          },
          theme: {
            color: "#fd8634",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.on("payment.failed", function () {
          alert("Payment Failed. Please try again.");
        });
        razorpay.open();
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(
        "Something went wrong with the payment process. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden py-16 sm:py-24 mt-15">
      <div className="bg-gray-50 px-6 py-8 md:px-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          {title}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Complete your application process
        </p>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">Application Fee:</span>
            <span className="font-semibold">
              ₹{amount.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="h-px bg-gray-200 my-4"></div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">Total Amount:</span>
            <span className="text-xl font-bold">
              ₹{amount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <button
          onClick={initiatePayment}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-[#fd863459] hover:bg-[#fd8634] text-black font-medium rounded-md transition duration-200 flex justify-center items-center"
        >
          {isLoading ? <span>Processing...</span> : <span>Pay Now</span>}
        </button>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Secure payment powered by Razorpay</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
