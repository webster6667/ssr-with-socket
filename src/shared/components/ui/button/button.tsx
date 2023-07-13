import React, {FC} from 'react'
import {ButtonI} from './types'

import './styles.scss'


export const Button: FC<ButtonI> = ({children, ...props}) => {
    return (<button className='button'  {...props} >{children}</button>)
}