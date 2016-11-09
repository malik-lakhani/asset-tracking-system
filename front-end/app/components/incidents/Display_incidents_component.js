import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from 'react';
import { Link } from 'React-Router';
import './styles.css';

function incidentInformation(cell, row){
	return <Link to={`/components/${row.Id}`}>{ cell }</Link>
}

class Display_incidents extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.filterIncidents = this.filterIncidents.bind(this);
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
	}

	render() {
		var marginLeftRecord = {
			marginleft: '-7%',
		};
		console.log('from incidents components: ', this.props);
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
					<BootstrapTable data={this.props.state.incidents.Incidents} pagination={true} search={true} striped={true} hover={true}>
						<TableHeaderColumn width="50"  dataSort={true} dataField="Id" isKey={true} hidden={true}>#</TableHeaderColumn>
						<TableHeaderColumn width="120" dataSort={true} dataField="Component">Component</TableHeaderColumn>
						<TableHeaderColumn width="200" dataSort={true} dataField="Title" dataFormat={incidentInformation} >Title</TableHeaderColumn>
						<TableHeaderColumn width="300" dataSort={true} dataField="Description">Description</TableHeaderColumn>
						<TableHeaderColumn width="80"  dataSort={true} dataField="Warranty_till">Warranty</TableHeaderColumn>
						<TableHeaderColumn width="60"  dataSort={true} dataField="Status">Status</TableHeaderColumn>
					</BootstrapTable>
				</div>
			</div>
		)
	}
}

export default Display_incidents
