import React from "react";
import { hydrate } from "react-dom";
import {App} from "@app"
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {createStore} from "@store"

const store = createStore(window.__initialData__)
delete window.__initialData__

hydrate(<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>, document.getElementById('root'))