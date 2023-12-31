import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { FiEye, FiArchive } from "react-icons/fi";
import { MdDelete, MdCancel  } from "react-icons/md";

function NoteButton({ id, archived, archiveHandler, deleteHandler }) {
	return (
		<section className="note-item__action">
			<button type="button" className="note-item__detail-button">
				<Link to={`/detail/${id}`}><FiEye /></Link>
			</button>
			<button
				type="button"
				onClick={archiveHandler}
				className="note-item__archive-button"
			>
				{archived ? <MdCancel /> : <FiArchive />}
			</button>
			<button
				type="button"
				onClick={deleteHandler}
				className="note-item__delete-button"
			>
				<MdDelete />
			</button>
		</section>
	)
}

NoteButton.propTypes = {
	id: PropTypes.string.isRequired,
	archived: PropTypes.bool.isRequired,
	archiveHandler: PropTypes.func.isRequired,
	deleteHandler: PropTypes.func.isRequired,
}

export default NoteButton
