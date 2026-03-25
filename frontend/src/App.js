import React, { useMemo } from 'react'
import styled from "styled-components";
import bg from './img/bg.png'
import { MainLayout } from './styles/Layouts'
import Orb from './Components/Orb/Orb'
import Navigation from './Components/Navigation/Navigation'
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income'
import Expenses from './Components/Expenses/Expenses';
import Transactions from './Components/Transactions/Transactions';
import { useGlobalContext } from './context/globalContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import ForgotPassword from './Components/Auth/ForgotPassword';
import ResetPassword from './Components/Auth/ResetPassword';
import { useAuthContext } from './context/authContext';

function App() {
  const [active, setActive] = React.useState(1)
  const { user } = useAuthContext();

  const global = useGlobalContext()
  console.log(global);

  const orbMemo = useMemo(() => {
    return <Orb />
  }, [])

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />
      case 2:
        return <Transactions />
      case 3:
        return <Income />
      case 4:
        return <Expenses />
      default:
        return <Dashboard />
    }
  }

  return (
    <BrowserRouter>
      <AppStyled bg={bg} className="App">
        {orbMemo}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/" element={
            user ? (
              <MainLayout>
                <Navigation active={active} setActive={setActive} />
                <main>
                  {displayData()}
                </main>
              </MainLayout>
            ) : <Navigate to="/login" />
          } />
        </Routes>
      </AppStyled>
    </BrowserRouter>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
