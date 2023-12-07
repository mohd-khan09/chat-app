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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulated session check logic - replace it with your actual session checking mechanism
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Get the session from Supabase
        const session = await supabase.auth.getSession();
        if (session.data.session !== null) {
          console.log('User is logged in');
          setIsLoggedIn(true);
        } else {
          console.log('User is not logged in');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      }
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
