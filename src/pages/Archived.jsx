import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getArchivedNotes, deleteNote, unArchiveNote  } from '../utils/api';

function ArchivedPageWrapper() {
	const [searchParams, setSearchParams] = useSearchParams()
	const keyword = searchParams.get("keyword")
	function changeSearchParams(keyword) {
		setSearchParams({ keyword })
	}

	return (
		<Archived defaultKeyword={keyword} keywordChange={changeSearchParams} />
	)
}

class Archived extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			notes: [],
			keyword: props.defaultKeyword || "",
		}
		this.deleteNoteHandler = this.deleteNoteHandler.bind(this)
		this.unarchiveNoteHandler = this.unarchiveNoteHandler.bind(this)
		this.searchHandler = this.searchHandler.bind(this)
	}

	async componentDidMount() {
		const { data } = await getArchivedNotes();

		this.setState(() => {
			return {
				notes: data
			}
		})
	}

	async deleteNoteHandler(id) {
		await deleteNote(id);

		const { data } = await getArchivedNotes();
		this.setState(() => {
			return {
				notes: data
			};
		});
	}

	async unarchiveNoteHandler(id) {
		await unArchiveNote(id);

		const { data } = await getArchivedNotes();
		this.setState(() => {
			return {
				notes: data
			};
		});
	}

	searchHandler(keyword) {
		this.setState(() => {
			return {
				keyword,
			}
		})

		this.props.keywordChange(keyword)
	}

	render() {
		const notes = this.state.notes.filter((note) => {
			return note.title.toLowerCase().includes(this.state.keyword.toLowerCase())
		})

		return (
			<>
				<SearchBar
					keyword={this.state.keyword}
					keywordChange={this.searchHandler}
				/>
				<NoteList
					notes={notes}
					archiveHandler={this.unarchiveNoteHandler}
					deleteHandler={this.deleteNoteHandler}
				/>
			</>
		)
	}
}

Archived.propTypes = {
	defaultKeyword: PropTypes.string,
    keywordChange: PropTypes.func.isRequired,
}

export default ArchivedPageWrapper;
