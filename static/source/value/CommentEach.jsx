import React, {Component} from 'react';
import Rate from '../snippet/attitude/Rate';
import Upvote from '../ui/upvote/Upvote';
class CommentEach extends Component {
	constructor(props){
		super(props);
		this.state={
			defaultVote:this.props.agree,//each current upvote
			uRate:this.props.uRate,//get current user rate
			upvoter:this.props.upvoter,//upvoter list
			doneUpvote:this.props.differ//if current user upvote it before
		};
	}
	componentDidMount(){
		//check if current user already upvote it
		for(var i=0;i<this.state.upvoter.length;i++){
			if(this.props.userId==this.state.upvoter[i]){
				this.setState({doneUpvote:"false"});
			}
		}
	}
	componentWillReceiveProps(nextProps){
        this.setState({uRate:nextProps.uRate});//get current user new rate
    }
	//if user click upvote
	upVote(){
		let prevState=this.state.defaultVote;
		this.setState({defaultVote:this.state.defaultVote+1});//add one upvote
		this.setState({upvoter:this.state.upvoter.push(this.props.userId)});//change upvoter list
		this.setState({doneUpvote:"false"});//disable upvote
	}
	render(){
		//update rate if user change rate
		let currentRate;
		if(this.props.differ=="false"){
			currentRate=(
			    <Rate rate={this.state.uRate} length="5" />
			)
		}
		else{
			currentRate=(
			    <Rate rate={this.props.score} length="5" />
			)
		}
		return(
			<div className="main-comment-each">
				<Upvote total={this.state.defaultVote}  upVote={this.upVote.bind(this)} differ={this.state.doneUpvote}/>
				<h4>{this.props.name} : <b>{this.props.title}</b></h4>
				<h4>{currentRate}</h4>
				<h4>{this.props.content}</h4>
			</div>
		)
	}
}
export default CommentEach;
