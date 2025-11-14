
import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getUserLogged, putAccessToken } from './utils/api';
import { LanguageContext } from './contexts/LanguageContext';
import Header from './components/Header';
import locale from './utils/locale';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import ArchivedPageWrapper from './pages/Archived';
import DetailPage from './pages/DetailPage';
import AddNote from './pages/AddNote';
import PageNotFound from './pages/PageNotFound'; // Import PageNotFound

function App() {
  const navigate = useNavigate();
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    }

    fetchUser();
  }, []);

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
    navigate('/');
  }

  function onLogout() {
    setAuthedUser(null);
    putAccessToken('');
    navigate('/');
  }

  if (initializing) {
    return <p>{locale[language].loading}</p>;
  }

  return (
    <div className="app-container">
      <Header logout={authedUser ? onLogout : undefined} name={authedUser ? authedUser.name : undefined} />
      <main>
        <Routes>
          {authedUser ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/archived" element={<ArchivedPageWrapper />} />
              <Route path="/notes/:id" element={<DetailPage />} />
              <Route path="/notes/new" element={<AddNote />} />
              <Route path="/*" element={<PageNotFound />} />
            </>
          ) : (
            <>
              <Route path="/" element={<LoginPage loginSuccess={onLoginSuccess} />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/*" element={<PageNotFound />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;
