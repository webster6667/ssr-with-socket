import React from 'react'
import {bemClassName} from 'bem-components-connector'
import { Link } from 'react-router-dom'
import {Container} from "@grid"
import ProfileIconPath from "@icons/user_2.svg";
import LogoPath from "@icons/logo.svg";
import './styles.scss'

export const Header = () => {
    const block = bemClassName('header')

    return (<div className={block()} >
        <Container justifyContent='space-between' alignItems='center' >
            <Link to='/' >
                <img src={LogoPath} className={block('icon')} alt="logo"/>
            </Link>
            <Link to='/profile' >
                <img src={ProfileIconPath} className={block('icon')} alt="profile-icon"/>
            </Link>
        </Container>
    </div>)
}