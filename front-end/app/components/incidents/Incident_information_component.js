import React, {Component} from 'react'
import { textarea, Field, FieldArray, reduxForm } from 'redux-form'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Select from 'react-select';
import { HelpBlock } from 'react-bootstrap'
import 'react-select/dist/react-select.css';
import './styles.css';

class Add_incident extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {

	}

	render() {
		alert('called')
		console.log("-->",this.props)
	//======================== style =============================================

		let letterStyle = {
			border: 'solid',
			borderWidth: '2px',
			padding: '20px 25px 20px 100px'
		};

		let errFontStyle = {
			color: 'red'
		}

	//============================================================================


		const { handleSubmit, pristine, reset, submitting } = this.props
		return (
				<div className="center"><h1> Incident #{this.props.params.incidentId} </h1></div>
		)
	}
}

export default reduxForm({
	form: 'Add_incident',// a unique identifier for this form
})(Add_incident)

