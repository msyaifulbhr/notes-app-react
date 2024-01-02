import React from 'react';
import Navigation from './Navigation';

function Header({ logout, name }) {
	return (
		<header className="note-app__header">
			<h1>Notes</h1>
			<Navigation logout={logout} name={name} />
		</header>
	)
}

export default Header;
