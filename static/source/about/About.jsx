import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from '../general/Header';
import Footer from '../general/Footer';
class About extends Component{
	constructor(){
		super();
		this.state={
		};
	}
	render(){
		return(
			<div id="container">
				<Header />
				<main id="main">
					<img src="img/about/offline.jpg" alt="This website is under development" />
				</main>
				<Footer />
			</div>
		)
	}
};
ReactDOM.render(<About />, document.getElementById('root'));
