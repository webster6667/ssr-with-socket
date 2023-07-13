let disconnectFnList = {}

export class Socket {
    socket: WebSocket
    clientList: any[]
    connectedUserList: any[]

    constructor({socket, clientList, onConnecting, onMessage}) {
        this.socket = socket
        this.clientList = clientList
        this.connectedUserList = []

        this.socket.onmessage = ({data}) => {
            const {event, ...reqData} = JSON.parse(data)

            switch (event) {
                case 'connecting':
                    const disconnectTimeoutFn = disconnectFnList[`disconnect${reqData.id}`]
                    
                    if (disconnectTimeoutFn) {
                        clearTimeout(disconnectTimeoutFn)
                    }

                    this.connectionHandler(reqData)
                    this.getConnectedUserList()
                    if (onConnecting) onConnecting.call(this, {...reqData, wasPageReload: Boolean(disconnectTimeoutFn)})
                break
                case 'writeMessage':
                    if (onMessage) onMessage.call(this, reqData)
                break
            }

        }

        this.socket.onclose = ({target}) => {
            const {id, username} = target

            disconnectFnList[`disconnect${id}`] = setTimeout(() => {
                this.sendDisconnected({id, username})
                delete disconnectFnList[`disconnect${id}`]
            },1000);

        }
        
    }

    connectionHandler({id, username}) {
        this.socket.id = id
        this.socket.username = username
    }

    getConnectedUserList() {
        const connectedUserList = [],
              connectedIds = []

        this.clientList.forEach(({id, username}) => {
            if (id && !connectedIds.includes(id)) {
                connectedIds.push(id)
                connectedUserList.push({id, username})
            }
        })

        this.connectedUserList = connectedUserList
    }

    broadcastSend({event, withMe = false, ...resData}) {
        this.clientList.forEach((client) => {
            const sendData = () => client.send(JSON.stringify({
                event,
                ...resData
            }))

            if (withMe) {
                sendData()
            } else if (client.id !== this.socket.id) {
                sendData()
            }

        })
    }

    broadcastConnectedSend(resData) {
        this.broadcastSend({event: 'joined', ...resData})
    }

    sendSuccessConnected(resData) {
        this.socket.send(JSON.stringify({
            event: 'connected',
            ...resData
        }))
    }

    sendDisconnected(resData) {
        this.broadcastSend({event: 'disconnected', ...resData})
    }


}