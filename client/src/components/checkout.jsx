// import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// // Load your Stripe publishable key
// const stripePromise = loadStripe("your-publishable-key-here");

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [succeeded, setSucceeded] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: elements.getElement(CardElement),
//     });

//     if (error) {
//       setError(error.message);
//       setLoading(false);
//     } else {
//       // Use paymentMethod.id to create a payment intent on your server
//       const response = await fetch("/create-payment-intent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           paymentMethodId: paymentMethod.id,
//           amount: 1000,
//         }), // amount in cents
//       });

//       const paymentIntent = await response.json();

//       if (paymentIntent.error) {
//         setError(paymentIntent.error.message);
//         setLoading(false);
//       } else {
//         setSucceeded(true);
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-300"
//     >
//       <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Card Details
//         </label>
//         <div className="p-3 border border-gray-300 rounded-lg">
//           <CardElement
//             options={{
//               style: {
//                 base: {
//                   fontSize: "16px",
//                   color: "#32325d",
//                   "::placeholder": {
//                     color: "#a0aec0",
//                   },
//                 },
//                 invalid: {
//                   color: "#fa755a",
//                   iconColor: "#fa755a",
//                 },
//               },
//             }}
//           />
//         </div>
//       </div>
//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
//       >
//         {loading ? "Processing..." : "Pay"}
//       </button>
//       {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
//       {succeeded && (
//         <div className="text-green-500 mt-4 text-center">
//           Payment succeeded!
//         </div>
//       )}
//     </form>
//   );
// };

// const PaymentComponent = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm />
//     </Elements>
//   );
// };

// export default PaymentComponent;
