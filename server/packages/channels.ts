export const ChannelsEvent = {
  CLIENT_CONNECT: 'clientConnect',

  NAMESPACE_LIST: 'namespaces-list',

  JOIN_ROOM: 'joinRoom',
  NEW_MESSAGE_TO_ROOM: 'newMessageToRoom',
  MESSAGE_TO_ROOM: 'messageToRoom'
}

export interface JoinRoomData {
  namespaceId: number
  roomName: string
}