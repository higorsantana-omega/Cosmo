import { Server, Socket } from 'socket.io'
import { Server as httpServer } from 'http'
import { ChannelsEvent, JoinRoomData } from '../../packages/channels'
import { FAKEDATA } from '../../packages/fake-data'
import { Message } from '../../packages/entities/Message'
import Logger from '../logger/Logger'

export class SocketIOHandler {
  private server!: Server

  constructor (private logger: Logger) {}

  setServer (httpServer: httpServer): void {
    this.server = new Server(httpServer, {
      cors: {
        origin: '*'
      }
    })
    this.logger.info('Socket.io is running')
  }

  listen () {
    this.server.on('connection', socket => {
      socket.emit(ChannelsEvent.CLIENT_CONNECT)

      socket.emit(ChannelsEvent.NAMESPACE_LIST, FAKEDATA.namespaces)
    })

    FAKEDATA.namespaces.forEach(namespace => {
      this.server.of(namespace.getEndpoint()).on('connection', socket => {
        this.logger.info(`${socket.id} has connected to ${namespace.getEndpoint()}`)

        socket.on(ChannelsEvent.JOIN_ROOM, async (response) => {
          const data = response as JoinRoomData
  
          const currentNS = FAKEDATA.namespaces[data.namespaceId]
          const currentRoom = currentNS.getRoom(data.roomName)

          let firstRoom = 0
          const socketRoomsConnected = socket.rooms
          socketRoomsConnected.forEach(room => {
            if (firstRoom !== 0) {
              socket.leave(room)
            }

            firstRoom++
          }) 

          socket.join(data.roomName)

          // Count sockets in room
          // ACKCallback
        })

        socket.on(ChannelsEvent.NEW_MESSAGE_TO_ROOM, (response) => {
          const data = response as Message

          // Broadcast all to current room
          const socketRoomsConnected = socket.rooms
          const currentRoom = [...socketRoomsConnected][1]

          this.logger.info(`Sending message from ${data.userName} and the content: ${data.newMessage}`)

          this.server.of(namespace.getEndpoint()).in(currentRoom).emit(ChannelsEvent.MESSAGE_TO_ROOM, data)

          const currentNS = FAKEDATA.namespaces[data.selectedNsId]
          const namespaceRoom = currentNS.getRoom(currentRoom)

          namespaceRoom?.addMessage(data)
        })
      })
    })
  }
}