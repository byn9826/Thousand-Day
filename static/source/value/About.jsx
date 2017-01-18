import React, {Component} from 'react';
import Rate from '../snippet/attitude/Rate';
class About extends Component {
    constructor(props){
        super(props);
		this.state={
		    totalStars:this.props.totalStars,//sum of all the rating stars
            newRate:this.props.newRate//if users add a new rate
		};
	}
    componentWillReceiveProps(nextProps){
        this.setState({totalStars:nextProps.totalStars});//change total stars after user input
        this.setState({newRate:nextProps.newRate});//show users add a new rate
    }
    render(){
        let avgStars, totalDone;
        if (this.state.newRate==true) {//if user add a new rate
            avgStars = this.state.totalStars/(this.props.data.comment.length+1);//get average stars
            totalDone = this.props.data.comment.length+1;//get people finish total
        }
        else {//if user didn't add a new rate
            avgStars = this.state.totalStars/this.props.data.comment.length;
            totalDone = this.props.data.comment.length;
        }
	    let avgRate = Math.floor(avgStars);//get average rate by integer
        return(
            <section id="main-about">
                <img alt={this.props.data.title} src={"/img/value/" + this.props.data.id + ".jpg"} />
                <section id="main-about-desc">
                    <h4><b>{this.props.data.days} learning days</b></h4>
                    <h4>
                        <b>Rate: </b>
                        <Rate rate={avgRate} max="5" />
                    </h4>
                    <h4><b>{totalDone} people finished it.</b></h4>
                    <h4><b>Be chosen by {this.props.data.list} study plans.</b></h4>
                    <h4>Type: {this.props.data.type}</h4>
                    <h4>Author: {this.props.data.author}</h4>
                </section>
            </section>
        )
    }
};
export default About;