import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import authService from '../../Services/authService';
import AuthFormTypes from './AuthFormTypes';

interface LoginProps{
    onSwitchForm : (newForm : string) => void
} 

const Login: React.FC<LoginProps> = ({onSwitchForm}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await authService.Login(username, password, rememberMe);
            login();
        } catch (error) {
            
        }
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input 
                id="username"
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
            />

            <label htmlFor="password">Password:</label>
            <input 
                id="password"
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
            />

            <label htmlFor="remember-me">Remember Me:</label>
            <input 
                id="remember-me"
                type="checkbox" 
                onChange={e => setRememberMe(e.target.checked)}
            />

            <button type="submit">Login</button>
            <button type="button" onClick={() => onSwitchForm(AuthFormTypes.REGISTER)}>Move to register</button>
        </form>
    );
};

export default Login;