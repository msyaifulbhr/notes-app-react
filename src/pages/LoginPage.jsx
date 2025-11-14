
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { login } from '../utils/api';
import { LanguageContext } from '../contexts/LanguageContext';
import locale from '../utils/locale';

function LoginPage({ loginSuccess }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const { language } = useContext(LanguageContext);

  const onLogin = async (event) => {
    event.preventDefault();

    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  };

  return (
    <section className='login-page'>
      <h2>{locale[language].loginPage.title}</h2>
      <form onSubmit={onLogin} className='input-login'>
        <label htmlFor='email'>{locale[language].email}</label>
        <input type='email' id='email' value={email} onChange={onEmailChange} />
        <label htmlFor='password'>{locale[language].password}</label>
        <input type='password' id='password' value={password} onChange={onPasswordChange} />
        <button>{locale[language].login}</button>
      </form>
      <p>{locale[language].loginPage.registerHere} <Link to="/register">{locale[language].register}</Link></p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
