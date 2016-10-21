import React, {Component} from 'react'
import { textarea, Field, FieldArray, reduxForm } from 'redux-form'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {renderField, rendreTextArea, renderComponents, rendreLabel} from '../../fields/fields'
import './styles.css';

class Machine_information extends Component {
	constructor(props) {
	super(props);
	this.state = {
		data: this.props.props.main.data,
		component_information: [],
		incident_information: [],
		past_uses_history: []
	};
	this.handleState = this.handleState.bind(this);
	}

	displayComponents(machineId) {
		var self = this;
		var URL = `http://localhost:8000/machines/${machineId}/components`

	}

	componentWillMount() {
		var { machineId } = this.props.params;
		this.displayComponents(machineId); 
	}

	handleState(e) {
	}

	render() {
		var letterStyle = {
			border: 'solid',
			borderWidth: '2px',
			padding: '15px'
		};
		const { handleSubmit, pristine, reset, submitting } = this.props
		return (

			<div >
				<h1>Machine name</h1>
				<div style={letterStyle}>
					<div>
						<div className="col-lg-offset-1">
							<Field component={rendreLabel} label="Current User" /> <a href="#"> { this.state.data.Name }</a>
						</div>
						<div className="col-lg-offset-1">
							<Field component={rendreLabel} label="Using Since" /> { this.state.data.UsingSince }
						</div>
					</div>
				</div>
				<div>
					<div className="center">
						<h4><b> Component(s) </b></h4>
					</div>
					<div>
						<BootstrapTable data={this.state.component_information} pagination={true} search={true} striped={true} hover={true}>
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
						<BootstrapTable data={this.state.incident_information} pagination={true} search={true} striped={true} hover={true}>
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
						<BootstrapTable data={this.state.past_uses_history} pagination={true} search={true} striped={true} hover={true}>
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

