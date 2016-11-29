import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from 'react';
import { Link } from 'react-router'
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
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
			data :[],
			activeAll: ''
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

	filterCategory(val) {
		var all = false;
		if(val.value == "all") {
			all = true
		}
		this.props.actions.fetchCategories(all);
	}

	componentDidMount() {
		this.props.actions.fetchCategories(false);
	}

	render() {

		//===================== style ================================================
		let activeStyle = {
			width: '150'
		}

		let selectRowProp = {
			mode: "checkbox",
			clickToSelect: true,
			bgColor: "rgb(238, 193, 213)"
		};
	// ===========================================================================

		let options = [
			{ value: 'active', label: 'Active' },
			{ value: 'all', label: 'All' }
		];

		return (
			<div>
				<div className="clearfix">
					<div className="col-lg-2">
						<Select searchable={ false } clearable={ false } placeholder="Active" value={ this.state.activeAll } options={ options } style={ activeStyle } onChange={ this.filterCategory }/>
					</div>
				</div>
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
