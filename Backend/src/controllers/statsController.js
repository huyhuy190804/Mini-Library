import * as statsService from '../services/statsService.js';

// [GET] Get Overview
export const getOverview = async (req, res) => {
  try {
    const stats = await statsService.getOverview();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [GET] Get Top Books
export const getTopBooks = async (req, res) => {
  try {
    const stats = await statsService.getTopBooks();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [GET] Get Borrow Status
export const getBorrowStatus = async (req, res) => {
  try {
    const stats = await statsService.getBorrowStatus();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

