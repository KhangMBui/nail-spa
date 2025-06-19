// import React, { useState, useEffect } from "react";
// import axios from "axios";
import "./BookingPage.css";
import type { Worker, Service } from "../../types";
import { useState } from "react";
import Swal from "sweetalert2";
import "../../App.css";

const BookingPage = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  // const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  // const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorker, setSelectedWorker] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      name: "Manicure",
      description: "Basic manicure service",
      duration: 30,
      price: 20,
    },
    {
      id: "2",
      name: "Pedicure",
      description: "Basic pedicure service",
      duration: 45,
      price: 30,
    },
    {
      id: "3",
      name: "Manicure & Pedicure",
      description: "Combo service",
      duration: 75,
      price: 45,
    },
    {
      id: "4",
      name: "Nail Art",
      description: "Custom nail art designs",
      duration: 60,
      price: 50,
    },
  ]); // Static services for testing

  const [workers, setWorkers] = useState<Worker[]>([
    { id: "1", name: "Alice", role: "Nail Technician", isAvailable: true },
    { id: "2", name: "Bob", role: "Nail Technician", isAvailable: true },
    { id: "3", name: "Charlie", role: "Nail Artist", isAvailable: false },
  ]); // Static workers for testing

  const availableTimes = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ]; // Static times for testing

  // useEffect(() => {
  //   // Fetch services from backend
  //   axios.get("http://localhost:5000/api/services").then((res) => {
  //     setServices(res.data);
  //   });

  //   // Fetch workers from backend
  //   axios.get("http://localhost:5000/api/workers").then((res) => {
  //     setWorkers(res.data);
  //   });
  // }, []);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const payload = {
  //     customerName,
  //     serviceId: selectedService,
  //     preferredWorkerId: selectedWorker || null,
  //     appointmentDate: date,
  //   };

  //   try {
  //     await axios.post("http://localhost:5000/api/appointments", payload);
  //     alert("Appointment booked successfully!");
  //     // Reset form
  //     setCustomerName("");
  //     setSelectedService("");
  //     setSelectedWorker("");
  //     setDate("");
  //   } catch (err) {
  //     alert("Something went wrong while booking.");
  //     console.error(err);
  //   }
  // };

  // Handle multiple service selection
  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedServices(options);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(customerPhone)) {
      Swal.fire({
        title: "Invalid Phone Number",
        text: "Please enter a valid 10-digit phone number.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    // Convert time to 24-hour format
    const [timeString, period] = time.split(" ");
    let [hours, minutes] = timeString.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    // Combine date and time into a valid Date object
    const selectedDateTime = new Date(date);
    selectedDateTime.setHours(hours, minutes, 0, 0);

    const now = new Date();
    if (selectedDateTime < now) {
      Swal.fire({
        title: "Invalid Date or Time",
        text: "You cannot book an appointment in the past.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    // Calculate total price
    const selectedServiceDetails = services.filter((service) =>
      selectedServices.includes(service.id)
    );
    const totalPrice = selectedServiceDetails.reduce(
      (sum, service) => sum + service.price,
      0
    );

    // Get worker name
    const workerName =
      workers.find((worker) => worker.id === selectedWorker)?.name ||
      "No Preference";

    // Show SweetAlert2 confirmation
    const result = await Swal.fire({
      title: "Confirm Your Booking",
      html: `
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Phone:</strong> ${customerPhone}</p>
        <p><strong>Services:</strong> ${selectedServiceDetails
          .map((service) => service.name)
          .join(", ")}</p>
        <p><strong>Worker:</strong> ${workerName}</p>
        <p><strong>Total Price:</strong> $${totalPrice}</p>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, Book Now!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      // Show success alert
      Swal.fire({
        title: "Booking Confirmed!",
        text: "Your appointment has been successfully booked.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset form (optional)
      setCustomerName("");
      setCustomerPhone("");
      setSelectedServices([]);
      setSelectedWorker("");
      setDate("");
      setTime("");
    }
  };

  return (
    <div className="booking-page">
      <div className="spa-name">
        <h1>Nail Spa Bliss</h1>
      </div>
      <form onSubmit={handleSubmit} className="booking-form">
        <h2>Book an Appointment</h2>
        <div className="field-container">
          <label>Your Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="field-container">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            required
            placeholder="Enter your phone number"
            className="phone-input"
          />
        </div>

        <div className="field-container">
          <label>Select Services:</label>
          <select
            multiple
            value={selectedServices}
            onChange={handleServiceChange}
            required
            className="fancy-multiselect"
          >
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} - ${service.price}
              </option>
            ))}
          </select>
        </div>
        <div className="field-container">
          <label>Preferred Worker (optional):</label>
          <select
            value={selectedWorker}
            onChange={(e) => setSelectedWorker(e.target.value)}
          >
            <option value="">-- No Preference --</option>
            {workers.map((worker) => (
              <option key={worker.id} value={worker.id}>
                {worker.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field-container">
          <label>Appointment Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="field-container">
          <label>Appointment Time:</label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          >
            <option value="">-- Select Time --</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingPage;
