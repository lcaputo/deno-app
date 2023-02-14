import { db } from './config/dbconnection.ts';
import { Application } from "./deps.ts"
import router from './routes/index.routes.ts'
import logger from "https://deno.land/x/oak_logger/mod.ts";

const app = new Application()

app.use(router.routes());

await db.sync()

await db.close()

app.use(logger.logger)
app.use(logger.responseTime)


await app.listen({port: 8000})
