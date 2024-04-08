import { Room } from "./Room"

export interface NamespaceParams {
  id: number
  name: string
  image: string
  endpoint: string
  rooms?: Room[]
}

export class Namespace {
  private id: number
  private name: string
  private image: string
  private endpoint: string
  private rooms: Room[]

  constructor ({
    id, name, image, endpoint, rooms
  }: NamespaceParams) {
    this.id = id
    this.name = name
    this.image = image
    this.endpoint = endpoint
    this.rooms = rooms ?? []
  }

  getId () {
    return this.id
  }

  getEndpoint () {
    return this.endpoint
  }

  getName () {
    return this.name
  }

  getRoom (roomName: string) {
    return this.rooms.find(room => room.getRoomName() === roomName)
  }

  addRoom (room: Room) {
    this.rooms.push(room)
  }
}
