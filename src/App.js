import './App.css'
import Login from './views/auth/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from './views/dashboard/Dashboard'
import Registration from './views/auth/Registration'
import CardPage from './views/dashboard/CardPage'
import Header from './components/common/Header'
import {
  CARDS_ROUTE,
  CARD_BY_ID_ROUTE,
  LOGIN_ROUTE,
  INVITE_BY_TOKEN_ROUTE,
  REGISTRATION_BY_TOKEN_ROUTE,
  CARDS_CREATE_ROUTE,
  CARDS_TEMPLATES_ROUTE
} from './utils/routes'
import CardTemplates from './views/dashboard/CardTemplates'
import { IntlProvider } from 'react-intl'
import { LOCALES } from './lang/locales'
import { message } from './lang/message'
import BaseStore from './stores/baseStore'
import { observer } from 'mobx-react'
import AuthStore from './stores/authStore'
import React, { useEffect } from 'react'
import { mainContext } from './context/mainContext'
import InviteLink from './views/auth/InviteLink'
import PropertiesStore from './stores/propertiesStore'

const baseStore = new BaseStore()
export const authStore = new AuthStore()
export const propertiesStore = new PropertiesStore()

const App = observer(() => {
  const { Provider } = mainContext
  useEffect(() => {
    async function checkCurrentUserTokens() {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')

      authStore.setAccessToken(accessToken)
      authStore.setRefreshToken(refreshToken)

      if (!authStore.currentUser && accessToken && refreshToken) {
        await authStore.getUserProfile()
      }
    }

    baseStore.getOrganizations()
    propertiesStore.getProperties()
    checkCurrentUserTokens()
  })

  return (
    <BrowserRouter>
      <Provider value={baseStore}>
        <IntlProvider defaultLocale={LOCALES.RUSSIAN} locale={baseStore.uiLang} messages={message[baseStore.uiLang]}>
          <Header baseStore={baseStore} authStore={authStore} />
          <Routes>
            <Route path={REGISTRATION_BY_TOKEN_ROUTE} element={<Registration />} />
            <Route path={INVITE_BY_TOKEN_ROUTE} element={<InviteLink />} />
            <Route path={LOGIN_ROUTE} element={<Login authStore={authStore} />} />
            {/* todo: authorization protection for all routes */}
            <Route path="/" element={<Navigate replace to={authStore.currentUser ? CARDS_ROUTE : LOGIN_ROUTE} />} />
            <Route path={CARDS_ROUTE} element={<Dashboard />} />
            <Route path={CARD_BY_ID_ROUTE} element={<CardPage />} />
            <Route path={CARDS_CREATE_ROUTE} element={<CardPage />} />
            <Route path={CARDS_TEMPLATES_ROUTE} element={<CardTemplates />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </IntlProvider>
      </Provider>
    </BrowserRouter>
  )
})

export default App
