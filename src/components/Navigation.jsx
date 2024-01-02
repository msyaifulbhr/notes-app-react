import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { LocaleConsumer } from '../contexts/LocaleContext';
import { SiGoogletranslate } from "react-icons/si";

function Navigation({ logout, name }) {
	return (
		<LocaleConsumer>
			{
				({ locale, toggleLocale }) => {
					return(
						<nav>
							<Link to="/">{locale === 'id' ? 'Home' : 'Beranda'}</Link>
							<Link to="/archives">{locale === 'id' ? 'Archive' : 'Arsip'}</Link>
							<Link to="/notes/new">{locale === 'id' ? 'Add' : 'Tambah'}</Link>
							<button onClick={toggleLocale}>{locale === 'id' ? 'en' : 'id'}<SiGoogletranslate className="translate-icon"/></button>
							<button onClick={logout}>{name} <FiLogOut /></button>
						</nav>
					)
				}
			}
		</LocaleConsumer>					
	)
}

Navigation.propTypes = {
	logout: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
}

export default Navigation;
