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
	url:'/api/value',
	method:'post',
	data:{"id":valueId},
	success:function(result){
		let Data = JSON.parse(result);
		//get current user's rate, comment content, comment title
		let userRate = 0,userComment="",userTitle="";
		for (var i=0;i<Data.comment.length;i++){
			if(userId===Data.comment[i].id){
				userRate=Data.comment[i].rate;
				userComment=Data.comment[i].content;
				userTitle = Data.comment[i].title;
				break;
			}
		}
		ReactDOM.render(<Value data={Data} uRate={userRate} uComment={userComment} uTitle={userTitle} />, document.getElementById('root'));
	}
});
class Value extends Component{
	constructor(props){
		super(props);
		this.state={
			data:this.props.data,//all the material information
            totalStars:this.props.data.stars,//total stars of this material
            newRate:false,//if the users add a new rate
            uRate:this.props.uRate,//rate from current user
			uContent : this.props.uComment,//comment content from current user
			uTitle : this.props.uTitle//comment title from current user
		};
	}
    //if current user change the rate
	changeRate(rateNum){
		let prevState=this.state.uRate;
		if(this.state.uRate==0){//check if it is a totally new rate
			this.setState({newRate:true});
		}
		this.setState({uRate:rateNum});//update current user rate
		this.setState({totalStars:this.state.totalStars-prevState+rateNum});//change total stars
	}
	//if user subit comment from interact component
	submitComment(newTitle,newContent){
		this.setState({uTitle:newTitle});
        this.setState({uContent:newContent});
	}
	render(){
		return(
			<div id="container">
				<title>{this.state.data.title}</title>
				<Header />
				<main id="main">
					<h1>{this.state.data.title}</h1>
                    <About data={this.state.data} totalStars={this.state.totalStars} newRate={this.state.newRate} />
                    <Subject data={this.state.data} />
                    <Interact user={userId} data={this.state.data} uRate={this.state.uRate} uContent={this.state.uContent} uTitle={this.state.uTitle} changeRate={this.changeRate.bind(this)} submitComment={this.submitComment.bind(this)}/>
                    <Comment data={this.state.data} userId={userId} uRate={this.state.uRate}/>
                </main>
				<Footer />
			</div>
		)
	}
};