import React, {FC} from 'react'

import './styles.scss'

import {InputI} from './types'


export const Input: FC<InputI> = (props) => {
    return (<input className='input' {...props} />)
}