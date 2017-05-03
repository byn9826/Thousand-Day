import React, {Component} from "react"
import ReactDOM from "react-dom";
import reqwest from "reqwest";
import Header from "../general/Header";
import Footer from "../general/Footer";
class Message extends Component {
    constructor(props) {
        super(props);
		this.state = {
            //store current user id if logged id
            visitorId: this.props.visitorId,
            //store user id user want to delete as a friend
            friendDel: null,
            //store friend list
            friendList: this.props.friends,
            //store show how many friends
            friendLength: (this.props.friends.length >5)?5:this.props.friends.length,
            //store delete friend error
            delError: null
		};
	}
    //if user want to delete one friend
    wantDel(id) {
        this.setState({friendDel: id, delError: null});
    }
    //if user don't want to delete friend
    cancelDel() {
        this.setState({friendDel: null});
    }
    //if user confirm delete one friend
    confirmDel(index) {
        let id = this.state.friendList[index].user_id;
        reqwest({
            url: "/message/delFriend",
            method: "POST",
            data: {"id": id},
            success: function(result) {
                switch (result) {
                    case "0":
                        this.setState({delError: "Please Login first"});
                        break;
                    case "1":
                        let newFriend = this.state.friendList;
                        newFriend.splice(index, 1);
                        this.setState({friendList: newFriend, friendDel: null, friendLength: this.state.friendLength - 1});
                        break;
                    case "2":
                        this.setState({delError: "Can't delete, try later"});
                        break;
                }
            }.bind(this),
            error: function (err) {
                this.setState({delError: "Can't connect to server"});
            }.bind(this)
        });
        
    }
    //if user click load more friend
    moreFriend() {
        let newLength = ((this.state.friendLength + 5) < this.state.friendList.length)?(this.state.friendLength + 5):this.state.friendList.length;
        this.setState({friendLength: newLength});
    }
	render() {
        //show friend list
        let friends = [];
        for (let i = 0; i < this.state.friendLength; i++) {
            if (this.state.friendList[i].user_id !== this.state.friendDel) {
                friends[i] = (
                    <div key={"thousandaymessage" + i} className="aside-list">
                        <a href={"/user/" + this.state.friendList[i].user_id}>
                            <img alt="Friend" src={"/img/user/" + this.state.friendList[i].user_id + ".jpg"} />
                        </a>
                        <h5>{this.state.friendList[i].user_name}</h5>
                        <h6 onClick={this.wantDel.bind(this, this.state.friendList[i].user_id)}>Delete</h6>
                    </div>
                )
            } else {
                //show delete friend button
                friends[i] = (
                    <div key={"thousandaymessage" + i} className="aside-list">
                        <a href={"/user/" + this.state.friendList[i].user_id}>
                            <img alt="Friend" src={"/img/user/" + this.state.friendList[i].user_id + ".jpg"} />
                        </a>
                        <h5>{this.state.friendList[i].user_name}</h5>
                        <h6 onClick={this.cancelDel.bind(this)}>Cancel</h6>
                        <input type="button" value="Confirm ?" onClick={this.confirmDel.bind(this, i)} />
                        <h7>{this.state.delError}</h7>
                    </div>
                )
            }
        }
        //show load friend button
        let loadFriend;
        if (this.state.friendLength < this.state.friendList.length) {
            loadFriend = (
                <h6 onClick={this.moreFriend.bind(this)}>Load more ..</h6>
            )
        }
		return (
			<div id="react-root">
				<Header visitorId={this.props.visitorId} visitorName={this.props.visitorName} loginSuccess={()=>{}} logOut={()=>{}} />
                <main id="main">
                </main>
                <aside id="aside">
                    <h4 id="aside-friend">Your Friend List &nbsp; {this.state.friendList.length}/50</h4>
                    {friends}
                    {loadFriend}
                </aside>
				<Footer />
			</div>
		);
	}
}
reqwest({
	url: "/message/view",
	method: "POST",
	success: function(result) {
        console.log(result[2]);
		switch (result) {
			case "0":
				console.log("Can't connect to db");
				break;
			default:
				ReactDOM.render(<Message visitorId={result[0]} visitorName={result[1]} friends={result[2]} />, document.getElementById("root"));
		}
	},
	error: function (err) {
		console.log("Can't connect to server");
	}
});