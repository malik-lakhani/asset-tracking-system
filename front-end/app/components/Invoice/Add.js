import React, {Component} from 'react'
import { textarea, Field, FieldArray, reduxForm } from 'redux-form'
import request from 'superagent';
import {renderField, rendreTextArea, renderComponents} from '../../fields/fields'


const validate = values => {
	const errors = {}
	if(!values.Invoice_Number) {
		errors.Invoice_Number = 'Required'
	}
	if(!values.Invoicer_Name) {
		errors.Invoicer_Name = 'Required'
	}
	if(!values.Invoicer_Address) {
		errors.Invoicer_Address = 'Required'
	}
	if(!values.Invoicer_Contact) {
		errors.Invoicer_Contact = 'Required'
	}
	if(!values.Date) {
		errors.Date = 'Required'
	}
	if(!values.Description) {
		errors.Description = 'Required'
	}


	// if (!values.component || !values.component.length) {
	//   errors.Component = { _error: 'At least one component must be entered' }
	// } else {
	//   const componentsArrayErrors = []
	//   values.component.forEach((component, componentIndex) => {
			// const componentErrors = {}
	//     if (!component || !component.name) {
	//       componentErrors.name = 'Required'
	//       componentsArrayErrors[componentIndex] = componentErrors
	//     }
	//     if (!component || !component.serialNo) {
	//       componentErrors.serialNo = 'Required'
	//       componentsArrayErrors[componentIndex] = componentErrors
	//     }
	//     return componentErrors
	//   })
	//   if(componentsArrayErrors.length) {
	//     errors.component = componentsArrayErrors
	//   }
	// }
	return errors
}

class addInvoice extends Component {
	constructor(props) {
		super(props);
		this.handleState = this.handleState.bind(this);
		this.handleFields = this.handleFields.bind(this);
	}

	componentWillMount() {
	 //console.log(this)
	}

	handleState(e) {
		validate
		// Wrap up all details in object ...
		let invoicer_details = {};// invoicer's details ...
		invoicer_details['name'] = this.props.props.main.invoicer_name;
		invoicer_details['contact'] = this.props.props.main.invoicer_contact;
		invoicer_details['address'] = this.props.props.main.invoicer_address;

		let component_details = {};//component's Details ...
		component_details['serial_no'] = ['aaaa', 'bbbb'];
		component_details['name'] = ['mouse', 'motherboard'];
		component_details['warranty_till'] = ['11/12/1994', '11/11/1995'];
		component_details['description'] = ['Nothing', 'Nothing'];

		let invoice = {
			invoicer_details: invoicer_details,

		};//all details of invoice ...
		invoice['invoicer_details'] = invoicer_details;
		invoice['component_details'] = component_details;
		invoice['number'] = this.props.props.main.invoice_number;
		invoice['date'] = this.props.props.main.invoice_date;
		invoice['description'] = this.props.props.main.invoice_description;

		request
			.post("http://localhost:8000/invoices")
			.send(invoice)
			.set('Accept', 'application/json')
			.end(function(err, res){
				if(err != null){
					console.log(err);
				} else {
					location.href="http://localhost:8080/public/#/invoices/?_k=ycsmgk";
				}
		});

		// this.props.actions.addInvoice(invoice);//pass all details of invoice to action ...
	}

	handleFields(e) {
		this.props.actions.setFieldValue(e.target.id, e.target.value);
	}

	render() {
		const { handleSubmit, pristine, reset, submitting } = this.props
		return (
			<div>
			<h1 className="center heading">Add Invoice</h1>
				<div className="well well-lg ">
					<form onSubmit={handleSubmit(this.handleState)} className="form-inline">
						<span >
							<Field name="Invoice_Number" value={this.props.props.main.invoice_number} type="text" id="invoice_number" onChange={this.handleFields} component={renderField} label="Invoice Number : " placeholder="Invoice Number" />
							<Field name="Invoicer_Name" value={this.props.props.main.invoicer_name} type="text" value="ashvin" id="invoicer_name" onChange={this.handleFields} component={renderField} label="Invoicer Name : " placeholder="Invoicer Name" />
						</span>
						<br></br>
						<span>
							<Field name="Date" value={this.props.props.main.invoice_date}  type="date" id="invoice_date" component={renderField} onChange={this.handleFields} label="Date :" placeholder="Invoice Date" />
							<Field name="Invoicer_Contact" value={this.props.props.main.invoice_contact} id="invoicer_contact" type="text" component={renderField} onChange={this.handleFields} label="Invoicer Contact : " placeholder="Invoicer Contact" />
						</span>
						<br></br>
						<br></br>
						<span>
							<Field name="Description" value={this.props.props.main.invoice_description} component={rendreTextArea} label="Description : " id="invoice_description" onChange={this.handleFields} placeholder="Description" />
							<Field name="Invoicer_Address" value={this.props.props.main.invoicer_address} component={rendreTextArea} id="invoicer_address" onChange={this.handleFields} label="Invoicer Address : " placeholder="Invoicer Address" />
						</span>
						<br/>
							<FieldArray name="Component" component={renderComponents}/>
						<div>
							<button type="submit" disabled={submitting} >Submit</button>
							<button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default reduxForm({
	form: 'AddInvoice',// a unique identifier for this form
	validate,
})(addInvoice)
