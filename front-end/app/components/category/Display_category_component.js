import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from 'react';
import { Link } from 'react-router'
import axios from 'axios';
import './styles.css';

function Validator(value){
	if(!value){
		return "*";
	}
	return true;
}

class Display_category extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data :[]
		};
		this.filterCategory = this.filterCategory.bind(this);
		this.editCategory = this.editCategory.bind(this);
		this.deleteCategory = this.deleteCategory.bind(this);
		this.addCategory = this.addCategory.bind(this);
	}

	editCategory(row, cellName, cellValue) {
		this.props.actions.editCategory(row);
	}

	addCategory(row) {
		this.props.actions.addCategory(row);
	}

	deleteCategory(id) {
		this.props.actions.deleteCategory(id);
	}

	filterCategory(e) {
		var all = false;
		if(e.target.value == "all") {
			all = true
		}
		this.props.actions.fetchCategories(all, this.props.dispatch);
	}

	componentDidMount() {
		this.props.actions.fetchCatogories(false, this.props.dispatch);
	}

	render() {

		let selectRowProp = {
			mode: "checkbox",
			clickToSelect: true,
			bgColor: "rgb(238, 193, 213)"
		};

		return (
			<div>
				<select name="select2" onChange={this.filterCategory} className="selectpicker" data-width="auto">
						<option value="active">Active</option>
						<option value="all">All</option>
				</select>
				<div>
						<BootstrapTable data={this.props.state.category.AllCategories}
																						pagination={true}
																						options={{
																								afterDeleteRow :this.deleteCategory,
																								onAddRow :this.addCategory
																						}}
																						deleteRow={true}
																						selectRow={selectRowProp}
																						insertRow={true}
																						exportCSV={true}
																						cellEdit={{
																								mode: "dbclick",
																								blurToSave: true,
																								afterSaveCell: this.editCategory
																						}}
																						search={true}
																						striped={true}
																						hover={true}>
								<TableHeaderColumn dataField="Id" editable={false} isKey={true} autoValue={true} hidden={true} >Id</TableHeaderColumn>
								<TableHeaderColumn width="260" dataSort={true} dataField="Category" editable={{ validator:Validator }} >Category</TableHeaderColumn>
								<TableHeaderColumn width="350" dataSort={true} dataField="Description" editable={{ validator:Validator }}>Description</TableHeaderColumn>
						</BootstrapTable>
				</div>
			</div>
		)
	}
}

export default Display_category
