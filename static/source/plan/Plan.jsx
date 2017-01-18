import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from '../general/Header';
import Footer from '../general/Footer';
import Item from './Item'
import reqwest from 'reqwest';
import Progress from '../ui/progress/Progress';
//define users name, change later*************************************
let userId = 1;
//get plandata
let planId = window.location.pathname.split('/').pop();
reqwest({
	url:'/api/plan',
	method:'post',
	data:{"id":planId},
	success:function(result){
		let Data = JSON.parse(result);
		let value = Data.value.toString();
		reqwest({
			url:'/api/planValues',
			method:'post',
			data:{"ids":value},
			success:function(result1){
				let Data1 = JSON.parse(result1);
				//get current user's rate, comment content, comment title
				ReactDOM.render(<Plan data={Data} value={Data1} />, document.getElementById('root'));
			}
		});
	}
});
class Plan extends Component{
    constructor(props){
		super(props);
		this.state={
			data:this.props.data,//all data of this plan
			value:this.props.value,
			progress:"0.2"
		};
	}
    render(){
		return(
			<div id="container">
				<title>{this.state.data.title}</title>
				<Header />
                <main id="main">
					<header id="main-title">
						<h1>{this.state.data.title}</h1>
						<Progress width="30%" notice="Complete: " complete={this.state.progress} />
						<h4>30 days plan created by {this.state.data.name} since {this.state.data.date}</h4>
					</header>
					<Item value={this.state.value} comment={this.state.data.comment} />
                </main>
				<Footer />
			</div>
		)
	}
};