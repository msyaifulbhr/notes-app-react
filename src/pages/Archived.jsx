
import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/api';
import { LanguageContext } from '../contexts/LanguageContext';
import locale from '../utils/locale';

function ArchivedPageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return <Archived defaultKeyword={keyword} keywordChange={changeSearchParams} />;
}

function Archived({ defaultKeyword, keywordChange }) {
  const { language } = useContext(LanguageContext);
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState(defaultKeyword || '');

  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await getArchivedNotes();
      setNotes(data);
    };
    fetchNotes();
  }, []);

  const deleteNoteHandler = async (id) => {
    await deleteNote(id);
    const { data } = await getArchivedNotes();
    setNotes(data);
  };

  const unarchiveNoteHandler = async (id) => {
    await unarchiveNote(id);
    const { data } = await getArchivedNotes();
    setNotes(data);
  };

  const searchHandler = (keyword) => {
    setKeyword(keyword);
    keywordChange(keyword);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <>
      <h2>{locale[language].archived}</h2>
      <SearchBar
        keyword={keyword}
        keywordChange={searchHandler}
        placeholder={locale[language].searchPlaceholder} 
      />
      {filteredNotes.length > 0 ? (
        <NoteList
          notes={filteredNotes}
          archiveHandler={unarchiveNoteHandler}
          deleteHandler={deleteNoteHandler}
        />
      ) : (
        <p>{locale[language].noArchivedNotes}</p>
      )}
    </>
  );
}

Archived.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default ArchivedPageWrapper;
