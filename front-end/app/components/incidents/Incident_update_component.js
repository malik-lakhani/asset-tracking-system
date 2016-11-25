import React, {Component} from 'react'
import { textarea, Field, FieldArray, reduxForm } from 'redux-form'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Select from 'react-select';
import { Link } from 'react-router';
import { HelpBlock } from 'react-bootstrap'
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-select/dist/react-select.css';
import './styles.css';

class Add_incident_update extends Component {
	constructor(props) {
		super(props);
		this.state = {
			resolvedByErr: '',
			descErr: '',

			serialErr: '',
			component: ''
		};
		this.handleFields = this.handleFields.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleAddComponent = this.handleAddComponent.bind(this);
		this.handleWarrantyDateChange = this.handleWarrantyDateChange.bind(this);
	}

	componentDidMount() {
	}

	handleFields(event) {
		this.props.actions.setFieldValue(event.target.id, event.target.value);
	}

	handleAddComponent() {
		this.setState({resolvedByErr: ''});
		this.setState({serialErr: ''});
		this.setState({component: ''});
	}

	handleWarrantyDateChange(date) {
		let id = `warranty`
		this.props.actions.setFieldValue(id, date);
	}

	handleSubmit(e) {
		e.preventDefault(e);
		let updatedBy = this.props.state.incidents.updatedBy;
		let description = this.props.state.incidents.description;
		let incidentId = this.props.params.incidentId;

		this.setState({resolvedByErr: ''});
		this.setState({descErr: ''});
		let status = true;
		if(updatedBy == '' || updatedBy == undefined) {
			this.setState({resolvedByErr: '*Required'})
			status = false;
		}
		if(description == '') {
			this.setState({descErr: '*Required'})
			status = false;
		}
		if (status) {
			this.props.actions.addIncidentUpdate(incidentId, updatedBy, description)
		}
	}

	render() {
		let warrantyDate = moment();
		if(this.props.state.incidents.warranty) {
			warrantyDate = this.props.state.incidents.warranty;
		}

		//======================== style =============================================

		let letterStyle = {
			border: 'solid',
			borderWidth: '2px',
			padding: '15px'
		};

		let floatRight = {
			float: 'right',
			marginRight: '10px'
		}

		let textBoxWidth = {
			width: "400px",
			height: "30px"
		}

		let textAreaWidth = {
			width: "400px",
			height: "60px"
		}

		let errFontStyle = {
			color: 'red',
			fontWeight: 'bold'
		}

		//============================================================================

		return (
			<div>

			{/*================= Model for add replacement component .... =========*/}
				<div id="addReplacedComponent" className="modal fade" role="dialog">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal">&times;</button>
								<h4 className="modal-title center">Add Component</h4>
							</div>
							<div className="modal-body">
								<input type="text" name="ResolvedBy" id="resolvedBy" placeholder="Resolved By" onChange={ this.handleFields } style= { textBoxWidth }/>
							</div>
							<div className="modal-body">
								<input type="text" name="SerialNo" id="serialNo" placeholder="Serial No." onChange={ this.handleFields } style= { textBoxWidth }/>
							</div>
							<div className="modal-body">
								<input type="text" name="Component" id="component" placeholder="Component Name" onChange={ this.handleFields } style= { textBoxWidth }/>
							</div>
							<div className="modal-body">
								<DatePicker className="textboxSize" name="Warranty" id="warranty" selected={ warrantyDate } onChange={this.handleWarrantyDateChange} />
							</div>
							<div className="modal-body">
								<textarea name="Description" id="description" style= { textAreaWidth } onChange={ this.handleFields } placeholder="Description"/>
							</div>
							<div className="modal-footer">
								<form onSubmit={ this.handleSubmit } >
									<button type="submit" id="changeMachine" className="btn btn-success" >Resolved</button>
									<button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			{/* ======================================================================*/}

				<div>
					<form onSubmit={ this.handleSubmit }>
						<button className="btn btn-info" style={ floatRight }>Save</button>
					</form>
					<form>
						<button className="btn btn-success" style={ floatRight }>Resolved</button>
					</form>
					<button className="btn btn-warning" data-toggle="modal" data-target="#addReplacedComponent" style={ floatRight }>Add Replacement Component</button>
				</div>

					<div>
					<h3>Add update to Incident # { this.props.params.incidentId } </h3>
					<div style={letterStyle}>
						<div className="clearfix form-group">
							<div className="col-lg-offset-1">
								<label>Updated By :</label>
							</div>
							<div className="col-lg-offset-1">
								<input type="text" name="UpdateBy" id="updatedBy" value={this.props.state.incidents.updateBy} onChange={ this.handleFields } placeholder="update by" style= { textBoxWidth }/>
								<HelpBlock style={ errFontStyle }> {this.state.resolvedByErr} </HelpBlock>
							</div>
						</div>
						<div className="clearfix form-group">
							<div className="col-lg-offset-1">
								<label >Description :</label>
							</div>
							<div className="col-lg-offset-1">
								<textarea name="Description" id="description" onChange={ this.handleFields } placeholder="description" style= { textAreaWidth } />
								<HelpBlock style={ errFontStyle }> {this.state.descErr} </HelpBlock>
							</div>
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

