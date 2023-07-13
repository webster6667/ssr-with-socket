import React from 'react'
import {bemClassName} from "bem-components-connector";
import AvatarPlaceholderPath from "@icons/user_2.svg"

import './styles.scss'

export const ProfileData = ({username}) => {
    const block = bemClassName('profile-data')

    return <div className={block()} >
        <div className={block('avatar-wrapper')}>
            <img src={AvatarPlaceholderPath} alt="avatar"/>
        </div>
        <h2 className={block('name')}>{username}</h2>
    </div>
}