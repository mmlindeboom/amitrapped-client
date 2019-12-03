const Router = require('nextjs-dynamic-routes')
const router = new Router()

router.add({ name: 'q', pattern: '/q/:token/:step' })
router.add({ name: 'admin/index', pattern: '/admin/:tab' })
module.exports = router