import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Rate, Upvote, Inputbox, Inputarea, Imagebox,  Droplist, Upsertlist,Progress, Editit} from 'thousanday-react';
import Header from '../general/Header';
import Footer from '../general/Footer';
import RandomEG from './RandomEG';
import RateEG from './RateEG';
class Reactui extends Component{
	constructor(){
		super();
		this.state={
			defaultRate:"0",//this is for rating star
			defaultVote:"100",//this is for upvote it
	    	differ:"true",//this is for upvote it
			progress:"0.3"//this is for progress
		};
	};
	//this is for rating star
	rateChange(rateNum){
		this.setState({defaultRate:rateNum});
	};
	//this is for upvote it
	upVote(){
	  this.setState({defaultVote:this.state.defaultVote*1+1});
	  this.setState({differ:"false"});
	};
	//this is for progress
	changeProgress(){
		let current = this.state.progress;
		this.setState({progress:parseFloat(current)+0.2});
	};
	render(){
		{/*this is for image box*/}
		let img = [
			["img/react/1.jpg","alt1"],
			["img/react/2.jpg","alt2"],
			["img/react/3.jpg","alt3"]
		];
		//options for droplist
		let dropOption = ["option1","option2","option3","option4","option5"];
		//options for upsertlist
		let planslist = ["plan A","plan B", "plan C", "plan D"];
		return (
			<div id="container">
				<Header />
				<main id="main">
					<h1>Thousanday-React</h1>
					<h2>A list of React UI components</h2>
					<h3>
						<b>install:</b><br />
						npm install thousanday-react --save
					</h3>
					<section>
						<h3 className="main-list">Display</h3>
						<h4 className="orange-box"><a href="#random">Random</a></h4>
						<h3 className="main-list">Attitude</h3>
						<h4 className="orange-box"><a href="#rate">Rate</a></h4>
						<h3 className="main-list">Under Rewrting</h3>
						<h4 className="orange-box"><a href="#upvote">Upvote it</a></h4>
						<h4 className="orange-box"><a href="#inputbox">Inputbox</a></h4>
						<h4 className="orange-box"><a href="#imagebox">Imagebox</a></h4>
						<h4 className="orange-box"><a href="#droplist">Droplist</a></h4>
						<h4 className="orange-box"><a href="#upsertlist">Upsertlist</a></h4>
						<h4 className="orange-box"><a href="#progress">Progress</a></h4>
						<h4 className="orange-box"><a href="#editit">Edit it</a></h4>
					</section>
				</main>
				<RandomEG />
				<RateEG />
				
				{/*
				
				<section id="upvote" className="components">
					<div className="components-title">
						<h2>Upvote it</h2>
					</div>
					<h3>
						Component used to let usrs upvote some content<br/>
						<a href="https://github.com/byn9826/Thousanday-React#upvote">How to use it</a>
					</h3>
					<div className="components-display">
						<h4>Dislpay upvote</h4>
						<Upvote total="100" differ="false" />
						<h4>You can upvote it</h4>
						<Upvote total={this.state.defaultVote}  upVote={this.upVote.bind(this)} differ={this.state.differ}/>
						<h4>This is another upvote.</h4>
						<Upvote className="exampleUpvote" total="100000" differ="false" color="white" font="11px" bg="orange"  />
					</div>
				</section>
				<section id="inputbox" className="components">
					<div className="components-title">
						<h2>Inputbox character count</h2>
					</div>
					<h3>
						Component used to calculate and control length if users input<br/>
						<a href="https://github.com/byn9826/Thousanday-React#inputbox">How to use it</a>
					</h3>
					<div className="components-display">
						<div id="inputbox-display">
							<div>
								<label htmlFor="inputbox-display-inputbox"><h4><b>Title:</b></h4></label>
								<Inputbox name="inputbox-display-inputbox" content="A title of something" total="50"/>
								<label htmlFor="inputbox-display-inputarea"><h4><b>Content:</b></h4></label>
								<Inputarea name="inputbox-display-inputarea" content="Write something here" height="80px" total="300"/>
							</div>
						</div>
					</div>
				</section>
				<section id="imagebox" className="components">
					<div className="components-title">
						<h2>Imagebox</h2>
					</div>
					<h3>
						Component used to display multi images<br/>
						<a href="https://github.com/byn9826/Thousanday-React#imagebox">How to use it</a>
					</h3>
					<div className="components-display">
						<Imagebox slides={img} width="100%" timer="5000"/>
					</div>
				</section>
				<section id="droplist" className="components">
					<div className="components-title">
						<h2>Droplist</h2>
					</div>
					<h3>
						Component used to show list of options<br/>
						<a href="https://github.com/byn9826/Thousanday-React#droplist">How to use it</a>
					</h3>
					<div className="components-display">
						<Droplist  title="- Choose an option -" option={dropOption} />
					</div>
				</section>
				<section id="upsertlist" className="components">
					<div className="components-title">
						<h2>Upsertlist</h2>
					</div>
					<h3>
						Component used to let user choose options or create new one<br/>
						<a href="https://github.com/byn9826/Thousanday-React#upsertlist">How to use it</a>
					</h3>
					<div className="components-display">
						<Upsertlist ref="choosePlan" title="Choose plans:" max="15" option={planslist} />
					</div>
				</section>
				<section id="progress" className="components">
					<div className="components-title">
						<h2>Progress</h2>
					</div>
					<h3>
						Component used to create a progress bar<br/>
						<a href="https://github.com/byn9826/Thousanday-React#progress">How to use it</a>
					</h3>
					<div id="progress-content" className="components-display">
						<Progress width="40%" complete={this.state.progress} />
						<input type="button" width="50%" onClick={this.changeProgress.bind(this)} value="Complete 20%" />
					</div>
				</section>
				<section id="editit" className="components">
					<div className="components-title">
						<h2>Edit it</h2>
					</div>
					<h3>
						Component used to show content and allow edit<br/>
						<a href="https://github.com/byn9826/Thousanday-React#editit">How to use it</a>
					</h3>
					<div id="progress-content" className="components-display">
						<Editit content="It is a good component" front="Note: " max="30" />
					</div>
				</section>
				*/}
				<Footer />
			</div>
		)
	}
};
ReactDOM.render(<Reactui />, document.getElementById('root'));
