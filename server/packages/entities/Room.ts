import { Message } from "./Message"

export interface RoomParams {
  roomId: number
  title: string
  namespaceId: number
  privateRoom?: boolean
}

export class Room {
  private roomId: number
  private title: string
  private namespaceId: number
  private privateRoom: boolean
  private history: Message[]

  constructor ({
    roomId, title, namespaceId, privateRoom = false
  }: RoomParams) {
    this.roomId = roomId
    this.title = title
    this.namespaceId = namespaceId
    this.privateRoom = privateRoom ?? false
    this.history = []
  }

  getRoomName () {
    return this.title
  }

  addMessage (message: Message) {
    this.history.push(message)
  }

  clearHistory () {
    this.history = []
  }
}


