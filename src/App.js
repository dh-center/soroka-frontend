import './App.css'
import Login from './views/auth/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './views/dashboard/Dashboard'
import Registration from './views/auth/Registration'
import CreateNewCard from './views/dashboard/CreateNewCard'
import CardPage from './views/dashboard/CardPage'
import Header from './components/common/Header'
import { CARDS_ROUTE, CREATE_ROUTE, getCreateCardRoute, getCreateCardWithTemplatesRoute, getIdDynamicRoute, LOGIN_ROUTE, REGISTRATION_ROUTE } from './api/routes'
import CardTemplates from './views/dashboard/CardTemplates'

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Routes>
                    <Route path={LOGIN_ROUTE} element={<Login />} />
                    <Route path={REGISTRATION_ROUTE} element={<Registration />} />
                    <Route path={CARDS_ROUTE} element={<Dashboard />} />
                    <Route path={getIdDynamicRoute()} element={<CardPage />} />
                    <Route path={getCreateCardRoute()} element={<CreateNewCard />} />
                    <Route path={getCreateCardWithTemplatesRoute()} element={<CardTemplates/>}/>
                    <Route path="*" element={<div>404</div>} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
