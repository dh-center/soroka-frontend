import React, { useEffect, useMemo } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Header from './components/common/Header'
import { LOGIN_ROUTE } from './utils/urls'
import { IntlProvider } from 'react-intl'
import { LOCALES } from './lang/locales'
import { message } from './lang/message'
import BaseStore from './stores/baseStore'
import { observer } from 'mobx-react'
import AuthStore from './stores/authStore'

import { mainContext } from './context/mainContext'
import PropertiesStore from './stores/propertiesStore'
import routes from './utils/routes'

const baseStore = new BaseStore()
export const authStore = new AuthStore()
export const propertiesStore = new PropertiesStore()

const App = observer(() => {
    const { Provider } = mainContext
    useEffect(() => {
        async function checkCurrentUserTokens() {
            if (!authStore.currentUser && authStore.accessToken && authStore.refreshToken) {
                await authStore.getUserProfile()
                await propertiesStore.getProperties()
            }
        }

        baseStore.getOrganizations()
        checkCurrentUserTokens()
    }, [authStore.accessToken, authStore.refreshToken, authStore.currentUser])

    const preparedRoutes = useMemo(
        () =>
            routes.map(({ path, onlyWithToken = false, onlyWithoutToken = false, renderElement }) => {
                const accessToken = authStore.accessToken
                const refreshToken = authStore.refreshToken
                const tokenIsThere = accessToken && refreshToken

                let element
                if (!tokenIsThere && onlyWithToken) {
                    element = <Navigate to={LOGIN_ROUTE} /> // <>Page is protected by auth</>
                } else if (tokenIsThere && onlyWithoutToken) {
                    element = <Navigate to={'/'} /> // <>Not supposed to be here, page is only for logout users</>
                } else {
                    element = renderElement()
                }

                return <Route key={path} path={path} element={element} />
            }),
        [authStore.refreshToken, authStore.accessToken, routes]
    )

    return (
        <BrowserRouter>
            <Provider value={{ baseStore, authStore }}>
                <IntlProvider
                    defaultLocale={LOCALES.RUSSIAN}
                    locale={baseStore.uiLang}
                    messages={message[baseStore.uiLang]}>
                    <Header baseStore={baseStore} authStore={authStore} />
                    <Routes>{preparedRoutes}</Routes>
                </IntlProvider>
            </Provider>
        </BrowserRouter>
    )
})

export default App
