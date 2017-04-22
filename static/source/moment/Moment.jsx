import React, {Component} from "react"
import ReactDOM from "react-dom";
import reqwest from "reqwest";
import Header from "../general/Header";
import Footer from "../general/Footer";
import Like from "../snippet/attitude/Like";
import Commentlist from "../snippet/attitude/Commentlist";
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
            //load more moment or not
            noLoad: "off"
		};
	}
    //if user click like button
    changeAgree(action) {
        console.log(action);

    }
    //if user click load more
    loadComment() {
        this.setState({noLoad: "on"});
    }
    render() {
        //check user liked it before or not
        let liked;
        if (this.state.like.indexOf(this.state.visitorId) === -1) {
            liked = "false";
        } else {
            liked = "true";
        }
        //display like or interact
        let likeAct;
        if (!this.state.visitorId) {
            likeAct = "false";
        } else {
            likeAct = "true";
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
        return (
            <div id="react-root">
                <Header loginSuccess={null} logOut={null} />
                <main id="main">
                    <img alt="moment" src={"/img/pet/" + this.props.data.pet_id + "/moment/" + this.props.data.image_name} />
                </main>
                <aside id="aside">
                    <section id="aside-talk">
                        <img alt="Pet" src={"/img/pet/" + this.props.data.pet_id + "/cover/0.png"} />
                        <h4>{this.props.data.moment_message}</h4>
                    </section>
                    <section className="aside-social">
                        <Like interact={likeAct} agree={this.state.like.length} liked={liked} newTotal={this.changeAgree.bind(this)}/>
                        <div className="fb-share-button" data-href={location.href} data-layout="button" data-size="small" data-mobile-iframe="true">
                            <a className="fb-xfbml-parse-ignore" target="_blank" href={"https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A5000%2Fmoment%2F" + this.props.data.moment_id + "&amp;src=sdkpreparse"}>
                                Share
                            </a>
                        </div>
                    </section>
                    <Commentlist data={comments} locker={this.state.noLoad} loadMore={this.loadComment.bind(this)} fontFamily="'Rubik', sans-serif" />
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
        console.log(result);
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
				ReactDOM.render(<Moment data={result[0]} like={like} visitorId={result[2]} comment={result[3]} />, document.getElementById("root"));
				break;
		}
	},
	error: function (err) {
		console.log("Can't connect to the server");
	}
});