import React from 'react'
import { Link } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'

function Navigation() {
	return (
		<nav>
			<Link to="/">Home</Link>
			<Link to="/archives">Arsip</Link>
			<Link to="/notes/new">Tambah</Link>
			<button><FiLogOut /></button>
		</nav>
	)
}

export default Navigation
