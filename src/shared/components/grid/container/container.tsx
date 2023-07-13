import React, {FC} from 'react'
import {blockClassesConcat, bemClassName} from 'bem-components-connector'
import {ContainerI} from './types'

import './styles.scss'

export const Container:FC<ContainerI> = ({children, className = '', justifyContent, alignItems , ...props}) => {
    const block = bemClassName('container'),
          blockClasses = blockClassesConcat(block(), {justifyContent, alignItems}, className)


    return <div className={blockClasses} {...props}>
        {children}
    </div>
}