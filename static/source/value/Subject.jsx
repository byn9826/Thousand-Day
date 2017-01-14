import React, {Component} from 'react';
import {stage} from '../../js/getExpertise.js';
class Subject extends Component {
    render(){
        //get lists of subjects the material belong to
        let subjects = this.props.data.sub.map(
            (subject)=>(
                <div className="div-dashed" key={subject.name}>
                    <h5>
                        {subject.name}<br/>
                        for {stage(subject.stage)}
                    </h5>
                </div>
            )
        );
        return(
            <section id="main-subject">
                <h4>
                    Belongs to subjects:
                </h4>
                {subjects}
            </section>
        )
    }
};
export default Subject;