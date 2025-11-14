
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { FiCheck } from 'react-icons/fi';
import { LanguageContext } from '../contexts/LanguageContext';
import locale from '../utils/locale';

function NoteInput({ addNote }) {
  const { language } = useContext(LanguageContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const onTitleChangeHandler = (event) => {
    if (event.target.value.length <= 50) {
      setTitle(event.target.value);
    }
  };

  const onBodyChangeHandler = (event) => {
    setBody(event.target.innerHTML);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    addNote({ title, body });
  };

  return (
    <form className='add-new-page__input' onSubmit={onSubmitHandler}>
      <input
        className='add-new-page__input__title'
        placeholder={locale[language].title}
        value={title}
        onChange={onTitleChangeHandler}
      />
      <p className='add-new-page__char-limit'>
        {locale[language].charLimit}: {50 - title.length}
      </p>
      <div
        className='add-new-page__input__body'
        contentEditable
        data-placeholder={locale[language].body}
        onInput={onBodyChangeHandler}
      />
      <div className='add-new-page__action'>
        <button className='action' type='submit'>
          <FiCheck />
        </button>
      </div>
    </form>
  );
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
