import React, {Component} from 'react';
import Progress from '../snippet/display/Progress';
class Ability extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 18
        };
    }
    clickButton() {
        this.setState({progress:120});
    }
    render() {
        return(
            <section id="ability" className="right">
                <h4>Attack: 100</h4>
                <h4>Defend: 100</h4>
                <h4>Health: 100</h4>
                <h4>Cure: 100</h4>
                <h4>Swift: 100</h4>
                <h4>Lucky: 100</h4>
                <div>
                    <Progress progress={this.state.progress} max="103" width="30%" height="12px" />
                </div>
                <button type="button" value="submit" onClick={this.clickButton.bind(this)} />
            </section>
        );
    }
}
export default Ability;