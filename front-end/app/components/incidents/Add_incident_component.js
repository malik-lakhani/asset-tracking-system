import React, {Component} from 'react'
import { textarea, Field, FieldArray, reduxForm } from 'redux-form'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './styles.css';

function logChange(val) {
			console.log("Selected: " + val);
	}

class Add_incident extends Component {
	constructor(props) {
		super(props);
		this.state = {
			machine : '',
			component : '',
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFields = this.handleFields.bind(this);
		this.handleMachinesChange = this.handleMachinesChange.bind(this);
		this.handleComponentsChange = this.handleComponentsChange.bind(this);
	}

	componentDidMount() {
		this.props.actions.fetchMachines(false, this.props.dispatch);
		this.props.actions.fetchComponents(false, this.props.dispatch);
	}

	handleSubmit(e) {
		e.preventDefault();
		let componentId = this.state.component;
		this.props.actions.addIncident(componentId , this.props.props.incidents.recorder, this.props.props.incidents.title, this.props.props.incidents.description, this.props.dispatch)
	}

	handleMachinesChange(event) {
		this.setState({machine: event.value});
	}

	handleComponentsChange(event) {
		var value = event.value;
		this.setState({component: event.value});
	}

	handleFields(event) {
		this.props.actions.setFieldValue(event.target.id, event.target.value);
	}

	render() {
		let letterStyle = {
			border: 'solid',
			borderWidth: '2px',
			padding: '20px 25px 20px 100px'
		};

		let Machines = [];
		for(let i = 0; i < this.props.props.machines.Machines.length; i++){
			let MachineInfo = { value : this.props.props.machines.Machines[i].Id, label: this.props.props.machines.Machines[i].Name };
			Machines[i] = MachineInfo;
		}

		let Components = [];
		for(let i = 0; i < this.props.props.components.Components.length; i++){
			let ComponentInfo = { value : this.props.props.components.Components[i].Id, label: this.props.props.components.Components[i].Name };
			Components[i] = ComponentInfo;
		}

		const { handleSubmit, pristine, reset, submitting } = this.props
		return (
			<div>
				<h2 className="center"> Record New Incident </h2>
				<div style={letterStyle}>
					<div className="clearfix form-group">
						<div className = "col-lg-2 col-lg-offset-2">
							<label >Recorder</label>
							<input className="textboxSize" type="text" value={ this.props.props.incidents.recorder } name="Recorder" id="recorder" onChange={ this.handleFields }  placeholder="recorder" />
						</div>
						<div className = "col-lg-2 col-lg-offset-2">
							<label >Machine</label>
							<Select name="Machine" id="machine" value={ this.state.machine } options={ Machines } onChange={ this.handleMachinesChange } />
						</div>
					</div>
					<div className="clearfix form-group">
						<div className="col-lg-2 col-lg-offset-2">
							<label >Title</label>
							<input className="textboxSize" type="text" value={ this.props.props.incidents.title } name="Title" id="title" onChange={ this.handleFields } placeholder="title"/>
						</div>
						<div className = "col-lg-2 col-lg-offset-2">
							<label >Component</label>
							<Select name="form-field-name" value={ this.state.component } options={ Components } onChange={ this.handleComponentsChange } />
						</div>
					</div>
					<div className="clearfix form-group">
						<div className="col-lg-2 col-lg-offset-2">
							<label >Description</label>
							<textarea className="textAreaSize" name="Description" value={ this.props.props.incidents.description }  id="description" onChange={ this.handleFields } placeholder="description"/>
						</div>
					</div>
				</div>
				<div className="clearfix center paddingForm">
					<form onSubmit={ this.handleSubmit } >
						<button className="btn btn-info btn-lg" type="submit">Submit</button>
					</form>
				</div>
			</div>
		)
	}
}

export default reduxForm({
	form: 'Add_incident',// a unique identifier for this form
})(Add_incident)

