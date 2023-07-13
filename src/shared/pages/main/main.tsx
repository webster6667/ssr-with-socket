import React, { Component } from "react";
import { connect } from "react-redux";
import {fetchUsers} from "@actions"
import {Row, Container} from "@grid"
import {Card1 as User} from "@components/cards"

import {MainPagePropsI} from "./types"

class Main extends Component<MainPagePropsI> {

    static getInitialProps() {
        return fetchUsers();
    }

    componentDidMount() {
        if (!this.props.users.length) {
            this.props.dispatch(Main.getInitialProps());
        }
    }

    render() {
        const {users = []} = this.props

        return (<Container>
                <Row>
                    {users.map(({title, id}) => <User {...{title}} key={id} />)}
                </Row>
            </Container>)
    }
}

const mapStateToProps = ({usersReducer}) => ({
    ...usersReducer
});

export default connect(mapStateToProps)(Main);