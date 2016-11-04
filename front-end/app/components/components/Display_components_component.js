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
		this.filterComponents = this.filterComponents.bind(this);
	}

	filterComponents(e) {
		var all = false;
		if(e.target.value == "all") {
			all = true
		}
		this.props.actions.fetchComponents(all, this.props.dispatch);
	}

	componentDidMount() {
		this.props.actions.fetchComponents(false, this.props.dispatch);
	}

	render() {
		console.log("====>", this.props)
		return (
			<div>
				<select name="select2" onChange={this.filterComponents} className="selectpicker" data-width="auto">
					<option value="active">Active</option>
					<option value="all">All</option>
				</select>
				<div>
					<BootstrapTable data={this.props.state.components.Components}
													pagination={true}
													striped={true}
													search={true}
													hover={true}>
						<TableHeaderColumn width="50" isKey={true} hidden={true} dataSort={true} dataField="Id">#</TableHeaderColumn>
						<TableHeaderColumn width="180" dataSort={true} dataField="Serial_no">Serial</TableHeaderColumn>
						<TableHeaderColumn width="150" dataSort={true} dataField="Name" dataFormat={componentInformation}>Name</TableHeaderColumn>
						<TableHeaderColumn width="100" dataSort={true} dataField="Active">Active</TableHeaderColumn>
						<TableHeaderColumn width="120" dataField="Warranty_till">Warranty Till</TableHeaderColumn>
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
