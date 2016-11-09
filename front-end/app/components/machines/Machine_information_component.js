import React, {Component} from 'react'
import { textarea, Field, FieldArray, reduxForm } from 'redux-form'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {renderField, rendreTextArea, renderComponents, rendreLabel} from '../../fields/fields'
import { Link } from 'react-router'
import './styles.css';

class Machine_information extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			component_information: [],
			incident_information: [],
			past_uses_history: []
		};
	}

	displayComponents(machineId) {
		let self = this;
		let URL = `http://localhost:8000/machines/${machineId}/components`
	}

	componentDidMount() {
		let { machineId } = this.props.params;
		this.props.actions.fetchMachineInformation(machineId);
	}

	render() {
		//null data will be pass to datatable if database contains no data ....
    let MachineName = '';
    let UsingSince = '';
    let CurrentUser = '';
    let PastUses = [];
    let Components = [];
    let Incidents = [];

    if(this.props.props.machines.Machines.Name) {
      MachineName = this.props.props.machines.Machines.Machine;
      CurrentUser = this.props.props.machines.Machines.Name;
      UsingSince = this.props.props.machines.Machines.UsingSince;
      PastUses = this.props.props.machines.Machines.PastUses;
      Components = this.props.props.machines.Machines.Components;
      Incidents = this.props.props.machines.Machines.Incidents;
    }

		let letterStyle = {
			border: 'solid',
			borderWidth: '2px',
			padding: '15px'
		};
		const { handleSubmit, pristine, reset, submitting } = this.props
		return (

			<div >
				<h1>{ MachineName }</h1>
				<div style={letterStyle}>
					<div>
						<div className="col-lg-offset-1">
							<Field component={rendreLabel} label="Current User" /> <Link to={`/users`}> { CurrentUser } </Link>
						</div>
						<div className="col-lg-offset-1">
							<Field component={rendreLabel} label="Using Since" /> { UsingSince }
						</div>
					</div>
				</div>
				<div>
					<div className="center">
						<h4><b> Component(s) </b></h4>
					</div>
					<div>
						<BootstrapTable data={ Components } pagination={true} search={true} striped={true} hover={true}>
							<TableHeaderColumn width="20"  dataSort={true} dataField="Id" isKey={true}>#</TableHeaderColumn>
							<TableHeaderColumn width="50" dataSort={true} dataField="SerialNo">Serial</TableHeaderColumn>
							<TableHeaderColumn width="100" dataSort={true} dataField="Name">Name</TableHeaderColumn>
							<TableHeaderColumn width="180"  dataSort={true} dataField="Description" >Description</TableHeaderColumn>
							<TableHeaderColumn width="60"  dataSort={true} dataField="Warranty_till" >Warranty Till</TableHeaderColumn>
							<TableHeaderColumn width="60"  dataSort={true} dataField="Created_at" >Add On</TableHeaderColumn>
						</BootstrapTable>
					</div>

					<div className="center">
						<h4><b> Incident(s) </b></h4>
					</div>
					<div>
						<BootstrapTable data={ Incidents } pagination={true} search={true} striped={true} hover={true}>
						<TableHeaderColumn width="50"  dataSort={true} dataField="Id" isKey={true}>#</TableHeaderColumn>
						<TableHeaderColumn width="180" dataSort={true} dataField="Title">Title</TableHeaderColumn>
						<TableHeaderColumn width="200" dataSort={true} dataField="Description">Description</TableHeaderColumn>
						<TableHeaderColumn width="50"  dataSort={true} dataField="Status" >Status</TableHeaderColumn>
						</BootstrapTable>
					</div>
					<div className="center">
						<h4><b> Past Uses History </b></h4>
					</div>
					<div>
						<BootstrapTable data={ PastUses } pagination={true} search={true} striped={true} hover={true}>
						<TableHeaderColumn  dataSort={true} dataField="Begin" isKey={true}>Begin</TableHeaderColumn>
						<TableHeaderColumn  dataSort={true} dataField="End">End</TableHeaderColumn>
						<TableHeaderColumn  dataSort={true} dataField="User">User</TableHeaderColumn>
						</BootstrapTable>
					</div>
				</div>
			</div>
		)
	}
}

export default reduxForm({
	form: 'component_Info',// a unique identifier for this form
})(Machine_information)

