import React from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Archived from './pages/Archived'
import DetailNote from './pages/DetailNote'
import AddNote from './pages/AddNote'
import PageNotFount from './pages/404'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { getUserLogged, putAccessToken } from '../src/utils/api'

class App extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
		  authedUser: null,
		  initializing: true,
		};

		this.onLoginSuccess = this.onLoginSuccess.bind(this);
	}

	async componentDidMount() {
		const { data } =  await getUserLogged();

		this.setState(() => {
			return {
				authedUser: data,
				initializing: false
			};
		});
	}

	async onLoginSuccess({ accessToken }) {
		putAccessToken(accessToken);
		const { data } = await getUserLogged();

		this.setState(() => {
			return {
				authedUser: data,
			};
		});
	}

	render() {
		if (this.state.initializing) {
			return null;
		}

		if (this.state.authedUser === null) {
			return (
				<>
					<div className='notes-app'>
						<header className='notes-app__header'>
							<h1>Notes</h1>
						</header>
					</div>
					<main>
						<Routes>
							<Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
							<Route path="/register" element={<RegisterPage />} />
						</Routes>
					</main>
					</>
			)
		}

		return (
			<>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/archives" element={<Archived />} />
					<Route path="/detail/:id" element={<DetailNote />} />
					<Route path="/notes/new" element={<AddNote />} />
					<Route path="/*" element={<PageNotFount />} />
				</Routes>
			</>
		)
	}
}

export default App
