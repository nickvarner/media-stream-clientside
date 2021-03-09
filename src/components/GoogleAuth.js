import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
	state = { isSignedIn: null };
	componentDidMount () {
		window.gapi.load('auth2', () => {
			window.gapi.auth2
				.init({
					clientId : '795078419535-6cl89kdi6gvcl96kq3841psf1tubcdfe.apps.googleusercontent.com',
					scope    : 'email'
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.setState({ isSignedIn: this.auth.isSignedIn.get() });
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}
	renderAuthButton () {
		if (this.state.isSignedIn === null) {
			return null;
		} else if (this.state.isSignedIn) {
			return (
				<button className='ui red google button' onClick={this.onSignOutClick}>
					<i className='google icon' /> sign out
				</button>
			);
		} else {
			return (
				<button className='ui red google button' onClick={this.onSignInClick}>
					<i className='google icon' /> sign in with google
				</button>
			);
		}
	}
	onSignInClick = () => {
		this.auth.signIn();
	};
	onSignOutClick = () => {
		this.auth.signOut();
	};
	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			this.props.signIn();
		} else {
			this.props.signOut();
		}
	};
	render () {
		return <div className='GoogleAuth'>{this.renderAuthButton()}</div>;
	}
}

export default connect(null, { signIn, signOut })(GoogleAuth);
