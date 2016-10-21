import React, {Component} from 'react'
import { textarea, Field, FieldArray, reduxForm } from 'redux-form'
import { Link } from 'react-router';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {renderField, rendreTextArea, renderComponents, rendreLabel} from '../../fields/fields'
import './styles.css';

class Component_information extends Component {
	constructor(props) {
	super(props);
	this.state = {
		data: this.props.props.main.data,
		tableData: [],
		userDetails: {},
		machineDetails: {}
	};
	this.handleState = this.handleState.bind(this);
	}

// displayComponents(componentId) {
// 		var self = this;
// 		var URL = `http://localhost:8000/components/${componentId}`
// 		request
// 			.get(URL)
// 			.then((res) => {
// 				var data = JSON.parse(res.text);
// 				self.setState({
// 					data: data,
// 					tableData: data.Incidents,
// 					userDetails: data.User,
// 					machineDetails: data.Machine,
// 				})
// 			});
// 		}



	componentWillMount() {
		var { componentId } = this.props.params;
		this.displayComponents(componentId); 
	}

	handleState(e) {
	}

	// removeComponent(componentId) {
	// 	let machineId = this.state.machineDetails.Id;
	// 	var self = this;
	// 	var URL = `http://localhost:8000/machines/{machineId}/components/${componentId}`
	// 	request
	// 		.delete(URL)
	// 		.then((res) => {
	// 	});
	// }

	render() {
		var letterStyle = {
			border: 'solid',
			borderWidth: '2px',
			padding: '15px'
		};

		const { handleSubmit, pristine, reset, submitting } = this.props
		return (
			<div >
				<div className="clearfix">
					<div className="col-lg-1">
						<h1>{this.state.data.Component}<h4>({this.state.data.Status})</h4></h1>
					</div>
					<div className="pull-right">
						<Link to={`/incidents/add`}><button type="button" className="btn btn-info marginLeftRecord">Change Machine</button></Link>
						<button type="button" className="btn btn-danger" onClick={ this.removeComponent(this.componentId) } >Decommission</button>
					</div>
				</div>

				<div style={letterStyle}>
					<div>
						<div className="col-lg-4 col-lg-offset-2">
							<Field component={rendreLabel} label="Invoice" /> <a href="#">{this.state.data.Invoice_number}({this.state.data.Invoice_id})</a>
						</div>
						<div>
							<Field component={rendreLabel} label="Warranty Valid Till" /> {this.state.data.Warranty_till}
						</div>
					</div>
					<div>
						<div className=" col-lg-4 col-lg-offset-2">
							<Field component={rendreLabel} label="Name" /> {this.state.data.Component}
						</div>
						<div>
							<Field component={rendreLabel} label="Machine" /> <a href="#">{this.state.machineDetails.Name}</a>
						</div>
					</div>
					<div>
						<div className=" col-lg-4 col-lg-offset-2">
							<Field component={rendreLabel} label="Description" /> {this.state.data.Description}
						</div>
						<div>
							<Field component={rendreLabel} label="User" /> <a href="#">{this.state.userDetails.Name}</a>
						</div>
					</div>
				</div>
				<div>
					<div className="center">
					<h3> Incident(s) </h3>
					</div>
					<div>
						<BootstrapTable data={this.state.tableData} pagination={true} search={true} striped={true} hover={true}>
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

