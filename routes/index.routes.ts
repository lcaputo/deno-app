import { authourized } from "../middlewares/isAuthorized.ts";
import { Router } from '../deps.ts'
import * as controller from '../controllers/index.controller.ts'

const router = new Router()

router.get('/', authourized, (ctx) => {
    ctx.response.body = 'hello world'
})
router.get('/api', controller.getAll)
// router.get('/:id', controller.logId)
router.get('/jwt', controller.jwt)

export default router