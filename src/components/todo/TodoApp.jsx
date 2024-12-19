import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './TodoApp.css'

import LogoutComponent from './LogoutComponent'
import LoginComponent from './LoginComponent'
import ErrorComponent from './ErrorComponent'
import WelcomeComponent from './WelcomeComponent'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import ListTodosComponent from './ListTodosComponent'
import TodoComponent from './TodoComponent'
import AuthProvider, { useAuth } from './security/AuthContext'

function AuthenticatedRoute({children}) {
    const authContext = useAuth()
    if(authContext.isAuthenticated) {
        return children
    }
    return <Navigate to="/" />
}

export default function TodoApp() {
    return (
        <div className="TodoApp">

            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent/>
                    <Routes>
                        <Route path='/' element={<LoginComponent/>} />
                        <Route path='/login' element={<LoginComponent/>} />
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent/>
                            </AuthenticatedRoute>
                        } />
                        <Route path='/todos' element={
                            <AuthenticatedRoute>
                                <ListTodosComponent/>
                            </AuthenticatedRoute>
                        } />
                        <Route path='/todo/:id' element={
                            <AuthenticatedRoute>
                                <TodoComponent/>
                            </AuthenticatedRoute>
                        } />
                        <Route path='/logout' element={<LogoutComponent/>} />
                        <Route path='/*' element={<ErrorComponent/>} />
                    </Routes>
                    <FooterComponent/>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}
