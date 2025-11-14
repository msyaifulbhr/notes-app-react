
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { register } from '../utils/api';
import { LanguageContext } from '../contexts/LanguageContext';
import locale from '../utils/locale';

function RegisterPage() {
  const navigate = useNavigate();
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
  const { language } = useContext(LanguageContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Password and confirm password must be the same.');
      return;
    }

    const { error } = await register({ name, email, password });

    if (!error) {
      navigate('/');
    }
  };

  return (
    <section className='register-page'>
      <h2>{locale[language].registerPage.title}</h2>
      <form onSubmit={onSubmitHandler} className='input-register'>
        <label htmlFor='name'>{locale[language].name}</label>
        <input type='text' id='name' value={name} onChange={onNameChange} />
        <label htmlFor='email'>{locale[language].email}</label>
        <input type='email' id='email' value={email} onChange={onEmailChange} />
        <label htmlFor='password'>{locale[language].password}</label>
        <input type='password' id='password' value={password} onChange={onPasswordChange} />
        <label htmlFor='confirmPassword'>{locale[language].confirmPassword}</label>
        <input type='password' id='confirmPassword' value={confirmPassword} onChange={onConfirmPasswordChange} />
        <button>{locale[language].register}</button>
      </form>
      <p>{locale[language].registerPage.loginHere} <Link to="/">{locale[language].login}</Link></p>
    </section>
  );
}

export default RegisterPage;
