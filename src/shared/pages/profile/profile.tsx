import React, { Component } from "react";
import {connect} from "react-redux";
import {Container} from '@grid'

import {ProfileData, Chat} from './components'


import {ProfileI} from './types'


class Profile extends Component<ProfileI> {

    render() {
        const {username} = this.props

        return <Container>
            <ProfileData username={username} />
            <Chat username={username} />
        </Container>;
    }
}

const mapStateToProps = ({profileReducer}) => ({
    ...profileReducer
});

export default connect(mapStateToProps)(Profile);