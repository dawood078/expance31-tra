import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const { login, error } = useAuthContext();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await login({ email, password });
        if (res) {
            navigate('/');
        }
    }

    return (
        <LoginStyled>
            <div className="auth-container">
                <div className="app-title">
                    <h2>Budget</h2>
                </div>
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-control">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-control">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                    <p><Link to="/forgot-password">Forgot Password?</Link></p>
                    <p>Don't have an account? <Link to="/signup">Register Here</Link></p>
                </form>
            </div>
        </LoginStyled>
    )
}

const LoginStyled = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .auth-container{
        background: rgba(252, 246, 249, 0.78);
        border: 3px solid #FFFFFF;
        backdrop-filter: blur(4.5px);
        border-radius: 32px;
        padding: 2rem;
        width: 400px;
        display: flex;
        flex-direction: column;
        gap: 2rem;

        .app-title {
            display: flex;
            justify-content: center;
            align-items: center;
            h2 {
                font-size: 2.5rem;
                font-weight: 800;
                background: linear-gradient(to right, #F56692, #F2994A);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                text-transform: uppercase;
                letter-spacing: 2px;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
            }
        }
        
        h2{
            text-align: center;
        }

        form{
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            input{
                font-family: inherit;
                font-size: inherit;
                outline: none;
                border: none;
                padding: .5rem 1rem;
                border-radius: 5px;
                border: 2px solid #fff;
                background: transparent;
                resize: none;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                color: rgba(34, 34, 96, 0.9);
                width: 100%;
                &::placeholder {
                    color: rgba(34, 34, 96, 0.4);
                }
            }
            button{
                padding: .8rem 1.6rem;
                border-radius: 50px;
                background: var(--color-accent);
                color: #fff;
                border: none;
                outline: none;
                cursor: pointer;
                transition: all .4s ease-in-out;
                &:hover{
                    background: var(--color-green);
                }
            }
        }
    }
    .error{
        color: red;
        text-align: center;
    }
`;

export default Login;
