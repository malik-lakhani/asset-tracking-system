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

			updateByErr: '',
			serialErr: '',
			componentErr: '',
			categoryErr: ''
		};
		this.handleFields = this.handleFields.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleAddComponent = this.handleAddComponent.bind(this);
		this.handleWarrantyDateChange = this.handleWarrantyDateChange.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleResolveIncident = this.handleResolveIncident.bind(this);
	}

	componentDidMount() {
		this.props.actions.fetchCatogories(false, this.props.dispatch);
	}

	handleFields(event) {
		this.props.actions.setFieldValue(event.target.id, event.target.value);
	}

	handleResolveIncident(e) {
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
		if(status) {
			this.props.actions.resolveIncident(incidentId, updatedBy, description)
		}
	}

	handleAddComponent(e) {
		e.preventDefault(e);

		//=====validation of add component =========================================

		let resolvedBy = this.props.state.incidents.resolvedBy;
		let serial = this.props.state.incidents.serialNo;
		let component = this.props.state.incidents.component;
		let category = this.props.state.incidents.category;
		let description = this.props.state.incidents.description;

		this.setState({updateByErr: ''});
		this.setState({serialErr: ''});
		this.setState({componentErr: ''});
		this.setState({categoryErr: ''});

		let status = true;
		if(resolvedBy == '' || resolvedBy == undefined) {
			this.setState({updateByErr: '*Required'})
			status = false;
		}
		if(serial == '' || serial == undefined) {
			this.setState({serialErr: '*Required'})
			status = false;
		}
		if(component == '' || component == undefined) {
			this.setState({componentErr: '*Required'})
			status = false;
		}
		if(category == '' || category == undefined) {
			this.setState({categoryErr: '*Required'})
			status = false;
		}

		//==========================================================================

		if (status) {
			// this.props.actions.addIncidentUpdate(incidentId, updatedBy, description)
		}
	}

	handleWarrantyDateChange(date) {
		let id = `warranty`
		this.props.actions.setFieldValue(id, date);
	}

	handleCategoryChange(event) {
		this.setState({category: event.label});
		let id = `category`
		this.props.actions.setFieldValue(id, event.value);
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

		let categories = [];
		for(let i = 0; i < this.props.state.category.AllCategories.length; i++){
			let ComponentInfo = { value : this.props.state.category.AllCategories[i].Id, label: this.props.state.category.AllCategories[i].Category };
			categories[i] = ComponentInfo;
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

		let selectcss ={
			width: '70%'
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
		console.log("this.props", this.props)
		let category;
		if (this.props.state.incidents.category) { // after change the category ...
			category = this.props.state.incidents.category;
		}

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
								<HelpBlock style={ errFontStyle }> {this.state.updateByErr} </HelpBlock>
							</div>
							<div className="modal-body">
								<input type="text" name="SerialNo" id="serialNo" placeholder="Serial No." onChange={ this.handleFields } style= { textBoxWidth }/>
								<HelpBlock style={ errFontStyle }> {this.state.serialErr} </HelpBlock>
							</div>
							<div className="modal-body">
								<input type="text" name="Component" id="component" placeholder="Component Name" onChange={ this.handleFields } style= { textBoxWidth }/>
								<HelpBlock style={ errFontStyle }> {this.state.componentErr} </HelpBlock>
							</div>
							<div className="modal-body">
								<Select style={selectcss} id={`category`} value={ category } placeholder="Category" options={ categories } onChange={ this.handleCategoryChange }/>
								<HelpBlock style={ errFontStyle }> {this.state.categoryErr} </HelpBlock>
							</div>
							<div className="modal-body">
								<DatePicker className="textboxSize" name="Warranty" id="warranty" selected={ warrantyDate } onChange={this.handleWarrantyDateChange} />
							</div>
							<div className="modal-body">
								<textarea name="Description" id="description" style= { textAreaWidth } onChange={ this.handleFields } placeholder="Description"/>
							</div>
							<div className="modal-footer">
								<form onSubmit={ this.handleAddComponent } >
									<button type="submit" id="changeMachine" className="btn btn-success" >Resolved</button>
									<button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
								</form>
							</div>
						</div>
					</div>
				</div>

			{/* ====================================================================*/}

				<div>
					<form onSubmit={ this.handleSubmit }>
						<button className="btn btn-info" style={ floatRight }>Save</button>
					</form>
					<form onSubmit={ this.handleResolveIncident }>
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

