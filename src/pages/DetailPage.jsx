
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/api';
import { showFormattedDate } from '../utils';
import { LanguageContext } from '../contexts/LanguageContext';
import locale from '../utils/locale';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    async function fetchNote() {
      const { data } = await getNote(id);
      if (data) {
        setNote(data);
      }
      setInitializing(false);
    }
    fetchNote();
  }, [id]);

  const deleteNoteHandler = async () => {
    await deleteNote(id);
    navigate('/');
  };

  const toggleArchiveNoteHandler = async () => {
    if (note.archived) {
      await unarchiveNote(id);
      navigate('/');
    } else {
      await archiveNote(id);
      navigate('/');
    }
  };

  if (initializing) {
    return <div>{locale[language].loading}</div>;
  }

  if (note === null) {
    return <p>{language === 'id' ? 'Catatan tidak ditemukan.' : 'Note not found.'}</p>;
  }

  return (
    <div className='detail-page'>
      <h3 className='detail-page__title'>{note.title}</h3>
      <p className='detail-page__createdAt'>{showFormattedDate(note.createdAt, language)}</p>
      <div className='detail-page__body'>{note.body}</div>
      <div className='detail-page__action'>
        <button className='action' onClick={toggleArchiveNoteHandler}>
          {note.archived ? locale[language].unarchive : locale[language].archive}
        </button>
        <button className='action' onClick={deleteNoteHandler}>
          {locale[language].delete}
        </button>
      </div>
    </div>
  );
}

export default DetailPage;
