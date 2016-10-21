import React, {Component} from 'react'
import { textarea, Field, FieldArray, reduxForm } from 'redux-form'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {renderField, rendreTextArea, renderComponents, rendreLabel} from '../../fields/fields'
import './styles.css';

class Add_incident extends Component {
	constructor(props) {
		super(props);
		this.handleState = this.handleState.bind(this);
		this.handleFields = this.handleFields.bind(this);
	}

	componentWillMount() {

	}

	handleState(e) {
		// request
		// 	.post("http://localhost:8000/incidents")
		// 	.send({component_id: 1})
		// 	.send({title: this.props.props.main.title})
		// 	.send({recorder: this.props.props.main.recorder})
		// 	.send({description: this.props.props.main.description})
		// 	.set('Accept', 'application/json')
		// 	.end(function(err, res) {
		// 		if(err != null) {
		// 			console.log(err);
		// 		} else {
		// 			location.href="http://localhost:8080/public/#/incidents/?_k=0iufjw";
		// 		}
		// 	});
		}

	handleFields(e) {
		this.props.actions.setFieldValue(e.target.id, e.target.value);
	}

	render() {
		var letterStyle = {
			border: 'solid',
			borderWidth: '2px',
			padding: '20px 25px 250px 100px'
		};

		const { handleSubmit, pristine, reset, submitting } = this.props
		const options = [ 'one', 'two', 'three']

		return (
			<div>
				<div className="clearfix">
					<div className="col-lg-4">
						<h4> Record New Incident </h4>
					</div>
					<div className="pull-right">
						<form onSubmit={this.handleState} >
							<button type="submit" className="btn btn-info marginLeftRecord">Submit</button>
						</form>
					</div>
				</div>
				<div style={letterStyle} className = "">
					<div className = "marginLeftRecordNewIncident">
						<div className = "col-lg-2 col-lg-offset-2">
							<Field name = "Recorder" type = "text" id = "recorder" onChange = { this.handleFields } component = { renderField } label = "Recorder" placeholder = "recorder" />
						</div>
						<div>
							<Field name = "Machine Name" type = "text" id = "machine" onChange = { this.handleFields } component = { renderField } label = "Machine Name" placeholder = "machine" />
						</div>
					</div>
					<div className="marginLeftRecordNewIncident">
						<div className="col-lg-2 col-lg-offset-2">
							<Field name = "Title" type = "text" id = "title" onChange = { this.handleFields } component = { renderField } label="Title" placeholder="title" />
						</div>
						<div>
							<Field name = "Component" type = "text" id = "component" onChange = { this.handleFields } component = { renderField } label="Component (Optional)" placeholder="component" />
						</div>
					</div>
					<div className="marginLeftRecordNewIncident">
						<div className="col-lg-2 col-lg-offset-2">
							<Field name = "Description" id = "description" onChange = { this.handleFields } component = { rendreTextArea } label="Description" placeholder="description" />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default reduxForm({
	form: 'component_Info',// a unique identifier for this form
})(Add_incident)

