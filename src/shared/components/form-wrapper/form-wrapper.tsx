import React from 'react'
import './styles.scss'

export const FormWrapper = ({children, ...props}) => {
    return (<div className='form-wrapper'>
        {children}
    </div>)
}