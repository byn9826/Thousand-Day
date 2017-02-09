import React, {Component} from 'react';
import Progress from '../snippet/display/Progress';
class Ability extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attack: 50
        };
    }
    clickButton() {
        this.setState({progress:120});
    }
    render() {
        return(
            <section id="ability" className="right">
                <h5>Attack</h5><Progress progress={this.state.attack} max="100" width="30%" height="12px" />
                <h5>Defend</h5><Progress progress={this.state.attack} max="100" width="30%" height="12px" />
                <h5>Health</h5><Progress progress={this.state.attack} max="100" width="30%" height="12px" />
                <h5>Cure</h5><Progress progress={this.state.attack} max="100" width="30%" height="12px" />
                <h5>Swift</h5><Progress progress={this.state.attack} max="100" width="30%" height="12px" />
                <h5>Lucky</h5><Progress progress={this.state.attack} max="100" width="30%" height="12px" />
            </section>
        );
    }
}
export default Ability;