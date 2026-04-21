const asyncHandler = require('express-async-handler');
const Booking = require('../models/bookingModel');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.findAll();
  res.json(bookings);
});

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = asyncHandler(async (req, res) => {
  const savedBooking = await Booking.create(req.body);
  res.status(201).json(savedBooking);
});

// @desc    Update booking status
// @route   PATCH /api/bookings/:id
// @access  Private/Admin
const updateBookingStatus = asyncHandler(async (req, res) => {
  const updatedBooking = await Booking.updateStatus(req.params.id, req.body.status);
  if (updatedBooking) {
    res.json(updatedBooking);
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
});

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
const deleteBooking = asyncHandler(async (req, res) => {
  const ok = await Booking.deleteById(req.params.id);
  if (ok) {
    res.json({ message: 'Booking removed' });
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
});

module.exports = {
  getBookings,
  createBooking,
  updateBookingStatus,
  deleteBooking
};
