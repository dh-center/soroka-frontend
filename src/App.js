import './App.css'
import Login from './views/auth/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './views/dashboard/Dashboard'
import Registration from './views/auth/Registration'
import CreateNewCard from './views/dashboard/CreateNewCard'
import CardPage from './views/dashboard/CardPage'
import Header from './components/common/Header'
import { CARDS_ROUTE, getCreateCardRoute, getIdDynamicRoute, LOGIN_ROUTE, REGISTRATION_ROUTE } from './api/routes'
import { IntlProvider } from 'react-intl'
import { LOCALES } from './lang/locales'
import { message } from './lang/message'
import BaseStore from "./stores/baseStore";
import { observer } from 'mobx-react'
import { useEffect } from "react";

const baseStore = new BaseStore()

const App=observer (() => {
    const locale = navigator.language;
    // if (locale === "ru") {
    //     baseStore.setUiLang(LOCALES.RUSSIAN)
    // } else {
    //     if (locale === "ru") {
    //         baseStore.setUiLang(LOCALES.RUSSIAN)
    //     }
    // }
    useEffect(() => {
        console.log('useEffect baseStore.uiLang = ', baseStore.uiLang);
    })

    return (
        <BrowserRouter>
            <IntlProvider defaultLocale={LOCALES.RUSSIAN} locale={baseStore.uiLang} messages={message[baseStore.uiLang]}>
                <div className="App">
                    <Header baseStore={baseStore}/>
                    <Routes>
                        <Route path={LOGIN_ROUTE} element={<Login />} />
                        <Route path={REGISTRATION_ROUTE} element={<Registration />} />
                        <Route path={CARDS_ROUTE} element={<Dashboard />} />
                        <Route path={getIdDynamicRoute()} element={<CardPage />} />
                        <Route path={getCreateCardRoute()} element={<CreateNewCard />} />
                        <Route path="*" element={<div>404</div>} />
                    </Routes>
                </div>
            </IntlProvider>
        </BrowserRouter>
    )
});

export default App
