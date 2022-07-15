import { Router } from 'express'
import * as workoutsCtrl from '../controllers/workouts.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/

router.get('/',workoutsCtrl.workoutSearch)
/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
// router.get('/', checkAuth, workoutsCtrl.index)

export { router }