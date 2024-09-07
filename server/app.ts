import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serveStatic } from 'hono/bun'
import { expensesRoute } from './routes/expenses'

const app = new Hono()

app.use(logger())

app.route('api/expenses', expensesRoute)

app.get('*', serveStatic({ root: './ui/dist' }))
app.get('*', serveStatic({ path: './ui/dist/index.html' }))

export default app