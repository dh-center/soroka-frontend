import Login from 'views/auth/Login'
import Dashboard from 'views/dashboard/Dashboard'
import Registration from 'views/auth/Registration'
import CardPage from 'views/dashboard/CardPage'
import {
    CARDS_ROUTE,
    CARD_BY_ID_ROUTE,
    LOGIN_ROUTE,
    INVITE_BY_TOKEN_ROUTE,
    REGISTRATION_BY_TOKEN_ROUTE,
    CARDS_CREATE_ROUTE,
    CARDS_TEMPLATES_ROUTE
} from './urls'
import CardTemplates from 'views/dashboard/CardTemplates'
import InviteLink from 'views/auth/InviteLink'

type Route = {
    path: string
    renderElement: () => JSX.Element
    onlyWithoutToken?: boolean
    onlyWithToken?: boolean
}

const routes: Route[] = [
    {
        path: REGISTRATION_BY_TOKEN_ROUTE,
        renderElement: () => <Registration />,
        onlyWithoutToken: true
    },
    {
        path: INVITE_BY_TOKEN_ROUTE,
        renderElement: () => <InviteLink />,
        onlyWithoutToken: true
    },
    {
        path: LOGIN_ROUTE,
        renderElement: () => <Login />,
        onlyWithoutToken: true
    },
    {
        path: '/',
        renderElement: () => <Dashboard />,
        onlyWithToken: true
    },
    {
        path: CARDS_ROUTE,
        renderElement: () => <Dashboard />,
        onlyWithToken: true
    },
    {
        path: CARDS_CREATE_ROUTE,
        renderElement: () => <CardPage />,
        onlyWithToken: true
    },
    {
        path: CARD_BY_ID_ROUTE,
        renderElement: () => <CardPage />,
        onlyWithToken: true
    },
    {
        path: CARDS_TEMPLATES_ROUTE,
        renderElement: () => <CardTemplates />,
        onlyWithToken: true
    },
    {
        path: '*',
        renderElement: () => <>404</>
    }
]

export default routes
