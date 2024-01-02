import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

function Navigation({ logout, name }) {
	return (
		<nav>
			<Link to="/">Beranda</Link>
			<Link to="/archives">Arsip</Link>
			<Link to="/notes/new">Tambah</Link>
			<button onClick={logout}>{name} <FiLogOut /></button>
		</nav>
	)
}

Navigation.propTypes = {
	logout: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
}

export default Navigation;
