
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/api';
import { LanguageContext } from '../contexts/LanguageContext';
import locale from '../utils/locale';

function AddNote() {
  const navigate = useNavigate();
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

  const onSaveNoteHandler = async () => {
    const { error } = await addNote({ title, body });
    if (!error) {
      navigate('/');
    }
  };

  return (
    <div className='add-new-page'>
      <div className='add-new-page__input'>
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
      </div>
      <div className='add-new-page__action'>
        <button className='action' type='button' onClick={onSaveNoteHandler}>
          {locale[language].add}
        </button>
      </div>
    </div>
  );
}

export default AddNote;
