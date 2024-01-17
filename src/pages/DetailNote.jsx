import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getSingleNote } from '../utils/api';
import { showFormattedDate } from '../utils/index';

function DetailNoteWrapper() {
	const { id } = useParams()

	return <DetailNote id={id} />
}

class DetailNote extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			notes: getSingleNote(props.id),
		}
	}

	render() {
		const { title, createdAt, body } = this.state.notes
		return (
			<div className="detail-page">
				<p className="detail-page__title">{title}</p>
				<p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
				<p className="detail-page__body">{body}</p>
			</div>
		)
	}
}

DetailNote.propType = {
	id: PropTypes.string.isRequired
}

export default DetailNoteWrapper;
