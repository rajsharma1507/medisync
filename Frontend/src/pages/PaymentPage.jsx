import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "react-qr-code"; // QR Code component for UPI
import './PaymentPage.css';
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const { appointment } = location.state || {}; // Access appointment data
  
  // Timer states
  const [timeLeft, setTimeLeft] = useState(4 * 60); // 4 minutes in seconds
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });
  const [upiId, setUpiId] = useState("");
  
  // Handle timer countdown
  useEffect(() => {
    if (timeLeft === 0) return; // Stop when timer hits 0
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpiChange = (e) => {
    setUpiId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const paymentData =
        paymentMethod === "card"
          ? { ...cardDetails, paymentMethod: "Card" }
          : { upiId, paymentMethod: "UPI" };
      const response = await axios.post("/api/payments", paymentData); // Backend API endpoint
      alert(response.data.message || "Payment processed successfully!");
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  // Display time in MM:SS format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Format Card Number
  const formatCardNumber = (number) => {
    return number.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  // Restrict Expiry Date Input to MM/YY Format and Limit Month to 01-12
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4); // Limit to 4 digits
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`; // Insert `/` after month
    }
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      expiryDate: value,
    }));
  };

  // Restrict CVV to 3 Digits
  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3); // Limit to 3 digits
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      cvv: value,
    }));
  };

  return (
    <div className="payment-container">
      <div className="left-side">
        {/* GIF */}
        <img src="/assets/payment.gif" alt="Payment Animation" className="payment-gif" />

      </div>

      <div className="right-side">
        <h2 className="title">Complete Your Payment</h2>

        {/* Appointment Info */}
        {appointment && (
          <div className="appointment-details">
            <h3>Payment for {appointment.docData.name}</h3>
            <p>{appointment.docData.speciality} Appointment</p>
            <p>{appointment.date} | {appointment.time}</p>
          </div>
        )}

        {/* Timer */}
        <div className="timer">
          {timeLeft > 0 ? (
            <p>Time Remaining: {formatTime(timeLeft)}</p>
          ) : (
            <p className="time-up-message">Time&apos;s up! Please try again.</p>
          )}
        </div>

        {/* Payment Method Selection */}
        <div className="payment-method-buttons">
          <button className={`method-button ${paymentMethod === "card" ? "active" : ""}`} onClick={() => handlePaymentMethodChange("card")}>
            Pay with Card
          </button>
          <button className={`method-button ${paymentMethod === "upi" ? "active" : ""}`} onClick={() => handlePaymentMethodChange("upi")}>
            Pay with UPI
          </button>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="amount">Amount: ₹500</div>

          {/* Card Payment Form */}
          {paymentMethod === "card" && (
            <div className="card-form">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formatCardNumber(cardDetails.cardNumber)}
                onChange={handleInputChange}
                maxLength={19} // Maximum length for card number with spaces
                required
              />
              <label>Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={cardDetails.expiryDate}
                onChange={handleExpiryDateChange}
                maxLength={5} // MM/YY format
                required
              />
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={handleCvvChange}
                maxLength={3}
                required
              />
              <label>Cardholder&apos;s Name</label>
              <input
                type="text"
                name="cardName"
                placeholder="Cardholder's Name"
                value={cardDetails.cardName}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          {/* UPI Payment Form */}
          {paymentMethod === "upi" && (
            <div className="upi-form">
              <label>Enter UPI ID</label>
              <input
                type="text"
                name="upiId"
                value={upiId}
                onChange={handleUpiChange}
                placeholder="your-upi-id@upi"
                required
              />
              <div className="upi-qr-code">
                <QRCode value={upiId} size={150} />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button type="submit">Proceed with Payment</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
