import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import reqwest from 'reqwest';
import Header from '../general/Header';
import Footer from '../general/Footer';
import About from './About';
import Subject from './Subject';
import Interact from './Interact';
import Comment from './Comment';
//define users name, change later*************************************
let userId = 1;
//get defaultdata
let valueId = window.location.pathname.split('/').pop();
reqwest({
	url: '/api/value',
	method: 'post',
	data: {"id": valueId},
	success: function(result) {
		let Data = JSON.parse(result);
		//get current user's rate, comment content, comment title
		let userVote;
		for (var i = 0; i < Data.agree.length; i++) {
			if (Data.agree[i] == userId) {
				userVote = 1;
				break;
			}
		}
		for (var j = 0; j < Data.disagree.length; j++) {
			if (Data.disagree[j] == userId) {
				userVote = 0;
				break;
			}
		}
		let userRate = 0, userComment;
		for (var k = 0; k < Data.note.length; k++) {
			if (Data.note[k].id == userId) {
				userRate = Data.note[k].rate;
				userComment = Data.note[k].comment;
				break;
			}
		}
		ReactDOM.render(<Value data = {Data} userVote = {userVote} userRate = {userRate} userComment = {userComment} />, document.getElementById('root'));
	}
});
class Value extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data,//all the material information
			userVote: this.props.userVote,//current user's vote for this material
			agree: this.props.data.agree,
			disagree: this.props.data.disagree,
			userRate: this.props.userRate,
			userComment: this.props.userComment
		};
	}
    //if current user change the rate
	changeRate(rateNum) {
		let prevState = this.state.uRate;
		//check if it is a totally new rate
		if(this.state.uRate == 0) {
			this.setState({newRate: true});
		}
		this.setState({uRate: rateNum});//update current user rate
		this.setState({totalStars: this.state.totalStars - prevState + rateNum});//change total stars
	}
	//if user subit comment from interact component
	submitNote(newVote, newRate, newComment) {
		console.log("newVote: " + newVote + " newRate: " + newRate + " newComment: " + newComment);
		this.setState({userVote: newVote});
        this.setState({userRate: newRate});
		this.setState({userComment: newComment});
	};
	render() {
		return (
			<div id="container">
				<title>{this.props.data.title}</title>
				<Header />
				<main id="main">
					<h1>{this.props.data.title}</h1>
                    <About data = {this.props.data} />
                    <Subject data = {this.state.data} />
                    <Interact user = {userId} userVote = {this.state.userVote} agree = {this.state.agree} disagree = {this.state.disagree} userRate = {this.state.userRate} userComment = {this.props.userComment} submitNote = {this.submitNote.bind(this)} />
				    <Comment data={this.state.data} userId={userId} uRate={this.state.uRate}/>
                </main>
				<Footer />
			</div>
		);
	}
};