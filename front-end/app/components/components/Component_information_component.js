import React, {Component} from 'react'
import { textarea, Field, FieldArray, reduxForm } from 'redux-form'
import { Link } from 'react-router';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {renderField, rendreTextArea, renderComponents, rendreLabel} from '../../fields/fields'
import axios from 'axios';
import Select from 'react-select';
import './styles.css';

class Component_information extends Component {
	constructor(props) {
		super(props);
		this.state = {
				machine : '', //for change machine from model ...
		};
		this.handleMachinesChange = this.handleMachinesChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		let { componentId } = this.props.params;
		this.props.actions.fetchComponentDetails(componentId, this.props.dispatch);
		this.props.actions.fetchMachines(false, this.props.dispatch);
	}

	handleMachinesChange(event) {
		this.setState({machine: event.value});
	}

	handleSubmit(event) {
		console.log('props-->', this.props);
		console.log('changed machine-->', this.state.machine);
	}

	render() {
		var letterStyle = {
			border: 'solid',
			borderWidth: '2px',
			padding: '15px'
		};

		//null data will be pass to datatable if database contains no data ....
		let status = 'Active';
		let MachineName = '';
		let MachineId = null;
		let User = '';
		let Description = '';
		let Component = '';
		let incidents = [];

		if(this.props.props.components.Components.Machine) {
			MachineName = this.props.props.components.Components.Machine.Name;
			MachineId = this.props.props.components.Components.Machine.Id;
			User = this.props.props.components.Components.User.Name;
			Description = this.props.props.components.Components.Description;
			Component = this.props.props.components.Components.Component;
			incidents = this.props.props.components.Components.Incidents;
			if(this.props.props.components.Components.Active == "false") {
				status = 'decommitted';
			}
		}

		let Machines = [];
		for(let i = 0; i < this.props.props.machines.Machines.length; i++){
			let MachineInfo = { value : this.props.props.machines.Machines[i].Id, label: this.props.props.machines.Machines[i].Name };
			Machines[i] = MachineInfo;
		}

		const { handleSubmit, pristine, reset, submitting } = this.props
		return (
			<div >

			{/*================= Model for change machine ....========================*/}
				<div id="changeMachine" className="modal fade" role="dialog">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal">&times;</button>
								<h4 className="modal-title center">Change Machine</h4>
							</div>
							<div className="modal-body">
								<label >Select Machine</label>
								<Select name="Machine" id="machine" value={ this.state.machine } options={ Machines } onChange={ this.handleMachinesChange } />
							</div>
							<div className="modal-footer">
								<form onSubmit={ this.handleSubmit } >
									<button type="submit" className="btn btn-info" >Save</button>
									<button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			{/* ======================================================================*/}


				<div className="clearfix">
					<div className="col-lg-1">
						<h1>{Component}<h4>({status})</h4></h1>
					</div>
					<div className="pull-right">
						<button type="button" className="btn btn-info marginLeftRecord" data-toggle="modal" data-target="#changeMachine">Change Machine</button>
						<button type="button" className="btn btn-danger" > Decommission </button>
					</div>
				</div>

				<div style={letterStyle}>
					<div>
						<div className="col-lg-4 col-lg-offset-2">
							<Field component={rendreLabel} label="Invoice" /> <Link to={`/invoices`}> { this.props.props.components.Components.Invoice_number } </Link>
						</div>
						<div>
							<Field component={rendreLabel} label="Warranty Valid Till" /> { this.props.props.components.Components.Warranty_till }
						</div>
					</div>
					<div>
						<div className=" col-lg-4 col-lg-offset-2">
							<Field component={rendreLabel} label="Name" /> { Component }
						</div>
						<div>
							<Field component={rendreLabel} label="Machine" /> <Link to={`/machines/${MachineId}/components`} > { MachineName } </Link>
						</div>
					</div>
					<div>
						<div className=" col-lg-4 col-lg-offset-2">
							<Field component={rendreLabel} label="Description" /> { this.props.props.components.Components.Description }
						</div>
						<div>
							<Field component={rendreLabel} label="User" /> { User }
						</div>
					</div>
				</div>
				<div>
					<div className="center">
					<h3> Incident(s) </h3>
					</div>
					<div>
						<BootstrapTable data={incidents} pagination={true} search={true} striped={true} hover={true}>
						<TableHeaderColumn width="50"  dataSort={true} dataField="Id" isKey={true}>#</TableHeaderColumn>
						<TableHeaderColumn width="180" dataSort={true} dataField="Title">Title</TableHeaderColumn>
						<TableHeaderColumn width="200" dataSort={true} dataField="Description">Description</TableHeaderColumn>
						<TableHeaderColumn width="50"  dataSort={true} dataField="Status" >Status</TableHeaderColumn>
						</BootstrapTable>
					</div>
				</div>

			</div>
		)
	}
}

export default reduxForm({
	form: 'component_Info',// a unique identifier for this form
})(Component_information)

