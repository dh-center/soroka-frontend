import './App.css'
import Login from './views/auth/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './views/dashboard/Dashboard'
import Registration from './views/auth/Registration'
import CreateNewCard from './views/dashboard/CreateNewCard'
import CardPage from './views/dashboard/CardPage'
import Header from './components/common/Header'

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/cards" element={<Dashboard />} />
                    <Route path="/cards/:id" element={<CardPage />} />
                    <Route path="/cards/create" element={<CreateNewCard />} />
                    <Route path="*" element={<div>404</div>} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
