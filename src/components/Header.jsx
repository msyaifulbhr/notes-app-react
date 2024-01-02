import React from 'react';
import Navigation from './Navigation';
import { LocaleConsumer } from '../contexts/LocaleContext';

function Header({ logout, name }) {
	return (
		<LocaleConsumer>
			{
				({ locale }) => {
					return (
						<header className="note-app__header">
							<h1>{locale === 'id' ? 'Catatan' : 'Notes'}</h1>
							<Navigation logout={logout} name={name} />
						</header>
					)
				}
			}
		</LocaleConsumer>						
	)
}

export default Header;
