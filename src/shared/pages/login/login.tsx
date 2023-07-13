import React, { Component } from "react";
import { connect } from "react-redux";
import {Button, Input} from "@ui"
import {FormWrapper} from '@components/form-wrapper'
import {profileActions} from "@actions"

import "./styles.scss"

import {MainPagePropsI} from "./types"

class Login extends Component<MainPagePropsI> {

    handleSubmit = (e) => {
        e.preventDefault()
        const {target: form} = e,
            username = form.elements.username.value

        if (username) {
            this.props.dispatch(profileActions.setAuthData({username}))
        }
    }

    render() {

        return (<FormWrapper>
                <form className='login-form' onSubmit={this.handleSubmit} >
                    <Input placeholder='Имя пользователя' name='username' />
                    <Button>Отправить</Button>
                </form>
            </FormWrapper>)
    }
}

export default connect()(Login);