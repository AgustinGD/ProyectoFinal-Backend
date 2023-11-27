import express from 'express';
import routineDetailsController from '../../controllers/RoutineDetails';

const router = express.Router();

router.get('/', routineDetailsController.getAllRoutinesSimplified);
router.get('/:routineDetailsId', routineDetailsController.getRoutineDetails);

router.post('/', routineDetailsController.createRoutineDetails);

router.patch('/:routineDetailsId', routineDetailsController.updateRoutineDetails);

export = router;
