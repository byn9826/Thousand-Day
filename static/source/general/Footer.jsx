import React, {Component} from 'react';
class Footer extends Component{
	render(){
    let footer = {
      float:"left",
      width:"100%",
      backgroundColor:"black",
      height:"40px",
      marginTop:"40px"
    };
    let footerContent = {
      float:"left",
      marginLeft:"10%",
      color:"white",
      fontSize:"11px",
      fontFamily:"Arial, Helvetica, sans-serif",
      lineHeight:"40px",
      verticalAlign:"middle"
    };
		return(
			<footer style={footer}>
        <h6 style={footerContent}>
          Copyright 2016-2017 Thousanday All Rights Reserved.
        </h6>
			</footer>
		)
	}
};
export default Footer;
