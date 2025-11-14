
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import { LanguageContext } from '../contexts/LanguageContext';
import locale from '../utils/locale';

function Header({ logout, name }) {
  const { language } = useContext(LanguageContext);
  const pageTitle = language === 'id' ? 'Aplikasi Catatan' : 'Notes App';

  return (
    <header className='note-app__header'>
      <h1>
        <Link to="/">{pageTitle}</Link>
      </h1>
      <div className="header-right-group">
        {name && <p className="user-info">Hello, {name}</p>}
        <Navigation logout={logout} />
      </div>
    </header>
  );
}

Header.propTypes = {
  logout: PropTypes.func,
  name: PropTypes.string,
};

export default Header;
