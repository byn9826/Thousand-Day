import React, {Component} from 'react';
import reqwest from 'reqwest';
import Vote from '../snippet/attitude/Vote';
import Rate from '../snippet/attitude/Rate';
import AddtoList from '../snippet/list/AddtoList';
import Inputarea from '../snippet/input/Inputarea';
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
	}
    //show popup box if users click comment it
	clickNote() {
		this.setState({clickNote: true});
	}
    newChoice(newNum) {
        this.setState({userVote: newNum});
    }
    rateChange(rateNum) {
        //rateNum is the new rate from current user
        this.setState({userRate: rateNum});
    }
    //if user click submit comment
	submitNote() {
        this.setState({userComment: this.refs.commentContent.state.content});
        this.props.submitNote(this.state.userVote, this.state.userRate, this.refs.commentContent.state.content);
        this.setState({clickNote: false});
	}
    //if user click cancel comment
    cancelNote() {
        this.setState({userVote: this.props.userVote});
        this.setState({userRate: this.props.userRate});
        this.setState({userComment: this.state.userComment});
        this.setState({clickNote: false});//close popup box
	}
    //show popup box if users click add to plan
    clickPlan() {
        reqwest({
            url: '/api/valuePlans',
            method: 'post',
            data: {"user": this.props.user},
            success: function (result) {
                result = JSON.parse(result);
                this.setState({plan: result, clickPlan: true});
            }.bind(this)
        });
    }
    submitPlan() {
        this.setState({clickPlan: false});
        console.log(this.refs.planChoice.state.choice);
    }
    //if user click cancel plan
    cancelPlan(){
        this.setState({clickPlan:false});//close popup box
	}
    render() {
        //change content in note
        let noteButton;
        if (this.state.userVote == 1 || this.state.userVote == 0) {
            noteButton = "Edit note";
        } else {
            noteButton = "Note it";
        }
        //show popup box after users click rate it
        let showNote;
        if (this.state.clickNote) {
            showNote = (
                <div className = "pop-container">
                    <span id = "main-interact-note">
                        <h4>Your opinion about this Material:</h4>
                        <Vote left = "Valuable" right = "Less value" interact = "true" choice = {this.state.userVote} newChoice = {this.newChoice.bind(this)} />
                        <h4>Please Rate it:</h4>
                        <Rate rate = {this.state.userRate} max = "5" interact = "true" rateChange = {this.rateChange.bind(this)} />
                        <h4>Leave a short comment:</h4>
                        <Inputarea ref = "commentContent" content = {this.state.userComment} max = "140" />
                        <button className = "button-nborder" onClick = {this.submitNote.bind(this)}>Submit</button>
                        <button className = "button-nborder" onClick = {this.cancelNote.bind(this)}>Cancel</button>
                    </span>
                </div>
            );
        }
        //show popup box after user click add to plan
        let showPlan;
        if(this.state.clickPlan) {
            showPlan = (
                <div className="pop-container">
                    <span id="main-interact-plan">
                        <AddtoList ref="planChoice" title="Add to your plans:" content={this.state.plan} choice />
                        <button className="button-nborder" onClick={this.submitPlan.bind(this)}>submit</button>
                        <button className="button-nborder">cancel</button>
                    </span>
                </div>
            )
        }
        return (
            <section id = "main-interact">
                <div className = "main-interact-button button-container" onClick = {this.clickNote.bind(this)} >
                    <h4>{noteButton}</h4>
                </div>
                <div className="main-interact-button button-container" onClick = {this.clickPlan.bind(this)} >
                    <h4>Add it</h4>
                </div>
                {showNote}
                {showPlan}
            </section>
        );
    }
}
export default Interact;