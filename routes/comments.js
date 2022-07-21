import { Router } from 'express'
import * as commentsCtrl from '../controllers/comments.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/:id', checkAuth, commentsCtrl.show)
router.post('/:id', checkAuth, commentsCtrl.create)
router.delete('/deleted/:profileId/:id', checkAuth, commentsCtrl.deleteComment)
router.put('/:id',checkAuth,commentsCtrl.update)

export { router }