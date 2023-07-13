import React from 'react'
import "./styles"

export const Row = ({children, ...props}) => {
    return <div className='row' {...props}>
        {children}
    </div>
}