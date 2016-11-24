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
		this.props.actions.fetchIncidentInfo(this.props.params.incidentId)
	}

	render() {
		//======================== style =============================================
		let letterStyle = {
			border: 'solid',
			borderWidth: '2px',
			padding: '20px 25px 0px 100px'
		};

		let errFontStyle = {
			color: 'red'
		}

		let floatRight = {
			float: 'right'
		}
		//============================================================================

		let Recorder = '';
		let Status = 'Resolved';
		let Description = '';
		let Component = ''
		if(this.props.state.incidents.Incidents.Component) {
			Recorder = this.props.state.incidents.Incidents.Recorder
			Description = this.props.state.incidents.Incidents.Description
			Component = this.props.state.incidents.Incidents.Component
			if(this.props.state.incidents.Incidents.Status == 'active') {
				Status = "Active"
			}
		}

		const { handleSubmit, pristine, reset, submitting } = this.props
		return (
			<div>
				<div>
					<form onSubmit={ this.handleSubmit }>
						<button className="btn btn-info" style={ floatRight }>Add Update</button>
					</form>
				</div>

					<div>
					<h3 className="center"><u> Incident #{ this.props.params.incidentId} </u></h3>
					<div style={letterStyle}>
						<div className="clearfix form-group">
							<div className = "col-lg-2 col-lg-offset-1">
								<label>Status :</label>
							</div>
							<div className = "col-lg-2">
								{ Status }
							</div>
						</div>
						<div className="clearfix form-group">
							<div className="col-lg-2 col-lg-offset-1">
								<label >Recorder :</label>
							</div>
							<div className = "col-lg-2">
								{ Recorder }
							</div>
						</div>
						<div className="clearfix form-group">
							<div className="col-lg-2 col-lg-offset-1">
								<label >Component :</label>
							</div>
							<div className = "col-lg-2">
								{ Component }
							</div>
						</div>
						<div className="clearfix form-group">
							<div className="col-lg-2 col-lg-offset-1">
								<label >Description :</label>
							</div>
							<div className="col-lg-8">
								{ Description }
							</div>
						</div>
					</div>
				</div>

				<h3 className="center"> Updates </h3>

						<div style={letterStyle}>
						<div className="clearfix form-group">
							<div className = "col-lg-2 col-lg-offset-1">
								<label >Status :</label>
							</div>
							<div className = "col-lg-2">
								<label >Resolved</label>
							</div>
						</div>
					</div>

			</div>
		)
	}
}

export default reduxForm({
	form: 'Add_incident',// a unique identifier for this form
})(Add_incident)

