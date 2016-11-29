import React from  'react'
import Header from './header/Header';
import Footer from './footer/Footer';

var Main = React.createClass({
	render(){
		let padding1 = {
			paddingTop: "45px"
		}
		return  (
			<div className="main-container">

				<div>
					<Header />
				</div>

				<div className="container">
					{this.props.children}
				</div>

				<div style={padding1}>
					<Footer/>
				</div>

			</div>
		)
	}
});

export default Main
