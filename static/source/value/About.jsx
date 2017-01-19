import React, {Component} from 'react';
import Rate from '../snippet/attitude/Rate';
import Vote from '../snippet/attitude/Vote';
class About extends Component {
    constructor(props) {
        super(props);
		this.state = {
		    totalStars:this.props.totalStars,//sum of all the rating stars
            newRate:this.props.newRate//if users add a new rate
		};
	};
    componentWillReceiveProps(nextProps){
        this.setState({totalStars:nextProps.totalStars});//change total stars after user input
        this.setState({newRate:nextProps.newRate});//show users add a new rate
    };
    render() {
	    let agreeTotal = this.props.data.agree.length;
		let disagreeTotal = this.props.data.disagree.length;
        return(
            <section id="main-about">
                <img alt = {this.props.data.title} src = {"/img/value/" + this.props.data.id + ".jpg"} />
                <section id="main-about-desc">
                    <h4><b>{this.props.data.days} learning days</b></h4>
                    <h4><b>People's opinion: </b></h4>
                    <Vote left = "Valuable: " right = "Less value: " agree = {agreeTotal} disagree = {disagreeTotal} />
                    <h4><b>Listed in {this.props.data.plan} plans.</b></h4>
                    <h4>Type: {this.props.data.type}</h4>
                    <h4>Author: {this.props.data.author}</h4>
                </section>
            </section>
        );
    };
};
export default About;