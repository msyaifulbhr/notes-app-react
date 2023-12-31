import React from "react"
import NoteCreateForm from "../components/NoteCreateForm"
import PropTypes from "prop-types";
import { addNote } from "../utils/api"
import { useNavigate } from "react-router-dom"


function AddNote() {
	const navigate = useNavigate();

	async function onAddNoteHandler(note) {
		await addNote(note);
		navigate('/');
	}

	return (
		<div className="add-form">
			<NoteCreateForm submitHandler={onAddNoteHandler} />
		</div>
	)
}

AddNote.propTypes = {
	title: PropTypes.string,
	body: PropTypes.string,
}

export default AddNote
