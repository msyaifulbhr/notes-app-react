import React from "react"
import NoteCreateForm from "../components/NoteCreateForm"
import PropTypes from "prop-types";
import { addNote } from "../utils/local-data"
import { useNavigate } from "react-router-dom"


function AddNote() {
	const navigate = useNavigate();

	function addNoteHandler({ title, body }) {
		addNote({ title, body });
		navigate('/');
	}

	return (
		<div className="add-form">
			<NoteCreateForm submitHandler={addNoteHandler} />
		</div>
	)
}

AddNote.propTypes = {
	title: PropTypes.string,
	body: PropTypes.string,
}

export default AddNote
