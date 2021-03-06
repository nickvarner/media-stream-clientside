import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

const StreamList = (props) => {
	React.useEffect(
		() => {
			props.fetchStreams();
			console.log('streamlist useeffect fetched');
		},
		[ props.streams.length ]
	);
	const renderAdmin = (stream) => {
		if (props.currentUserId === stream.userId) {
			return (
				<div className='right floated content'>
					<Link to={`/streams/edit/${stream.id}`} className='ui button primary'>
						edit
					</Link>
					<Link to={`/streams/delete/${stream.id}`} className='ui button negative'>
						delete
					</Link>
				</div>
			);
		}
	};
	const renderList = () => {
		return props.streams.map((stream) => {
			return (
				<div className='item' key={stream.id}>
					{renderAdmin(stream)}
					<i className='large middle aligned icon camera' />
					<div className='content'>
						<Link to={`/streams/${stream.id}`} className='header'>
							{stream.title}
						</Link>
						<div className='description'>{stream.description}</div>
					</div>
				</div>
			);
		});
	};
	const renderCreate = () => {
		if (props.isSignedIn) {
			return (
				<div style={{ textAlign: 'right' }}>
					<Link to='/streams/new'>create stream</Link>
				</div>
			);
		}
	};
	return (
		<div className='div'>
			<h2>streams</h2>
			<div className='ui celled list'>{renderList()}</div>
			{renderCreate()}
		</div>
	);
};

// class StreamList extends React.Component {
// componentDidMount () {
// 	this.props.fetchStreams();
// }
// renderAdmin (stream) {
// 	if (this.props.currentUserId === stream.userId) {
// 		return (
// 			<div className='right floated content'>
// 				<Link to={`/streams/edit/${stream.id}`} className='ui button primary'>
// 					edit
// 				</Link>
// 				<button className='ui button negative'>delete</button>
// 			</div>
// 		);
// 	}
// }
// renderList () {
// 	return this.props.streams.map((stream) => {
// 		return (
// 			<div className='item' key={stream.id}>
// 				{this.renderAdmin(stream)}
// 				<i className='large middle aligned icon camera' />
// 				<div className='content'>
// 					{stream.title}
// 					<div className='description'>{stream.description}</div>
// 				</div>
// 			</div>
// 		);
// 	});
// }
// 	renderCreate () {
// 		if (this.props.isSignedIn) {
// 			return (
// 				<div style={{ textAlign: 'right' }}>
// 					<Link to='/streams/new'>create stream</Link>
// 				</div>
// 			);
// 		}
// 	}
// 	render () {
// 		return (
// 			<div className='div'>
// 				<h2>streams</h2>
// 				<div className='ui celled list'>{this.renderList()}</div>
// 				{this.renderCreate()}
// 			</div>
// 		);
// 	}
// }

const mapStateToProps = (state) => {
	//we need to turn the state object back into an array so it can map over
	//object.values extracts all the values out of an object and turns it into an array
	return {
		streams       : Object.values(state.streams),
		currentUserId : state.auth.userId,
		isSignedIn    : state.auth.isSignedIn
	};
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
