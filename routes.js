const Router = require('nextjs-dynamic-routes')
const router = new Router()

router.add({ name: 'q', pattern: '/q/:token/:step' })

module.exports = router