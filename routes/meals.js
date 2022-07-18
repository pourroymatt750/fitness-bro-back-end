import { Router } from 'express'
import * as mealsCtrl from '../controllers/meals.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/',mealsCtrl.mealSearch)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
// router.get('/', checkAuth, mealsCtrl.index)
router.post('/', checkAuth, mealsCtrl.addToCollection)
export { router }