import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getNotes, deleteNote, archiveNote } from '../utils/api';

function HomePageWrapper() {
	const [searchParams, setSearchParams] = useSearchParams()
	const keyword = searchParams.get("keyword")
	function changeSearchParams(keyword) {
		setSearchParams({ keyword })
	}

	return <Home defaultKeyword={keyword} keywordChange={changeSearchParams} />
}

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			notes: [],
			keyword: props.defaultKeyword || "",
		}
		this.deleteNoteHandler = this.deleteNoteHandler.bind(this)
		this.archiveNoteHandler = this.archiveNoteHandler.bind(this)
		this.searchHandler = this.searchHandler.bind(this)
	}

	async componentDidMount() {
		const { data } = await getNotes();

		this.setState(() => {
			return {
				notes: data
			}
		})
	}

	async deleteNoteHandler(id) {
		await deleteNote(id);

		const { data } = await getNotes();
		this.setState(() => {
			return {
				notes: data
			};
		});
	}

	async archiveNoteHandler(id) {
		await archiveNote(id);

		const { data } = await getNotes();
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
					archiveHandler={this.archiveNoteHandler}
					deleteHandler={this.deleteNoteHandler}
				/>
			</>
		)
	}
}

Home.propTypes = {
	defaultKeyword: PropTypes.string,
	keywordChange: PropTypes.func.isRequired,
}

export default HomePageWrapper;
