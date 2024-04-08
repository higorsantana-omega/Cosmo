import { createServer } from "http"
import { createApp } from "./app"
import { SocketIOHandler } from "./ws/SocketIOHandler"
import Logger from "./logger/Logger"

function main () {
  const logger = new Logger()
  const app = createApp()
  const socket = new SocketIOHandler(logger)
  const httpServer = createServer(app)

  socket.setServer(httpServer)

  const port = process.env.PORT || 5000
  httpServer
    .listen(port)
    .on('listening', () => {
      logger.info(`Node app is running on ${port}`)
      socket.listen()
    })
}

main()