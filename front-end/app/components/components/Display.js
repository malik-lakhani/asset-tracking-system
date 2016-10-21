import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from 'react';
import { Link } from 'react-router'
import './styles.css';

function componentInformation(cell, row){
   return <Link to={`/components/${row.Id}`}>{ cell }</Link>
}

class Display_components extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// data: this.props.props.main.data,
		};
		this.handleState = this.handleState.bind(this);
		// this.getUsers = this.getUsers.bind(this);
		this.dipslayComponents = this.dipslayComponents.bind(this);
	}

	dipslayComponents(e){
		// var all = false;
		// if(e.target.value == "all"){
		// 	all = true
		// }
		// this.displayComponents(all); 
	}

	componentDidMount() {
		this.props.actions.fetchComponents(true, this.props.dispatch);
	}

	handleState(e) {
	}

	render() {
		console.log('**** from components Component', this.props);
		return (
			<div>
				<select name="select2" className="selectpicker" data-width="auto">
					<option value="active">Active</option>
					<option value="all">All</option>
				</select>
				<div>
					<BootstrapTable data={this.props.state.components.Components} pagination={true} search={true} striped={true} hover={true}>
						<TableHeaderColumn width="50" isKey={true} dataSort={true} dataField="Id">#</TableHeaderColumn>
						<TableHeaderColumn width="180" dataSort={true} dataField="Serial_no">Serial</TableHeaderColumn>
						<TableHeaderColumn width="180" dataSort={true} dataField="Name" dataFormat={componentInformation}>Name</TableHeaderColumn>
						<TableHeaderColumn width="180" dataField="Warranty_till">Warranty Till</TableHeaderColumn>
						<TableHeaderColumn hidden={true} dataField="invoice_id">Invoice</TableHeaderColumn>
						<TableHeaderColumn width="240" dataSort={true} dataField="Description">Description</TableHeaderColumn>
						<TableHeaderColumn width="150" dataSort={true} dataField="Machine">Machine</TableHeaderColumn>
					</BootstrapTable>
				</div>
			</div>
		)
	}
}

export default Display_components
