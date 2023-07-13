import React, {useState} from 'react'

import {Input, Button} from "@ui"
import {useSocket} from "@hooks"
import {bemClassName} from "bem-components-connector";
import {Card2} from "@components/cards"

import './styles.scss'

export const Chat = ({username}) => {
    const [connectedUsers, setConnectedUsers] = useState([]),
          [messageList, setMessageList] = useState([]),
          {sendMessage, myWsId} = useSocket({
                username,
                onConnected: ({connectedUserList, messagesList}) => {
                    setConnectedUsers(connectedUserList)
                    setMessageList(messagesList)
                },
                onJoined: ({id, username}) => {
                    setConnectedUsers((connectedUserList) => [...connectedUserList, {id, username}])
                },
                onDisconnected: ({disconnectedId}) => {
                    setConnectedUsers((connectedUserList) => connectedUserList.filter(({id}) => +id !== +disconnectedId))
                },
                onMessageWritten: ({messagesList}) => {
                    setMessageList(messagesList)
                }
          }),
          handleSubmit = (e) => {
        e.preventDefault()
        const {target: form} = e,
              message = form.elements.message.value

        if (message) {
            sendMessage({message, username})
            form.reset()
        }

    },
          block = bemClassName('chat')

    return <div className={block()} >

        <div className={block('sidebar')} >
            <h2>Пользователи</h2>

            {connectedUsers.map(({id, username}) => {
                return (<Card2 username={username} hidden={+id === +myWsId} />)
            })}
        </div>

        <div className={block('content')} >
            <h2>Сообщения</h2>

            {messageList.map(({username, message}) => {
                return (<Card2 {...{username, message}} />)
            })}
        </div>

        <form className={block('form')} onSubmit={handleSubmit} >
            <Input placeholder='Сообщение' name='message' />
            <Button type='submit'>Отправить</Button>
        </form>
    </div>
}