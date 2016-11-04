import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import React, { Component } from 'react';
import { Link } from 'react-router';
import './styles.css';


function linkToEditInvoice(cell, row) {
	return <Link to={`/invoices/edit/${row.Id}`}>{ cell }</Link>
}

class Display_invoices extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		// this.getInvoices = this.getInvoices.bind(this);
	}

	componentDidMount() {
		this.props.actions.fetchInvoices(this.props.dispatch); 
	}

	render() {
		console.log('from display invoices component', this.props);
		return (
			<div>
				<div><a href="http://localhost:8080/public/#/invoices/add/?_k=ycsmgk"><button type="button" className="btn btn-info">Add Invoice</button></a></div>
				<BootstrapTable data={this.props.state.invoices.Invoices} pagination={true} search={true} striped={true} hover={true}>
					<TableHeaderColumn width="60" isKey={true} dataSort={true} dataField="Id" hidden={true}>#</TableHeaderColumn>
					<TableHeaderColumn dataSort={true} dataField="Invoice_number" dataFormat={linkToEditInvoice} >Invoice Number</TableHeaderColumn>
					<TableHeaderColumn dataSort={true} dataField="Invoice_date">Invoice Date</TableHeaderColumn>
					<TableHeaderColumn dataSort={true} dataField="Invoicer_name">Invoicer</TableHeaderColumn>
				</BootstrapTable>
			</div>
		)
	}
}

export default Display_invoices
