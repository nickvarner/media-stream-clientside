import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

export default function Header () {
	return (
		<div className='ui secondary pointing menu'>
			<Link to='/' className='item'>
				screenSTREAM
			</Link>
			<div className='right menu'>
				<Link to='/' className='item'>
					all streams
				</Link>
				<GoogleAuth />
			</div>
		</div>
	);
}
