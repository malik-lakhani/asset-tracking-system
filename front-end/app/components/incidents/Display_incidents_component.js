import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from 'react';
import { Link } from 'React-Router';
import './styles.css';

function incidentInformation(cell, row) {
	return <Link to={`/incidents/${row.Id}`}>{ cell }</Link>
}

let Components = [];
let ComponentIds = [];
class Display_incidents extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.filterIncidents = this.filterIncidents.bind(this);
		this.editIncident = this.editIncident.bind(this);
	}

	editIncident(row, cellName, cellValue){
		let indexOfComponentId = Components.indexOf(cellValue);
		let ComponentId = ComponentIds[indexOfComponentId]
		this.props.actions.editIncident(row, ComponentId);
	}

	filterIncidents(e) {
	var all = false;
	if(e.target.value == "all") {
		all = true
	}
		this.props.actions.fetchIncidents(all, this.props.dispatch);
	}

	componentDidMount() {
		this.props.actions.fetchIncidents(false); 
		this.props.actions.fetchComponents(false);
	}

	render() {

		var marginLeftRecord = {
			marginleft: '-7%',
		};

		let ComponentId;
		for(let i = 0; i < this.props.state.components.Components.length; i++) {
			ComponentIds[i] = this.props.state.components.Components[i].Id;
			Components[i] = this.props.state.components.Components[i].Name;
		}

		var table;
		if (this.props.state.incidents.Incidents && this.props.state.incidents.Incidents.length) {
		table = (	<BootstrapTable data={this.props.state.incidents.Incidents}
													pagination={true}
													search={true}
													striped={true}
													exportCSV={true}
													cellEdit={{
														mode: "dbclick",
														blurToSave: true,
														afterSaveCell: this.editIncident
					                }}
													hover={true}>
						<TableHeaderColumn width="50"  dataSort={true} dataField="Id" editable={false} isKey={true} hidden={true}>#</TableHeaderColumn>
						<TableHeaderColumn width="120" dataSort={true} dataField="Component" editable={{type:'select', options:{ values:Components }}}>Component</TableHeaderColumn>
						<TableHeaderColumn width="200" dataSort={true} dataField="Title" dataFormat={incidentInformation} >Title</TableHeaderColumn>
						<TableHeaderColumn width="300" dataSort={true} dataField="Description">Description</TableHeaderColumn>
						<TableHeaderColumn width="160"  dataSort={true} dataField="Warranty_till" editable={false}>Warranty(YYYY-MM-DD)</TableHeaderColumn>
						<TableHeaderColumn width="80"  dataSort={true} dataField="Recorder">Recorder</TableHeaderColumn>
						<TableHeaderColumn width="60"  dataSort={true} dataField="Status" editable={false}>Status</TableHeaderColumn>
					</BootstrapTable>);
		} else {
			table = (<div><div className="panel b block-center text-center"> <h3> You do not have any Data </h3> </div> </div>)
		}

		return (
			<div>
				<div className="clearfix">
					<div className="col-lg-1">
						<select name="select2" onChange={this.filterIncidents} className="selectpicker" data-width="auto">
							<option value="active">Active</option>
							<option value="all">All</option>
						</select>
					</div>
					<div className="pull-right">
					 <Link to={`/incidents/add`}><button type="button" className="btn btn-info marginLeftRecord">Record New Incident</button></Link>
					</div>
				</div>
				<div>
					{ table }
				</div>
			</div>
		)
	}
}

export default Display_incidents
