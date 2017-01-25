import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import reqwest from 'reqwest';
import Header from '../general/Header';
import About from './About';
class Pet extends Component {
	render() {
		return (
			<div id="container">
				<Header />
				<About data={this.props.data} />
			</div>
		);
	}
}
//get defaultdata
reqwest({
	url: '/pet/view',
	method: 'POST',
	data: {"id": window.location.pathname.split('/').pop()},
	success: function(result) {
		let Data = JSON.parse(result);
		ReactDOM.render(<Pet data={Data} />, document.getElementById('root'));
	}
});