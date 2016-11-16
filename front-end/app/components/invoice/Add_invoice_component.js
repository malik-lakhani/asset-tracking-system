import React, {Component} from 'react'
import { textarea, Field, FieldArray, reduxForm } from 'redux-form'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-select/dist/react-select.css';
import './styles.css';

class Add_invoice extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inputs :[],
			data :[],
			serialNos : []
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addInputField = this.addInputField.bind(this);
		this.removeInputField = this.removeInputField.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleFieldsInvoice = this.handleFieldsInvoice.bind(this);
		this.handleInvoiceDateChange = this.handleInvoiceDateChange.bind(this);
		this.handleFieldsComponent = this.handleFieldsComponent.bind(this);
	}

	componentDidMount() {
		this.props.actions.fetchCatogories(false, this.props.dispatch);
	}

	handleFieldsInvoice(event) {
		this.props.actions.setFieldForInvoice(event.target.id, event.target.value);
	}

	handleFieldsComponent(event) {
		this.props.actions.setFieldForComponent(event.target.id, event.target.value);
	}

	handleDateChange(componentId, date) {
		let id = `date_${ componentId }`
		this.props.actions.setFieldForComponent(id, date);
	}

	handleInvoiceDateChange(date) {
		this.setState({startDate: date});
		let id = `Invoice_date`
		this.props.actions.setFieldForInvoice(id, date);
	}

	handleCategoryChange(componentId, event) {
		let id = `category_${ componentId }`
		this.props.actions.setFieldForComponent(id, event.value);
	}

	addInputField(e) {
		e.preventDefault();
		var inputs = this.state.inputs;
		inputs.push({name: null});
		this.setState({inputs : inputs});
	}

	removeInputField(index) {
		var inputs = this.state.inputs;
		inputs.splice(index, 1);
		this.setState({inputs : inputs});
	}

	handleSubmit(e) {
		e.preventDefault();

		let data = this.props.props.invoices
		if(data.invoicer == '') {
			return false;
		} else if(data.invoice_number == '') {
			return false;
		} else if(data.address == '') {
			return false;
		} else if(data.description == '') {
			return false;
		} else {
			this.props.actions.addInvoice(data)
		}
	}

	render() {
		//============styles========================================================

		let letterStyle = {
			border: 'solid',
			borderWidth: '2px',
			padding: '20px 25px 20px 100px'
		};

		let addComponent = {
			maxHeight: '100%',
			overflow: 'scroll'
		};

		let paddingTop = {
			paddingTop: '10px'
		}

		let setWidth = {
			width: '100%'
		}

		let block = {
			border: 'solid',
			borderWidth: '2px',
			padding: '20px 25px 20px 100px'
		}

		let selectcss = {
			width: '80%'
		}

		let setPaddingleft = {
			paddingLeft: '15px'
		}

	//============================================================================

		let invoiceDate = moment();
		if(this.props.props.invoices.Invoice_date) {
			invoiceDate = moment(this.props.props.invoices.Invoice_date);
		}

		let categories = [];
		for(let i = 0; i < this.props.props.category.AllCategories.length; i++){
			let ComponentInfo = { value : this.props.props.category.AllCategories[i].Id, label: this.props.props.category.AllCategories[i].Category };
			categories[i] = ComponentInfo;
		}
		let allInvoiceData = this.props.props.invoices.data;
		const { handleSubmit, pristine, reset, submitting } = this.props
		return (
			<div >
				<form onSubmit={ this.handleSubmit }>
					<button className="btn btn-info " >Save</button>
				</form>

				<div>
				<h2 className="center"> Add Invoice </h2>
				<div style={letterStyle}>
					<div className="clearfix form-group">
						<div className = "col-lg-2 col-lg-offset-2">
							<label >Invoice*</label>
							<input className="textboxSize" type="text" required={true} name="Invoice" id="invoice" onChange={ this.handleFieldsInvoice } placeholder="ex. 12MOUSE1811" />
						</div>
						<div className = "col-lg-2 col-lg-offset-2">
							<label >Invoicer*</label>
							<input className="textboxSize" type="text" name="Invoicer" id="invoicer" onChange={ this.handleFieldsInvoice } placeholder="ex. Jay systems" />
						</div>
					</div>
					<div className="clearfix form-group">
						<div className="col-lg-2 col-lg-offset-2">
							<label >Invoice Date*</label>
								<DatePicker className="textboxSize" name="Invoice_date" id="invoice_date" onChange={this.handleInvoiceDateChange} selected={ invoiceDate } dateFormat="DD/MM/YYYY" />
						</div>
						<div className = "col-lg-2 col-lg-offset-2">
							<label >Contact*</label>
							<input className="textboxSize" type="text" name="Contact" id="contact" onChange={ this.handleFieldsInvoice }  placeholder="ex. +91 9909970574" />
						</div>
					</div>
					<div className="clearfix form-group">
						<div className="col-lg-2 col-lg-offset-2">
							<label >Description</label>
							<textarea className="textAreaSize form-control" name="Description" id="description" onChange={ this.handleFieldsInvoice } placeholder="description"/>
						</div>
						<div className="col-lg-2 col-lg-offset-2">
							<label >Address</label>
							<textarea className="textAreaSize form-control" name="Address" id="address" onChange={ this.handleFieldsInvoice } placeholder="address"/>
						</div>
					</div>
				</div>
			</div>
			<br/>

				<div style={setWidth}>
					<label className="control-label text-center">Components </label>
					<button className="btn btn-success pull-right" onClick={this.addInputField}> Add Components </button>
					<br/>
					<br/>

					{this.state.inputs.map(function (input, index) {
						let date = moment(); // default date will shows today's date ...
						if (allInvoiceData[index] && allInvoiceData[index][`date_${index}`]) { // after change the date ...
							date = allInvoiceData[index][`date_${index}`];
						}

						let category;
						if (allInvoiceData[index] && allInvoiceData[index][`category_${index}`]) { // after change the date ...
							category = allInvoiceData[index][`category_${index}`];
						}

					//============== To Display add component ============================
						let ref = `input_${index}`;
						return (
							<div>
								<div style={block}>
									<div className="clearfix">
										<span className="pull-right" onClick={this.removeInputField.bind(this, index)} id={ref} ><button type="button" className="btn btn-danger btn-sm">Remove</button></span>
										<label style={paddingTop}> Component #{index + 1} </label>
									</div>
									<div>
										<div className="clearfix" style={setPaddingleft}>
											<input type="text" className="col-lg-2 textboxSize" onChange={ this.handleFieldsComponent} id={`serial_${index}`} componentId={index} placeholder="Serial" />
											<input type="text" className="col-lg-2 col-lg-offset-1 textboxSize" onChange={ this.handleFieldsComponent } id={`component_${index}`} placeholder="Component Name" />
											<DatePicker className="col-lg-2 col-lg-offset-1 textboxSize" id={`warrantyDate_${ index }`} selected={ date } onChange={this.handleDateChange.bind(this, index)} placeholder="Component Name"/>
										</div>
										<br/>
										<div className="clearfix">
											<Select className="col-lg-3 pull-left" style={ selectcss } id={`warrantyDate_${ index }`} value={ category } placeholder="Category" options={ categories } onChange={ this.handleCategoryChange.bind(this, index) }/>
											<div>
												<textarea className="textAreaSize1 col-lg-3" name="Address" id={`description_${index}`} onChange={ this.handleFieldsComponent } placeholder="Description"/>
											</div>
										</div>
									</div>
									<br/>
								</div>
								<br/>
							</div>
						)
					//====================================================================

					}.bind(this))}
				</div>
			</div>
		)
	}
}

export default reduxForm({
	form: 'Add_invoice',// a unique identifier for this form
})(Add_invoice)

