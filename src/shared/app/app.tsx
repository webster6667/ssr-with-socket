import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import {Layout} from "./components/layout"
import {routes} from "@routes"
import {useTypeSelector} from "@hooks"
import "./styles.scss"

export function App() {
	const { username } = useTypeSelector(state => state.profileReducer),
		  isAuth = Boolean(username)
	
	return (
		<Layout>
			<Switch>
				{routes.map(({isLockForGuest = false, isLockForAuth = false, redirectUrl, ...routeProps}, i) => {

					if (isLockForGuest && !isAuth) {
						return <Redirect key={i} to="/login" {...routeProps} />
					} else if(isLockForAuth && isAuth) {
						return <Redirect key={i} to={redirectUrl || '/'} {...routeProps} />
					} else {
						return <Route key={i} {...routeProps} />
					}

				})}
			</Switch>
		</Layout>
	)
}


