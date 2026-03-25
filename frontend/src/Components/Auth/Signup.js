import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const { register, error } = useAuthContext();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('😊');

    const emojis = ['😊', '😎', '🦁', '🐱', '🐼', '🦊', '🐷', '🦄', '🤖', '👻', '💀', '👽', '👾', '🎃', '😺', '😸', '😹', '😻'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await register({ name, email, password, avatar });
        if (!error) {
            navigate('/login');
        }
    }

    return (
        <SignupStyled>
            <div className="auth-container">
                <div className="app-title">
                    <h2>Budget</h2>
                </div>
                <h2>Register</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-control">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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

                    <div className="emoji-picker">
                        <p>Choose your Avatar:</p>
                        <div className="emojis">
                            {emojis.map((emoji, index) => (
                                <span
                                    key={index}
                                    onClick={() => setAvatar(emoji)}
                                    className={avatar === emoji ? 'selected' : ''}
                                >
                                    {emoji}
                                </span>
                            ))}
                        </div>
                    </div>

                    <button type="submit">Sign Up</button>
                    <p>Already have an account? <Link to="/login">Login Here</Link></p>
                </form>
            </div>
        </SignupStyled>
    )
}

const SignupStyled = styled.div`
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

    .emoji-picker {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        p {
            color: rgba(34, 34, 96, 0.9);
            text-align: center;
        }
        .emojis {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            justify-content: center;
            span {
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.2rem;
                border-radius: 50%;
                transition: all 0.3s ease;
                border: 2px solid transparent;
                &:hover {
                    transform: scale(1.2);
                    background: rgba(34, 34, 96, 0.1);
                }
                &.selected {
                    border-color: var(--color-accent);
                    background: rgba(34, 34, 96, 0.1);
                    transform: scale(1.2);
                }
            }
        }
    }
`;

export default Signup;
