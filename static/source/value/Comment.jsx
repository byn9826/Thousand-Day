import React, {Component} from 'react';
import CommentEach from './CommentEach'
class Comment extends Component {
    constructor(props){
		super(props);
		this.state={
		    uRate:this.props.uRate//get current user rate
		};
	}
    componentWillReceiveProps(nextProps){
        this.setState({uRate:nextProps.uRate});//get current users new rate
    }
    render(){
        //show all the users comment
		let comments = this.props.data.comment.map(
			(comment)=>(
				<CommentEach userId={this.props.userId} differ={(this.props.userId==comment.id)?"false":"true"} key={comment.id} name={comment.name} score={comment.rate} content={comment.content} title={comment.title} agree={comment.agree} uRate={this.state.uRate} upvoter={comment.upvoter} />
		    )
		);
        return(
            <section id="main-comment">
                <h3>Comment</h3>
                {comments}
            </section>
        )
    }
};
export default Comment;