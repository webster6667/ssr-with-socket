import React, {FC} from 'react'
import {blockClassesConcat, bemClassName} from 'bem-components-connector'
//@ts-ignore
import AvatarPath from "@icons/user_1.svg";
import "./styles.scss"

import {Card2I} from "./types"

export const Card2: FC<Card2I> = ({username, message, className = '', hidden = false, children,  ...props}) => {

    const block = bemClassName('card-2'),
          blockClasses = blockClassesConcat(block(), {hidden}, className)

    return (<div className={blockClasses} {...props}  >
            <img src={AvatarPath} alt="avatar" className={block('avatar')} />
            <div className={block('content')}>
                <h3>{username}</h3>
                {message && <p>{message}</p>}
            </div>
    </div>)
}