import {useState, useEffect} from 'react'
import {getCookie, setCookie} from "@modules/cookie"

export const useSocket = ({username, onConnected, onJoined, onDisconnected, onMessageWritten}) => {
    const [ws, setWs] = useState<undefined | WebSocket>()
    const [myWsId, setMyWsId] = useState(getCookie('wsId'))

    useEffect(() => {
        const createWs = () => {
            let reconnectInterval
            const socket = new WebSocket('ws://localhost:3005/chat')

            setWs(socket)

            socket.onopen = () => {
                const id = myWsId || String(Date.now())

                if (!myWsId) {
                    setMyWsId(id)
                    setCookie('wsId', id)
                }

                const connectData = {
                    id,
                    username,
                    event: 'connecting',
                }
                socket.send(JSON.stringify(connectData))
            }

            socket.onmessage = ({data}) => {
                const resData = JSON.parse(data)
                const {event, id, username, messagesList, connectedUserList = []} = resData

                switch (event) {
                    case 'connected':
                        clearInterval(reconnectInterval)
                        onConnected({connectedUserList, messagesList})
                        break;
                    case 'joined':
                        onJoined({id, username})
                        break;
                    case 'disconnected':
                        onDisconnected({disconnectedId: id})
                        break;
                    case 'messageWritten':
                        onMessageWritten({messagesList})
                        break;
                }


            }

            socket.onclose = (event) => {
                if (!event.wasClean) {

                    reconnectInterval = setTimeout(() => {
                        createWs()
                    }, 300)

                }
            }

        }
        createWs()
    }, [])

    const sendMessage = (data) => {
        ws.send(JSON.stringify({event: 'writeMessage', ...data}))
    }

    return {sendMessage, myWsId}
}