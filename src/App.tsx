import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
// import Home from './routes/login/loginRoute';
import Login from './pages/Login';
import { MantineProvider } from '@mantine/core';
import Home from './pages/Home';
import '@mantine/core/styles.css';
import { theme } from './theme';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './components/resetPassword/resetpassword';
import { SnackbarProvider } from 'notistack';
import { useEffect, useState } from 'react';
import supabase from './components/SupabaseCleint/supabaseclient';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3001');

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      console.log('Checking session...');
      try {
        // Get the session from Supabase
        const session = await supabase.auth.getSession();
        if (session.data.session) {
          console.log('User is logged in');
          setIsLoggedIn(true);
        } else {
          console.log('User is not logged in');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
        setIsLoggedIn(false);
      }
      console.log('Done checking session');
    };

    checkSession();
  }, []);

  return (
    <MantineProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/home"
            element={isLoggedIn ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/forgot-password"
            element={isLoggedIn ? <Navigate to="/home" /> : <ForgotPassword />}
          />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </SnackbarProvider>
    </MantineProvider>
  );
}

export default App;
