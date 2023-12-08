// routes/parkingRoutes.js
import express from 'express';
import {
  createParking,
  getAllParking,
  getParkingById,
  updateParking,
  deleteParking,
  assignParking,
} from '../controllers/parkingCtrl.js';

const router = express.Router();

router.post('/', createParking);
router.get('/', getAllParking);
router.get('/:parkingId', getParkingById);
router.put('/:parkingId', updateParking);
router.delete('/:parkingId', deleteParking);

// assain aminites to property

router.post('/assignapartment/:parkingId', assignParking);


export default router;
