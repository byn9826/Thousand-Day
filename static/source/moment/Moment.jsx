import React, {Component} from "react"
import ReactDOM from "react-dom";
import reqwest from "reqwest";
import Header from "../general/Header";
import Footer from "../general/Footer";
import Like from "../snippet/attitude/Like";
import Commentlist from "../snippet/attitude/Commentlist";
import Inputarea from '../snippet/input/Inputarea';
class Moment extends Component {
    constructor(props) {
        super(props);
		this.state = {
            //store like array
            like: this.props.like,
            //store current user id if logged id
            visitorId: this.props.visitorId,
            //store all comments
            comment: this.props.comment,
            //load more moment or no
            noLoad: this.props.comment.length <5?"on":"off",
            //store load comment for how many times
            loadPin: 1,
            //store error for load comment
            loadError: null,
            //store comment error
            commentError: null,
            //visitorName if user logged in
            visitorName: this.props.name,
            //if visitor added one comment
            commentAdd: 0,
            //show confirm delete button
            confirmDel: false,
            //store content show on delete button
            delButton: "Confirm Delete?"

		};
	}
    //if user click like button
    changeAgree(action) {
        reqwest({
            url: "/moment/changeLike",
            method: "POST",
            data: {"id": window.location.pathname.split("/").pop(), "statues": action},
            success: function(result) {
                switch(result) {
                    case "1":
                        let likeArray = this.state.like.slice();
                        if (action == 1) {
                            likeArray.push(this.state.visitorId);
                        } else {
                            likeArray.splice(likeArray.indexOf(this.state.visitorId), 1);
                        }
                        this.setState({like: likeArray});
                        break;
                }
            }.bind(this)
        });
    }
    //if user click load more
    loadComment() {
        reqwest({
            url: "/moment/commentLoad",
            method: "POST",
            data: {"pin": this.state.loadPin, "id": window.location.pathname.split("/").pop(), "add": this.state.commentAdd},
            success: function(result) {
                switch(result) {
                    case "0":
                        this.setState({loadError: "Connection error, try later."})
                        break;
                    default:
                        if (result.length === 0) {
                            this.setState({noLoad: "on", loadPin: this.state.loadPin + 1, loadError: null});
                        } else if (result.length < 5) {
                            let comment = this.state.comment.concat(result);
                            this.setState({noLoad: "on", loadPin: this.state.loadPin + 1, loadError: null, comment: comment});
                        } else {
                            let comment = this.state.comment.concat(result);
                            this.setState({loadPin: this.state.loadPin + 1, loadError: null, comment: comment});
                        }
                }
            }.bind(this),
            error: function (err) {
                this.setState({loadError: "Can't connect to server, try later."});
            }.bind(this)
        });
    }
    //if user click leave comment
    leaveComment() {
        //comment content can't be empty
        let content = this.refs.newComment.state.content.trim();
        if (content == "") {
            this.setState({commentError: "Comment can't be empty"});
        } else {
            reqwest({
                url: "/moment/createComment",
                method: "POST",
                data: {"content": content, "id": window.location.pathname.split("/").pop()},
                success: function(result) {
                    switch (result) {
                        case "0":
                            this.setState({commentError: "Please login first"});
                            this.refs.newComment.setState({content: ""});
                            break;
                        case "1":
                            let newComment = {
                                comment_content: content,
                                user_id: this.state.visitorId,
                                comment_time: new Date()
                            };
                            let comments = this.state.comment.slice();
                            comments.unshift(newComment);
                            this.setState({comment: comments, commentError: null, commentAdd: this.state.commentAdd + 1});
                            this.refs.newComment.setState({content: ""});
                            break;
                        case "2":
                            this.setState({commentError: "Can't leave a comment, try later"});
                            this.refs.newComment.setState({content: ""});
                            break;
                    }
                }.bind(this),
                error: function (err) {
                    this.setState({commentError: "Can't connect to server, try later"});
                    this.refs.newComment.setState({content: ""});
                }.bind(this)
            });
        }
    }
    //user click delete moment button
    showDel() {
        this.setState({confirmDel: true});
    }
    //user confirm delete moment
    confirmDel() {
        reqwest({
            url: "/moment/deleteMoment",
            method: "POST",
            data: {"moment": window.location.pathname.split("/").pop(), "pet": this.props.data.pet_id, "image": this.props.data.image_name},
            success: function(result) {
                switch(result) {
                    case "0":
                        this.setState({delButton: "No right to delete"});
                        break;
                    case "1":
                        window.location.replace("/pet/" + this.props.data.pet_id);
                        break;
                    case "2":
                        this.setState({delButton: "Internal Error, try later"});
                        break;
                }
            }.bind(this),
            error: function (err) {
                this.setState({delButton: "Can't connect to server"});
            }.bind(this)
        });
    }
    //update visitor id after user login successfully
	loginSuccess(id) {
		this.setState({visitorId: id});
	}
    logOut() {
		this.setState({visitorId: null, visitorName: null});
	}
    render() {
        //mode of like component
        let likeComment;
        if (!this.state.visitorId) {
            likeComment = (
                <Like key="like1" interact="false" agree={this.state.like.length} liked="false" newTotal={this.changeAgree.bind(this)}/>
            )
        } else {
            if (this.state.like.indexOf(this.state.visitorId) === -1) {
                likeComment = (
                    <Like key="like2" interact="true" agree={this.state.like.length} liked="false" newTotal={this.changeAgree.bind(this)}/>
                )
            } else {
                likeComment = (
                    <Like key="like3" interact="true" agree={this.state.like.length} liked="true" newTotal={this.changeAgree.bind(this)}/>
                )
            }
        }
        //process content for comments
        let comments = [];
        for (let i = 0; i < this.state.comment.length; i++) {
            comments[i] = [];
            comments[i][0] = this.state.comment[i].comment_content;
            comments[i][1] = "/img/user/" + this.state.comment[i].user_id + ".jpg";
            comments[i][2] = "/user/" + this.state.comment[i].user_id;
            comments[i][3] = new Date(this.state.comment[i].comment_time).toISOString().substring(0, 10);
        }
        //login user to show create comment area
        let createComment;
        if (this.state.visitorId) {
            createComment = (
                <div>
                    <Inputarea ref="newComment" content="" max="150" />
                    <h7>{this.state.commentError}</h7>
                    <h6 id="aside-leave" onClick={this.leaveComment.bind(this)}>Comment</h6>
                </div>
            );
        }
        //delete user button
        let deleteMoment;
        if (this.state.visitorId && (this.state.visitorId === this.props.privilege[0] || this.state.visitorId === this.props.privilege[1])) {
            deleteMoment = "Delete";
        }
        //confirm delete button
        let confirmDelete;
        if (this.state.visitorId && this.state.confirmDel) {
            confirmDelete = (
                <input type="button" value={this.state.delButton} onClick={this.confirmDel.bind(this)} />
            );
        }
        return (
            <div id="react-root">
                <Header visitorId={this.props.visitorId} visitorName={this.state.visitorName} loginSuccess={this.loginSuccess.bind(this)} logOut={this.logOut.bind(this)} />
                <main id="main">
                    <img alt="moment" src={"/img/pet/" + this.props.data.pet_id + "/moment/" + this.props.data.image_name} />
                    <h5>{new Date(this.props.data.moment_date).toISOString().substring(0, 10)}</h5>
                    <h6 onClick={this.showDel.bind(this)}>{deleteMoment}</h6>
                    {confirmDelete}
                </main>
                <aside id="aside">
                    <section id="aside-talk">
                        <img alt="Pet" src={"/img/pet/" + this.props.data.pet_id + "/cover/0.png"} />
                        <h4>{this.props.data.moment_message}</h4>
                    </section>
                    <section className="aside-social">
                        {likeComment}
                        <div className="fb-share-button" data-href={location.href} data-layout="button" data-size="small" data-mobile-iframe="true">
                            <a className="fb-xfbml-parse-ignore" target="_blank" href={"https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A5000%2Fmoment%2F" + this.props.data.moment_id + "&amp;src=sdkpreparse"}>
                                Share
                            </a>
                        </div>
                    </section>
                    <Commentlist data={comments} locker={this.state.noLoad} loadMore={this.loadComment.bind(this)} fontFamily="'Rubik', sans-serif" />
                    <h7>{this.state.loadError}</h7>
                    {createComment}
                </aside>
                <Footer />
            </div>
        );
    }
}
reqwest({
	url: "/moment/view",
	method: "POST",
	data: {"id": window.location.pathname.split("/").pop()},
	success: function(result) {
		switch(result) {
			case "0":
				console.log("Can't connect to db");
				break;
			case "1":
				window.location.replace("/404");
				break;
			default:
                let like = [];
                //get array of user id like this moment
                if (result[1].length !== 0) {
                    for (let i = 0; i < result[1].length; i++) {
                        like.push(result[1][i][0]);
                    }
                }
				ReactDOM.render(<Moment data={result[0]} like={like} visitorId={result[2]} comment={result[3]} name={result[4]} privilege={result[5]} />, document.getElementById("root"));
				break;
		}
	},
	error: function (err) {
		console.log("Can't connect to the server");
	}
});