import './App.css'
import Login from './components/views/auth/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import Registration from './components/views/auth/Registration'
import CreateNewCard from './components/dashboard/CreateNewCard'
import CardPage from './components/dashboard/CardPage'
import Header from './components/dashboard/Header'

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/yourCards/:id" element={<CardPage />} />
                    <Route path="/newCard" element={<CreateNewCard />} />
                    <Route path="*" element={<div>404</div>} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
