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
            delError: null,
            //store apply list
            applyList: this.props.applys,
            //store accept error
            acceptError: null,
            //store message list
            messageList: this.props.messages,
            //store message error
            messageError: null,
            //store target message id
            messageTarget: null
		};
	}
    //if user logout
    logOut() {
		window.location.replace("/user/" + this.props.visitorId);
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
    //if user delete a friend request
    delApply(index) {
        let id = this.state.applyList[index].user_id;
        reqwest({
            url: "/message/delFriend",
            method: "POST",
            data: {"id": id},
            success: function(result) {
                switch (result) {
                    case "0":
                        this.setState({acceptError: "Please Login first"});
                        break;
                    case "1":
                        let newList = this.state.applyList;
                        newList.splice(index, 1);
                        this.setState({applyList: newList});
                        break;
                    case "2":
                        this.setState({acceptError: "Can't delete, try later"});
                        break;
                }
            }.bind(this),
            error: function (err) {
                this.setState({acceptError: "Can't connect to server"});
            }.bind(this)
        });
        
    }
    //if user accept friend request
    acceptApply(index) {
        let id = this.state.applyList[index].user_id;
        let name = this.props.visitorName;
        reqwest({
            url: "/message/addFriend",
            method: "POST",
            data: {"id": id, "name": name},
            success: function(result) {
                switch (result) {
                    case "0":
                        this.setState({acceptError: "Please Login first"});
                        break;
                    case "1":
                        this.setState({acceptError: "Something wrong, try later"});
                        break;
                    case "2":
                        this.setState({acceptError: "You alreay have 50 friends"});
                        break;
                    case "3":
                        this.setState({acceptError: "He/She alreay have 50 friends"});
                        break;
                    case "4":
                        //add to friend list
                        let newFriends = this.state.friendList;
                        newFriends.unshift(this.state.applyList[index]);
                        //remove apply list
                        let newList = this.state.applyList;
                        newList.splice(index, 1);
                        this.setState({applyList: newList, friendList: newFriends, friendLength: this.state.friendLength + 1});
                }
            }.bind(this),
            error: function (err) {
                this.setState({acceptError: "Can't connect to server"});
            }.bind(this)
        });
    }
    //if user click load more friend
    moreFriend() {
        let newLength = ((this.state.friendLength + 5) < this.state.friendList.length)?(this.state.friendLength + 5):this.state.friendList.length;
        this.setState({friendLength: newLength});
    }
    //if user click delete message
    delMessage(index) {
        let delMessages = this.state.messageList;
        reqwest({
            url: "/message/delMessage",
            method: "POST",
            data: {"message": delMessages[index].message_id},
            success: function(result) {
                switch(result) {
                    case "0":
                        this.setState({messageError: "Please Login first", messageTarget: index});
                        break;
                    case "1":
                        delMessages.splice(index, 1);
                        this.setState({messageList: delMessages, messageTarget: null, messageError: null});
                        break;
                    case "2":
                        this.setState({messageError: "Can't delete message, try later", messageTarget: index});
                        break;
                }
            }.bind(this),
            error: function (err) {
                this.setState({messageError: "Can't connect to server", messageTarget: index});
            }.bind(this)
        });
    }
    //if user click read Message
    readMessage(index) {
        let readMessages = this.state.messageList;
        reqwest({
            url: "/message/readMessage",
            method: "POST",
            data: {
                "message": readMessages[index].message_id,
                "read": readMessages[index].message_read
            },
            success: function(result) {
                switch(result) {
                    case "0":
                        this.setState({messageError: "Please Login first", messageTarget: index});
                        break;
                    case "1":
                        if (readMessages[index].message_read === 1) {
                            readMessages[index].message_read = 0;
                        } else {
                            readMessages[index].message_read = 1;
                        }
                        this.setState({messageList: readMessages, messageTarget: null, messageError: null});
                        break;
                    case "2":
                        this.setState({messageError: "Can't update info, try later", messageTarget: index});
                        break;
                }
            }.bind(this),
            error: function (err) {
                this.setState({messageError: "Can't connect to server", messageTarget: index});
            }.bind(this)
        });
    }
	render() {
        let i;
        //show all messages
        let messages = [];
        for (i = 0; i < this.state.messageList.length; i++) {
            //show apply for friends message
            if (this.state.messageList[i].user_id) {
                if (this.state.messageList[i].message_read === 0) {
                    messages[i] = (
                        <div key={"thousandaymessagelist" + i} style={{backgroundColor:"white"}} className="main-message">
                            <div className="main-message-content">
                                <a href={"/user/" + this.state.messageList[i].user_id}>
                                    <img alt={this.state.messageList[i].user_name} src={"/img/user/" + this.state.messageList[i].user_id + ".jpg"} />
                                </a>
                                <h5>{this.state.messageList[i].user_name} wants to be your friends.</h5>
                            </div>
                            <h6>
                                {new Date(this.state.messageList[i].message_date).toISOString().substring(0, 10)}
                            </h6>
                            <h6 onClick={this.readMessage.bind(this, i)} className="main-message-action">Archive</h6>
                            <h6 onClick={this.delMessage.bind(this, i)} className="main-message-action">Delete</h6>
                            <h6 className="main-message-action">{(this.state.messageTarget === i)?this.state.messageError:null}</h6>
                        </div>
                    )
                } else {
                    messages[i] = (
                        <div key={"thousandaymessagelist" + i} style={{backgroundColor:"gray"}} className="main-message">
                            <div className="main-message-content">
                                <h5>{this.state.messageList[i].user_name} wants to be your friends.</h5>
                            </div>
                            <h6 onClick={this.readMessage.bind(this, i)} className="main-message-back">Unread</h6>
                            <h6 onClick={this.delMessage.bind(this, i)} className="main-message-back">Delete</h6>
                            <h6 className="main-message-back">{(this.state.messageTarget === i)?this.state.messageError:null}</h6>
                        </div>
                    )
                }
            } else if (this.state.messageList[i].friend_id) {
                //for become friend message
                if (this.state.messageList[i].message_read === 0) {
                    messages[i] = (
                        <div key={"thousandaymessagelist" + i} style={{backgroundColor:"white"}} className="main-message">
                            <div className="main-message-content">
                                <a href={"/user/" + this.state.messageList[i].friend_id}>
                                    <img alt={this.state.messageList[i].user_name} src={"/img/user/" + this.state.messageList[i].friend_id + ".jpg"} />
                                </a>
                                <h5>{this.state.messageList[i].user_name} and you are friends now, you can add him/her as your pets' relative or set their pets as your pets' companion.</h5>
                            </div>
                            <h6>
                                {new Date(this.state.messageList[i].message_date).toISOString().substring(0, 10)}
                            </h6>
                            <h6 onClick={this.readMessage.bind(this, i)} className="main-message-action">Archive</h6>
                            <h6 onClick={this.delMessage.bind(this, i)} className="main-message-action">Delete</h6>
                            <h6 className="main-message-action">{(this.state.messageTarget === i)?this.state.messageError:null}</h6>
                        </div>
                    )
                } else {
                    messages[i] = (
                        <div key={"thousandaymessagelist" + i} style={{backgroundColor:"gray"}} className="main-message">
                            <div className="main-message-content">
                                <h5>{this.state.messageList[i].user_name} and you are friends now ...</h5>
                            </div>
                            <h6 onClick={this.readMessage.bind(this, i)} className="main-message-back">Unread</h6>
                            <h6 onClick={this.delMessage.bind(this, i)} className="main-message-back">Delete</h6>
                            <h6 className="main-message-back">{(this.state.messageTarget === i)?this.state.messageError:null}</h6>
                        </div>
                    )
                }
            }
        }
        //show friends appliancts
        let applys = [];
        for (i = 0; i < this.state.applyList.length; i++) {
            if (this.state.friendList.length < 50) {
                applys[i] = (
                    <div key={"thousandaymessage" + i} className="aside-list">
                        <a href={"/user/" + this.state.applyList[i].user_id}>
                            <img alt="Applicant" src={"/img/user/" + this.state.applyList[i].user_id + ".jpg"} />
                        </a>
                        <h5>{this.state.applyList[i].user_name}</h5>
                        <h6 onClick={this.acceptApply.bind(this, i)}>Accept</h6>
                        <h6 onClick={this.delApply.bind(this, i)}>Delete</h6>
                    </div>
                )
            } else {
                applys[i] = (
                    <div key={"thousandaymessage" + i} className="aside-list">
                        <a href={"/user/" + this.state.applyList[i].user_id}>
                            <img alt="Applicant" src={"/img/user/" + this.state.applyList[i].user_id + ".jpg"} />
                        </a>
                        <h5>{this.state.applyList[i].user_name}</h5>
                        <h6 onClick={this.delApply.bind(this, i)}>Delete</h6>
                        <h7>{this.state.delError}</h7>
                    </div>
                )
            }
        }
        //show friend list
        let friends = [];
        for (i = 0; i < this.state.friendLength; i++) {
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
				<Header visitorId={this.props.visitorId} visitorName={this.props.visitorName} loginSuccess={()=>{}} logOut={this.logOut.bind(this)} unread={this.props.unread} />
                <main id="main">
                    <h2>Message Box</h2>
                    <section id="main-box">
                        {messages}
                    </section>
                </main>
                <aside id="aside">
                    <h4 id="aside-apply">Friend Requests</h4>
                    <h7>{this.state.acceptError}</h7>
                    {applys}
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
		switch (result) {
			case "0":
				console.log("Can't connect to db");
				break;
			default:
				ReactDOM.render(<Message visitorId={result[0]} visitorName={result[1]} friends={result[2]} applys={result[3]} messages={result[4]} unread={result[5]} />, document.getElementById("root"));
		}
	},
	error: function (err) {
		console.log("Can't connect to server");
	}
});