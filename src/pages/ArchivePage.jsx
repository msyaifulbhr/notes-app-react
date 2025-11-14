
import React, { useState, useEffect, useContext } from 'react';
import NoteList from '../components/NoteList';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/api';
import { LanguageContext } from '../contexts/LanguageContext';

function ArchivePage() {
  const { language } = useContext(LanguageContext);
  const [notes, setNotes] = useState([]);

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

  return (
    <>
      <h2>{language === 'id' ? 'Catatan Arsip' : 'Archived Notes'}</h2>
      <NoteList
        notes={notes}
        deleteHandler={deleteNoteHandler}
        archiveHandler={unarchiveNoteHandler} // This should be unarchive
      />
    </>
  );
}

export default ArchivePage;
