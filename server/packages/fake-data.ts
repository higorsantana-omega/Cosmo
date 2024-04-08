import { Namespace } from "./entities/Namespace"
import { Room } from "./entities/Room"

const wikiNamespace = new Namespace({
  id: 0,
  name: 'Wiki',
  endpoint: '/wiki',
  image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Old_version_of_the_Wikipedia_logo_used_until_2010_%28big%2C_English%29.png'
})

const youtubeNamespace = new Namespace({
  id: 1,
  name: 'Youtube',
  endpoint: '/youtube',
  image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Old_version_of_the_Wikipedia_logo_used_until_2010_%28big%2C_English%29.png'
})

wikiNamespace.addRoom(new Room({
  roomId: 0,
  title: 'New Articles',
  namespaceId: wikiNamespace.getId(),
  privateRoom: true
}))

wikiNamespace.addRoom(new Room({
  roomId: 1,
  title: 'Languages',
  namespaceId: wikiNamespace.getId()
}))

wikiNamespace.addRoom(new Room({
  roomId: 2,
  title: 'Coding',
  namespaceId: wikiNamespace.getId()
}))

youtubeNamespace.addRoom(new Room({
  roomId: 0,
  title: 'Channels',
  namespaceId: youtubeNamespace.getId()
}))

const namespaces = [wikiNamespace, youtubeNamespace]

export const FAKEDATA = {
  namespaces
}