import React from 'react'
import {Header, Footer} from "./components"
import './styles.scss'

export const Layout = ({children}) => {

    return (<>
        <Header/>
        <div className='content-wrapper'>
            {children}
        </div>
        <Footer/>
    </>)
}