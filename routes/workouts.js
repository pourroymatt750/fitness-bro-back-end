import { Router } from 'express'
import * as workoutsCtrl from '../controllers/workouts.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/',workoutsCtrl.workoutSearch)
router.get('/search/:exerciseName', workoutsCtrl.show)
/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, workoutsCtrl.addToCollection)


export { router }