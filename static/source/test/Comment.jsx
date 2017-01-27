import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Rate from '../snippet/attitude/Rate';
let data = [
	{userid: 0, name: "Paul", parkid: 0, park: "Banff", time: "2017-01-26", rate: "5", pic: "0", comment: "Very beautiful, will be there again one day."},
	{userid: 0, name: "Paul", parkid: 1, park: "Jasper", time: "2017-01-26", rate: "5", pic: "0", comment: "Even better than Banff."},
	{userid: 1, name: "BAO", parkid: 2, park: "Algonquin", time: "2017-01-26", rate: "4", pic: "0", comment: "Good to spend two day with family."},
]
class Comment extends Component {
	constructor() {
		super();
	}
	render() {
		let commentContainer = {
			float: "left",
			width: "20%",
			margin: "5px 2%",
			backgroundColor: "#f2f4f7",
			padding: "10px 3%",
			border: "1px solid #b1b5bc"
		};
		let commentProfile = {
			float: "left",
			width: "18%"
		};
		let commentInfo = {
			float: "right",
			width: "70%",
			margin: "1px 0"
		};
		let commentContent = {
			display: "inline-block",
			width: "100%",
			clear: "both",
			marginTop: "10px",
			paddingTop: "10px",
			borderTop: "1px dashed #b1b5bc"
		};
		let commentImg = {
			display: "inline-block",
			width: "100%",
			clear: "both",
			marginTop: "10px",
		};
		let infoName = {
			display: "inline-block",
			fontWeight: "bold",
			marginBottom: "5px",
			marginRight: "5%"
		};
		let infoLocation = {
			display: "inline-block",
			marginRight: "5%"
		};
		let infoTime = {
			display: "inline-block"
		};
		let comments = this.props.data.map(
			(comment)=>(
				<section key={comment.userid+"/"+comment.parkid} style={commentContainer}>
					<img style={commentProfile} src={"img/users/profile/"+comment.userid+".png"} />
					<div style={commentInfo}>
						<h4 style={infoName}>{comment.name}</h4>
						<Rate rate={comment.rate} max="5" />
					</div>
					<div style={commentInfo}>
						<h5 style={infoLocation}>@{comment.park}</h5> 
						<h5 style={infoTime}>{comment.time}</h5>   
					</div>
					<h5 style={commentContent}>{comment.comment}</h5>
					<img style={commentImg} alt={comment.name+" in "+comment.park} src={"img/park/"+comment.parkid+"/"+"comment.pic"+".jpg"} />
				</section>
		    )
		);
		return (
			<div>
				{comments}
			</div>
		)
	}
};
ReactDOM.render(<Comment data={data} />, document.getElementById('comment'));
