import React, {Component} from "react";
class InlineAnimation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: this.props.style,
            stage: 0,
            trigger: 0,
            steps: parseInt(this.props.steps) || 20,
            timer: parseInt(this.props.timer) || 10,
            count: 0,
            deg: parseInt(this.props.deg) || 0,
            top: parseFloat(this.props.style.top.replace("px", "")) || 0,
            left: parseFloat(this.props.style.left.replace("px", "")) || 0,
            width: parseFloat(this.props.style.width.replace("px", "")) || null,
            height: parseFloat(this.props.style.height.replace("px", "")) || null,
            opacity: parseFloat(this.props.style.opacity) || 1
        };
    }
    componentDidUpdate() {
        if (this.state.stage <= this.state.steps + 1 && this.state.trigger < this.state.stage) {
            switch (this.props.action) {
                case "rotate":
                    setTimeout(this.rotate.bind(this), this.state.timer);
                    break;
                case "vertical":
                    setTimeout(this.vertical.bind(this), this.state.timer);
                    break;
                case "horizontal":
                    setTimeout(this.horizontal.bind(this), this.state.timer);
                    break;
                case "fade":
                    setTimeout(this.fade.bind(this), this.state.timer);
                    break;
                case "scale":
                    setTimeout(this.scale.bind(this), this.state.timer);
                    break;
                case "move":
                    setTimeout(this.move.bind(this), this.state.timer);
                    break;
            }
        }
    }
    trigger() {
        this.setState({stage: 1, trigger:0});
    }
    rotate() {
        let style = this.state.style;
        let stage = this.state.stage + 1;
        let progress;
        if (this.state.stage > 0 && this.state.stage < this.state.steps) {
            switch (this.props.direction) {
                case "left":
                    progress = - (parseFloat(this.props.destiny) / parseInt(this.state.steps)) * this.state.stage + this.state.deg;
                    break;
                case "right":
                    progress = (parseFloat(this.props.destiny) / parseInt(this.state.steps)) * this.state.stage + this.state.deg;
                    break;
            }
            style.transform = "rotate(" + progress + "deg)";
            this.setState({style: style, stage: stage, trigger: stage-1});
        } else if (this.state.stage === this.state.steps) {
            switch (this.props.direction) {
                case "left":
                    progress = - parseInt(this.props.destiny) + this.state.deg;
                    break;
                case "right":
                    progress = parseInt(this.props.destiny) + this.state.deg;
                    break;
            }
            style.transform = "rotate(" + progress + "deg)";
            this.setState({style: style, stage: stage, trigger: stage-1});
        } else {
            let deg;
            switch (this.props.direction) {
                case "left":
                    deg = this.state.deg - parseInt(this.props.destiny);
                    break;
                case "right":
                    deg = this.state.deg + parseInt(this.props.destiny);
                    break;
            }
            let count = this.state.count + 1;
            this.setState({deg: deg, stage: stage, count: count, trigger: stage-1});
        }
    }
    vertical() {
        let style = this.state.style;
        let stage = this.state.stage + 1;
        let progress;
        if (this.state.stage > 0 && this.state.stage < this.state.steps) {
            switch (this.props.direction) {
                case "top":
                    progress = - (parseFloat(this.props.destiny) / parseInt(this.state.steps)) * this.state.stage + this.state.top;
                    break;
                case "bottom":
                    progress = (parseFloat(this.props.destiny) / parseInt(this.state.steps)) * this.state.stage + this.state.top;
                    break;
            }
            style.top = progress + "px";
            this.setState({style: style, stage: stage, trigger: stage-1});
        } else if (this.state.stage === this.state.steps) {
            switch (this.props.direction) {
                case "top":
                    progress = - parseInt(this.props.destiny) + this.state.top;
                    break;
                case "bottom":
                    progress = parseInt(this.props.destiny) + this.state.top;
                    break;
            }
            style.top = progress + "px";
            this.setState({style: style, stage: stage, trigger: stage-1});
        } else {
            let top;
            switch (this.props.direction) {
                case "top":
                    top = this.state.top - parseInt(this.props.destiny);
                    break;
                case "bottom":
                    top = this.state.top + parseInt(this.props.destiny);
                    break;
            }
            let count = this.state.count + 1;
            this.setState({top: top, stage: stage, count: count, trigger: stage-1});
        }
    }
    horizontal() {
        let style = this.state.style;
        let stage = this.state.stage + 1;
        let progress;
        if (this.state.stage > 0 && this.state.stage < this.state.steps) {
            switch (this.props.direction) {
                case "left":
                    progress = - (parseFloat(this.props.destiny) / parseInt(this.state.steps)) * this.state.stage + this.state.left;
                    break;
                case "right":
                    progress = (parseFloat(this.props.destiny) / parseInt(this.state.steps)) * this.state.stage + this.state.left;
                    break;
            }
            style.left = progress + "px";
            this.setState({style: style, stage: stage, trigger: stage-1});
        } else if (this.state.stage === this.state.steps) {
            switch (this.props.direction) {
                case "left":
                    progress = - parseInt(this.props.destiny) + this.state.left;
                    break;
                case "right":
                    progress = parseInt(this.props.destiny) + this.state.left;
                    break;
            }
            style.left = progress + "px";
            this.setState({style: style, stage: stage, trigger: stage-1});
        } else {
            let left;
            switch (this.props.direction) {
                case "left":
                    left = this.state.left - parseInt(this.props.destiny);
                    break;
                case "right":
                    left = this.state.left + parseInt(this.props.destiny);
                    break;
            }
            let count = this.state.count + 1;
            this.setState({left: left, stage: stage, count: count, trigger: stage-1});
        }
    }
    fade() {
        let style = this.state.style;
        let stage = this.state.stage + 1;
        let progress;
        if (this.state.stage > 0 && this.state.stage < this.state.steps) {
            switch (this.props.direction) {
                case "out":
                    progress = - (parseFloat(this.props.destiny) / parseInt(this.state.steps)) * this.state.stage + this.state.opacity;
                    break;
                case "in":
                    progress = (parseFloat(this.props.destiny) / parseInt(this.state.steps)) * this.state.stage + this.state.opacity;
                    break;
            }
            if (style.opacity >= 0 && style.opacity <= 1) {
                style.opacity = progress;
            }
            this.setState({style: style, stage: stage, trigger: stage-1});
        } else if (this.state.stage === this.state.steps) {
            switch (this.props.direction) {
                case "out":
                    progress = - parseInt(this.props.destiny) + this.state.opacity;
                    break;
                case "in":
                    progress = parseInt(this.props.destiny) + this.state.opacity;
                    break;
            }
            if (style.opacity >= 0 && style.opacity <=1) {
                style.opacity = progress;
            } else if (style.opacity < 0) {
                style.opacity = 0;
            } else if (style.opacity > 1) {
                style.opacity = 1;
            }
            this.setState({style: style, stage: stage, trigger: stage-1});
        } else {
            let opacity;
            switch (this.props.direction) {
                case "out":
                    opacity = this.state.opacity - parseInt(this.props.destiny);
                    if (opacity < 0) {
                        opacity = 0;
                    } else if (opacity > 1) {
                        opacity = 1;
                    }
                    break;
                case "in":
                    opacity = this.state.opacity + parseInt(this.props.destiny);
                    if (opacity < 0) {
                        opacity = 0;
                    } else if (opacity > 1) {
                        opacity = 1;
                    }
                    break;
            }
            let count = this.state.count + 1;
            this.setState({opacity: opacity, stage: stage, count: count, trigger: stage-1});
        }
    }
    scale() {
        let style = this.state.style;
        let stage = this.state.stage + 1;
        let left, top, width, height;
        if (this.state.stage > 0 && this.state.stage < this.state.steps) {
            switch (this.props.direction) {
                case "up":
                    left = - ((parseFloat(this.props.destiny) * this.state.width / 2) / parseInt(this.state.steps)) * this.state.stage + this.state.left;
                    top = - ((parseFloat(this.props.destiny) * this.state.height / 2) / parseInt(this.state.steps)) * this.state.stage + this.state.top;
                    width = ((parseFloat(this.props.destiny) * this.state.width) / parseInt(this.state.steps)) * this.state.stage + this.state.width;
                    height = ((parseFloat(this.props.destiny) * this.state.height) / parseInt(this.state.steps)) * this.state.stage + this.state.height;
                    break;
                case "down":
                    left = ((parseFloat(this.props.destiny) * this.state.width / 2) / parseInt(this.state.steps)) * this.state.stage + this.state.left;
                    top = ((parseFloat(this.props.destiny) * this.state.height / 2) / parseInt(this.state.steps)) * this.state.stage + this.state.top;
                    width = - (parseFloat(this.props.destiny) * this.state.width / parseInt(this.state.steps)) * this.state.stage + this.state.width;
                    height = - (parseFloat(this.props.destiny) * this.state.height / parseInt(this.state.steps)) * this.state.stage + this.state.height;
                    break;
            }
            style.left = left + "px";
            style.top = top + "px";
            style.width = width + "px";
            style.height = height + "px";
            this.setState({style: style, stage: stage, trigger: stage-1});
        } else if (this.state.stage === this.state.steps) {
            switch (this.props.direction) {
                case "up":
                    left = - (parseFloat(this.props.destiny) * this.state.width / 2) + this.state.left;
                    top = - (parseFloat(this.props.destiny) * this.state.height / 2) + this.state.top;
                    width = parseFloat(this.props.destiny) * this.state.width + this.state.width;
                    height = parseFloat(this.props.destiny) * this.state.height + this.state.height;
                    break;
                case "down":
                    left = (parseFloat(this.props.destiny) * this.state.width / 2) + this.state.left;
                    top = (parseFloat(this.props.destiny) * this.state.height / 2) + this.state.top;
                    width = - parseFloat(this.props.destiny) * this.state.width + this.state.width;
                    height = - parseFloat(this.props.destiny) * this.state.height + this.state.height;
                    break;
            }
            style.left = left + "px";
            style.top = top + "px";
            style.width = width + "px";
            style.height = height + "px";
            this.setState({style: style, stage: stage, trigger: stage-1});
        } else {
            switch (this.props.direction) {
                case "up":
                    left = - (parseFloat(this.props.destiny) * this.state.width / 2) + this.state.left;
                    top = - (parseFloat(this.props.destiny) * this.state.height / 2) + this.state.top;
                    width = parseFloat(this.props.destiny) * this.state.width + this.state.width;
                    height = parseFloat(this.props.destiny) * this.state.height + this.state.height;
                    break;
                case "down":
                    left = (parseFloat(this.props.destiny) * this.state.width / 2) + this.state.left;
                    top = (parseFloat(this.props.destiny) * this.state.height / 2) + this.state.top;
                    width = - parseFloat(this.props.destiny) * this.state.width + this.state.width;
                    height = - parseFloat(this.props.destiny) * this.state.height + this.state.height;
                    break;
            }
            let count = this.state.count + 1;
            this.setState({left: left, top: top, height: height, width: width, stage: stage, count: count, trigger: stage-1});
        }
    }
    move() {
        let style = this.state.style;
        let stage = this.state.stage + 1;
        let left, top;
        if (this.state.stage > 0 && this.state.stage < this.state.steps) {
            switch (this.props.direction) {
                case "center":
                    left = - ((this.state.left - this.props.destiny[0] + (this.state.width / 2)) / parseInt(this.state.steps)) * this.state.stage + this.state.left;
                    top = - ((this.state.top - this.props.destiny[1] + (this.state.height / 2)) / parseInt(this.state.steps)) * this.state.stage + this.state.top;
                    break;
            }
            style.left = left + "px";
            style.top = top + "px";
            this.setState({style: style, stage: stage, trigger: stage-1});
        } else if (this.state.stage === this.state.steps) {
            switch (this.props.direction) {
                case "center":
                    left = this.props.destiny[0] - this.state.width / 2;
                    top = this.props.destiny[1] - this.state.height / 2;
                    break;
            }
            style.left = left + "px";
            style.top = top + "px";
            this.setState({style: style, stage: stage, trigger: stage-1});
        } else {
            switch (this.props.direction) {
                case "center":
                    left = this.props.destiny[0] - this.state.width / 2;
                    top = this.props.destiny[1] - this.state.height / 2;
                    break;
            }
            let count = this.state.count + 1;
            this.setState({left: left, top: top, stage: stage, count: count, trigger: stage-1});
        }
    }
    render() {
        let newStyle = JSON.parse(JSON.stringify(this.state.style));
        let container;
        if (this.props.restrict && this.props.restrict <= this.state.count) {
            container = React.cloneElement(this.props.component, {style: newStyle, animation: () => {void 0;}});
        } else {
            container = React.cloneElement(this.props.component, {style: newStyle, animation: this.trigger.bind(this)});
        }
		return container;
	}
}
export default InlineAnimation;