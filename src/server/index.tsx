import express from "express";
import expressWs from 'express-ws';
import cors from "cors";
import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter, matchPath } from "react-router-dom";
import serialize from "serialize-javascript";
import {routes} from "@routes";
import {App} from "@app";
import {createStore} from "@store";
import {Socket} from '@modules/socket'
import {usersInitialState, profileInitialState} from "@reducers"
import {getCookie} from "@modules/cookie";

const app = express(),
      WSServer = expressWs(app),
      aWSS = WSServer.getWss()

app.use(cors());
app.use(express.static("public"));

const messagesList = []

app.ws('/chat', (ws, res) => {
  ws.send('success connected')

  const socket = new Socket({
    socket: ws,
    clientList: aWSS.clients,
    onConnecting({id, username, wasPageReload}) {
      this.sendSuccessConnected({connectedUserList: this.connectedUserList, messagesList})

      if (!wasPageReload) {
        this.broadcastConnectedSend({id, username})
      }

    },
    onMessage({username, message}) {
      messagesList.push({username, message})

      this.broadcastSend({event: 'messageWritten', withMe: true, messagesList})
    }
  })
})

app.get("*", (req, res, next) => {

  const store = createStore({
          usersReducer: usersInitialState,
          profileReducer: {...profileInitialState, username: getCookie('username', req.headers.cookie)}
        }),
        dispatch = store.dispatch,
        activeRoute = routes.find((route) => matchPath(req.url, route)),
        // @ts-ignore
        promise = activeRoute?.component?.getInitialProps ? dispatch(activeRoute.component?.getInitialProps()) : Promise.resolve()



    promise.then(() => {
      const context = {};
      const markup = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context} >
            <App />
          </StaticRouter>
        </Provider>
      );
      const initialData = store.getState();
      
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>SSR</title>
            <link rel="shortcut icon" href="/favicon.ico">
            <link rel="stylesheet" href="/styles.css" >
            <script src="/client.js" defer></script>
            <script>
                window.__initialData__ = ${serialize(initialData)}
            </script>
          </head>
          <body>
            <div id="root" >${markup}</div>
          </body>
        </html>
      `);
    })
    .catch(next);
});

const SERVER_PORT = process.env.PORT || 3005


app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on: ${SERVER_PORT}`);
});
