
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiPlusCircle, FiArchive, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { MdGTranslate } from 'react-icons/md';
import PropTypes from 'prop-types';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';
import locale from '../utils/locale';

function Navigation({ logout }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <nav className="navigation">
      <Link to="/">{locale[language].home}</Link>
      <Link to="/archived">{locale[language].archived}</Link>
      <Link to="/notes/new">{locale[language].addNote}</Link>
      <button className="button-theme" onClick={toggleTheme}>
        {theme === 'light' ? <FiMoon /> : <FiSun />}
      </button>
      <button className="button-lang" onClick={toggleLanguage}>
        <MdGTranslate />
      </button>
      {logout && (
        <button className="button-logout" onClick={logout}>
          <FiLogOut />
          {locale[language].logout}
        </button>
      )}
    </nav>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func,
};

export default Navigation;
