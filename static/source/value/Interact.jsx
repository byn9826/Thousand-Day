import React, {Component} from 'react';
import reqwest from 'reqwest';
import Vote from '../snippet/attitude/Vote';
import Rate from '../snippet/attitude/Rate';
import Inputarea from '../snippet/input/Inputarea';
import Inputbox from '../snippet/input/Inputbox';
class Interact extends Component {
    constructor(props) {
	    super(props);
		this.state = {
            userVote: this.props.userVote,
            agreeTotal: this.props.agree.length,
            disagreeTotal: this.props.disagree.length,
            userRate: this.props.userRate,//rate from current user
            userComment: this.props.userComment,
            clickNote: false,//if the comment popup box open

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
	clickNote() {
		this.setState({clickNote: true});
	};
    rateChange(rateNum) {
        //rateNum is the new rate from current user
        this.setState({userRate: rateNum});
    }
    newChoice(newNum) {
        this.setState({userVote: newNum});
    }
    //if user click submit comment
	submitNote() {
        let changedComment = this.refs.commentContent.state.content;//get new content value
        console.log(changedComment);
        //this.setState({title: changedTitle});
        //this.setState({content: changedContent});
        //this.props.submitComment(changedTitle, changedContent);//pass to root
        //this.setState({clickComment:false});//close popup box
	}
    //show popup box if users click add to plan
    clickPlan() {
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
    
    //if user click cancel comment
    cancelNote() {
        this.setState({clickNote: false});//close popup box
	}
    //if user click cancel plan
    cancelPlan(){
        this.setState({clickPlan:false});//close popup box
	}
    render(){
        //change content in note
        let noteButton;
        if (this.state.userVote == 1 || this.state.userVote == 0) {
            noteButton = "Edit note";
        } else {
            noteButton = "Note it";
        }
        //show popup box after users click rate it
        let showNote;
        if(this.state.clickNote){
            showNote = (
                <div className="pop-container">
                    <span id = "main-interact-note">
                        <h4>Your opinion about this Material:</h4>
                        <Vote left = "Valuable" right = "Less value" agree = {this.state.agreeTotal} disagree = {this.state.disagreeTotal} interact = "true" choice = {this.state.userVote} newChoice = {this.newChoice.bind(this)} />
                        <h4>Please Rate it:</h4>
                        <Rate rate = {this.state.userRate} max = "5" interact = "true" rateChange = {this.rateChange.bind(this)} />
                        <h4>Leave a short comment:</h4>
                        <Inputarea ref = "commentContent" content = {this.state.userComment} max = "140" />
                        <button className="button-nborder" onClick={this.submitNote.bind(this)}>Submit</button>
                        <button className="button-nborder" onClick={this.cancelNote.bind(this)}>Cancel</button>
                    </span>
                </div>
            )
        }
        /*
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
        */
        return(
            <section id="main-interact">
                <div className = "button-container" onClick = {this.clickNote.bind(this)} >
                    <h4>{noteButton}</h4>
                </div>
                {/*
                <div>
                    <h4>Your Rate:</h4>
                    <Rate rate={this.state.uRate} max="5" interact="true" rateChange={this.props.changeRate}/>
                </div>
                
                <button className="button-container" onClick={this.clickPlan.bind(this)} >
                    <h4>Add to plan</h4>
                </button>
                */}
                {showNote}
            </section>
        )
    }
};
export default Interact;