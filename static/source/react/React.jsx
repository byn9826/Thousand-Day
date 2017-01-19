import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from '../general/Header';
import Footer from '../general/Footer';
import RandomEG from './RandomEG';
import RateEG from './RateEG';
import InputboxEG from './InputboxEG';
import InputareaEG from './InputareaEG';
class Reactui extends Component {
	constructor() {
		super();
	}
	render() {
		return (
			<div id = "container">
				<Header />
				<main id = "main">
					<h1>Thousanday-React</h1>
					<h2>A list of React UI components</h2>
					<h3>
						<b>install:</b><br />
						npm install thousanday-react --save
					</h3>
					<a className = "github-button" href = "https://github.com/byn9826/thousanday-react" data-style = "mega" aria-label = "Star byn9826/thousanday-react on GitHub">Star</a>
					<section>
						<h3 className = "main-list">Display</h3>
						<h4 className = "orange-box"><a href ="#random">Random</a></h4>
						<h3 className = "main-list">Attitude</h3>
						<h4 className = "orange-box"><a href ="#rate">Rate</a></h4>
						<h3 className = "main-list">Input</h3>
						<h4 className = "orange-box"><a href = "#inputbox">Inputbox</a></h4>
						<h4 className = "orange-box"><a href = "#inputarea">Inputarea</a></h4>
					</section>
				</main>
				<RandomEG />
				<RateEG />
				<InputboxEG />
				<InputareaEG />
				<Footer />
			</div>
		)
	}
};
ReactDOM.render(<Reactui />, document.getElementById('root'));
