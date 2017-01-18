import React, {Component} from 'react';
import reqwest from 'reqwest';
import Rate from '../snippet/attitude/Rate';
import Inputbox from '../ui/inputbox/Inputbox';
import Inputarea from '../ui/inputbox/Inputarea';
import Upsertlist from '../ui/upsertlist/Upsertlist';
class Interact extends Component {
    constructor(props) {
	    super(props);
		this.state = {
            uRate:this.props.uRate,//rate from current user
            clickComment:false,//if the comment popup box open
            clickPlan:false,//if the plan popup box open
            content:this.props.uContent,//comment content from current user
            title:this.props.uTitle,//comment title from current user
            plan:[]//plans from current user
		};
	};
    //get new rate from current user
    componentWillReceiveProps(nextProps){
        this.setState({uRate:nextProps.uRate});
    };
    //show popup box if users click comment it
	clickComment(){
		this.setState({clickComment:true});
	};
    //show popup box if users click add to plan
    clickPlan(){
        reqwest({
            url:'/api/valuePlans',
            method:'post',
            data:{"user":this.props.user},
            success:function(result){
                result=JSON.parse(result);
                this.setState({plan:result,clickPlan:true});
            }.bind(this)
        });
    };
    //if user click submit comment
	submitComment(){
        let changedTitle = this.refs.commentTitle.state.content,//get new title value
            changedContent = this.refs.commentContent.state.content;//get new content value
        this.setState({title:changedTitle});
        this.setState({content:changedContent});
        this.props.submitComment(changedTitle,changedContent);//pass to root
        this.setState({clickComment:false});//close popup box
	}
    //if user click cancel comment
    cancelComment(){
        this.setState({clickComment:false});//close popup box
	}
    //if user click submit plan
    submitPlan(){
        console.log(this.refs.choosePlan.state.select);
        console.log(this.refs.choosePlan.state.content);
        this.setState({clickPlan:false});//close popup box
	}
    //if user click cancel plan
    cancelPlan(){
        this.setState({clickPlan:false});//close popup box
	}
    render(){
        //show popup box after users click rate it
        let clickComment;
        if(this.state.clickComment){
            clickComment = (
                <div className="pop-container">
                    <span>
                        <label className="main-interact-comment-label"><h4>Title:</h4></label>
                        <Inputbox ref="commentTitle" content={this.state.title} total="50" />
                        <label className="main-interact-comment-label"><h4>Content:</h4></label>
                        <Inputarea ref="commentContent" content={this.state.content} height="150px" total="500" />
                        <button className="main-interact-comment-button button-nborder" onClick={this.submitComment.bind(this)}>submit</button>
                        <button className="main-interact-comment-button button-nborder" onClick={this.cancelComment.bind(this)}>cancel</button>
                    </span>
                </div>
            )
        }
        //show popup box after user click add to plan
        let clickPlan;
        if(this.state.clickPlan){
            clickPlan = (
                <div className="pop-container">
                    <span>
                        <Upsertlist ref="choosePlan" title="Choose plans:" max="20" option={this.state.plan} />
                        <button className="main-interact-plan-button button-nborder" onClick={this.submitPlan.bind(this)}>submit</button>
                        <button className="main-interact-plan-button button-nborder" onClick={this.cancelPlan.bind(this)}>cancel</button>
                    </span>
                </div>
            )
        }
        return(
            <section id="main-interact">
                <div>
                    <h4>Your Rate:</h4>
                    <Rate rate={this.state.uRate} max="5" interact="true" rateChange={this.props.changeRate}/>
                </div>
                <button className="button-container" onClick={this.clickComment.bind(this)} >
                    <h4>Comment it</h4>
                </button>
                <button className="button-container" onClick={this.clickPlan.bind(this)} >
                    <h4>Add to plan</h4>
                </button>
                {clickComment}
                {clickPlan}
            </section>
        )
    }
};
export default Interact;