import React, {Component} from 'react';
import Random from '../ui/random/Random';
class Header extends Component{
	render(){
    let header = {
			display: "inline-block",
		  width: "100%",
		  backgroundColor: "#1d4077",
		  color: "white",
			borderBottom: "1px solid #656c77",
		  height: "50px",
    };
    let headerLogo = {
			float: "left",
		  marginLeft: "10%",
		  marginTop: "5px",
		  height:"40px"
    };
		let headerSection = {
			float: "right",
			marginRight: "15%",
			lineHeight:"50px",
			verticalAlign:"middle",
			textDecoration:"none",
			color:"white"
		};
		let randomContent = ["For those who never give up learning","Show the power of learning"];
		return(
			<header style={header}>
				<img src="/img/thousanday-logo2.png" alt="thousanday-logo" style={headerLogo} />
				<Random random={randomContent} font="h3" id="header-slogan"/>
				<a style={headerSection} href="/"><h2>Home</h2></a>
			</header>
		)
	}
};
export default Header;
