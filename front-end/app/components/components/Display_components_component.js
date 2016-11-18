import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from 'react';
import { Link } from 'react-router'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './styles.css';

function componentInformation(cell, row){
   return <Link to={`/components/${row.Id}`}>{ cell }</Link>
}

class Display_components extends Component {
	constructor(props) {
		super(props);
		this.state = {
			category: '',
			activeAll: 'Active'
		};
		this.filterComponents = this.filterComponents.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
	}

	filterComponents(val) {
		var all = false;
		if(val.value == "all") {
			all = true
		}
		this.setState({activeAll:val.value});
		this.props.actions.fetchComponents(all, this.props.dispatch);
	}

	handleCategoryChange(val) {
		this.setState({category:val.value});
		this.props.actions.filterComponents(val.value);
	}

	componentDidMount() {
		this.props.actions.fetchComponents(false, this.props.dispatch);
		this.props.actions.fetchCatogories(false, this.props.dispatch);
	}

	render() {
		let categories = [];
		for(let i = 0; i < this.props.state.category.AllCategories.length; i++) {
			let ComponentInfo = { value : this.props.state.category.AllCategories[i].Id, label: this.props.state.category.AllCategories[i].Category };
			categories[i] = ComponentInfo;
		}

		var options = [
			{ value: 'active', label: 'Active' },
			{ value: 'all', label: 'All' }
		];

		let activeStyle = {
			width: '150'
		}

		let categoryStyle = {
			 width: '200'
		}

		let setPadding = {
			padding: '0px 12px 0px 12px'
		}

		var table = (<div><div className="panel b block-center text-center"> <h3> You do not have any Data </h3> </div> </div>);
		if (this.props.state.components.Components && this.props.state.components.Components.length) {
			table = (	<BootstrapTable data={this.props.state.components.Components}
														pagination={true}
														striped={true}
														search={true}
														hover={true}>
							<TableHeaderColumn isKey={true} hidden={true} dataSort={true} dataField="Id">#</TableHeaderColumn>
							<TableHeaderColumn width="120" dataSort={true} dataField="Serial_no">Serial</TableHeaderColumn>
							<TableHeaderColumn width="120" dataSort={true} dataField="Name" dataFormat={componentInformation}>Name</TableHeaderColumn>
							<TableHeaderColumn width="70" dataSort={true} dataField="Active">Active</TableHeaderColumn>
							<TableHeaderColumn width="150" dataSort={true} dataField="Category">Category</TableHeaderColumn>
							<TableHeaderColumn width="140" dataField="Warranty_till">Warranty Till(Y-M-D)</TableHeaderColumn>
							<TableHeaderColumn hidden={true} dataField="invoice_id">Invoice</TableHeaderColumn>
							<TableHeaderColumn width="240" dataSort={true} dataField="Description">Description</TableHeaderColumn>
							<TableHeaderColumn width="150" dataSort={true} dataField="Machine">Machine</TableHeaderColumn>
						</BootstrapTable>
					);
		}

		return (
			<div>
				<div className= "clearfix" style = { setPadding } >
					<div className="pull-left" >
						<Select searchable={ false } clearable={ false } placeholder="Active" value={ this.state.activeAll } options={ options } style={ activeStyle } onChange={ this.filterComponents }/>
					</div>
					<div className="pull-right">
						<Select searchable={ false } clearable={ false } value={ this.state.category } placeholder="Filter By Category" options={ categories } style={ categoryStyle } onChange={ this.handleCategoryChange }/>
					</div>
				</div>
				<div className="clearfix">
					{ table }
				</div>
			</div>
		)
	}
}

export default Display_components
