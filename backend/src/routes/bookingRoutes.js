const express = require('express');
const router = express.Router();
const { requireDb } = require('../middleware/requireDb');

router.use(requireDb);

const {
  getBookings,
  createBooking,
  updateBookingStatus,
  deleteBooking
} = require('../controllers/bookingController');

router.route('/')
  .get(getBookings)
  .post(createBooking);

router.route('/:id')
  .patch(updateBookingStatus)
  .delete(deleteBooking);

module.exports = router;
