import app from "./app"
import { config } from "./utils/env"

const start = async () => {
  app.listen(config.port, () => {
    console.log(`Server is listening on port: ${config.port}`)
  })
}

start()
