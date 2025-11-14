
import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/api';
import { LanguageContext } from '../contexts/LanguageContext';
import locale from '../utils/locale';

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return <Home defaultKeyword={keyword} keywordChange={changeSearchParams} />;
}

function Home({ defaultKeyword, keywordChange }) {
  const { language } = useContext(LanguageContext);
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState(defaultKeyword || '');

  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await getActiveNotes();
      setNotes(data);
    };
    fetchNotes();
  }, []);

  const deleteNoteHandler = async (id) => {
    await deleteNote(id);
    const { data } = await getActiveNotes();
    setNotes(data);
  };

  const archiveNoteHandler = async (id) => {
    await archiveNote(id);
    const { data } = await getActiveNotes();
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
      <h2>{locale[language].home}</h2>
      <SearchBar
        keyword={keyword}
        keywordChange={searchHandler}
        placeholder={locale[language].searchPlaceholder}
      />
      {filteredNotes.length > 0 ? (
        <NoteList
          notes={filteredNotes}
          archiveHandler={archiveNoteHandler}
          deleteHandler={deleteNoteHandler}
        />
      ) : (
        <p>{locale[language].noActiveNotes}</p>
      )}
    </>
  );
}

Home.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default HomePageWrapper;
