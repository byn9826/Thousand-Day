import React, {Component} from 'react';
import Rate from '../ui/rate/Rate';
import Editit from '../ui/editit/Editit';
class Item extends Component{
    constructor(props){
		super(props);
		this.state={
            value:this.props.value,
            comment:this.props.comment
		};
	}
    editContent(newContent,thisid){
        console.log(newContent);
        console.log(thisid);
    }
    changeProgress(){
		let current = this.state.progress;
		this.setState({progress:parseFloat(current)+0.2});
	}
    render(){
        let values = this.state.value;
        for(var i=0;i<this.state.value.length;i++){
            values[i].comment = this.state.comment[i];
        }
        let items = values.map(
			(item)=>(
                <section key={"keyforvalues"+item.id} className="main-item">
                    <div className="main-item-about">
                        <img alt={item.title} src={"/img/value/" + item.id + ".jpg"} />
                        <div>
                            <h4><b>{item.title}</b></h4>
                            <Rate rate={Math.floor(item.stars/item.count)} length="5" />
                            <h5>Rate: {(item.stars/item.count).toFixed(1)} by {item.count} people</h5>
                            <h5>Type: {item.type}</h5>
                            <h5>Author: {item.author}</h5>
                        </div>
                        <h5>Days: {item.days}</h5>
                    </div>
                    <Editit name={item.id} content={item.comment} front="Note: " max="72" edit={this.editContent.bind(this)} />
                </section>
		    )
		);
		return(
			<div id="main-item">
                <input type="button" width="50%" onClick={this.changeProgress.bind(this)} value="Complete 20%" />
				{items}
			</div>
		)
	}
};
export default Item;