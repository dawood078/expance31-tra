import React, { useState } from 'react'
import styled from 'styled-components'
import avatar from '../../img/avatar.png'
import { signout } from '../../utils/Icons'
import { menuItems } from '../../utils/menuItems'
import { useAuthContext } from '../../context/authContext'
import { useGlobalContext } from '../../context/globalContext'

function Navigation({ active, setActive }) {
    const { user, logout } = useAuthContext()
    const { totalBalance } = useGlobalContext()

    return (
        <NavStyled>
            <div className="app-title">
                <h2>Budget</h2>
            </div>
            <div className="user-con">
                {user?.avatar ? (
                    <div className="user-avatar-emoji">
                        {user.avatar}
                    </div>
                ) : (
                    <img src={avatar} alt="" />
                )}
                <div className="text">
                    <h2>{user?.name}</h2>
                    <p>Rs {totalBalance()}</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active' : ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className="bottom-nav">
                <li onClick={logout} className="sign-out-btn">
                    {signout} Sign Out
                </li>
            </div>
        </NavStyled>
    )
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;

    .app-title {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;
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

    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        .user-avatar-emoji {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
        }
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }

    .sign-out-btn {
        cursor: pointer;
        padding: .5rem 1rem;
        border-radius: 50px;
        background: #222260;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .5rem;
        width: auto;
        margin: 0 1rem;
        border: none;
        transition: all .3s ease-in-out;
        &:hover {
            background: #46467A;
            transform: translateY(-2px);
        }
        &:active {
            background: #111130;
            transform: translateY(0);
        }
    }
`;

export default Navigation