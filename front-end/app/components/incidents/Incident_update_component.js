import React, {Component} from 'react'
import { textarea, Field, FieldArray, reduxForm } from 'redux-form'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Select from 'react-select';
import { Link } from 'react-router';
import { HelpBlock } from 'react-bootstrap'
import 'react-select/dist/react-select.css';
import './styles.css';

class Add_incident_update extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
	}

	handleSubmit() {

	}

	render() {
		//======================== style =============================================

		let letterStyle = {
			border: 'solid',
			borderWidth: '2px',
			padding: '15px'
		};

		//============================================================================

		return (
			<div>
				<div>
					<form onSubmit={ this.handleSubmit }>
						<Link to={`incidents/update`} > <button className="btn btn-info" style={ floatRight }>Save</button> </Link>
					</form>
				</div>

					<div>
					<h3 className="center"><u> Incident #{ this.props.params.incidentId} </u></h3>
					<div style={letterStyle}>
						<div className="clearfix">
							<div className = "col-lg-2 col-lg-offset-1">
								<label>Status :</label>
							</div>
							<div className = "col-lg-2" style={ FontStyle }>
								{ Status }
							</div>
						</div>
						<div className="clearfix">
							<div className="col-lg-2 col-lg-offset-1">
								<label >Recorder :</label>
							</div>
							<div className = "col-lg-2" style={ FontStyle }>
								{ Recorder }
							</div>
						</div>
						<div className="clearfix">
							<div className="col-lg-2 col-lg-offset-1">
								<label >Component :</label>
							</div>
							<div className = "col-lg-2" style={ FontStyle }>
								{ Component }
							</div>
						</div>
						<div className="clearfix form-group">
							<div className="col-lg-2 col-lg-offset-1">
								<label >Description :</label>
							</div>
							<div className="col-lg-8" style={ FontStyle }>
								{ Description }
							</div>
						</div>
					</div>
				</div>
		)
	}
}

export default reduxForm({
	form: 'Add_incident_update',// a unique identifier for this form
})(Add_incident_update)

