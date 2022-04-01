import './App.css'
import Login from './views/auth/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Dashboard from './views/Dashboard'
import Registration from './views/auth/Registration'

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="*" element={<div>404</div>} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
