import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from 'react';
import request from 'superagent';
import { Link } from 'React-Router';

function incidentInformation(cell, row){
  return '<a href="http://localhost:8080/public/#/components/'+ row.Id +'/?_k=ycsmgk">'+ cell +'</a>';
}

class DataTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.props.main.data,
    };
    this.handleState = this.handleState.bind(this);
    // this.getUsers = this.getUsers.bind(this);
    this.dipslayComponents = this.dipslayComponents.bind(this);
  }

  dipslayComponents(e){
    var all = false;
    if(e.target.value == "all"){
      all = true
    }
    this.displayComponents(all); 
  }

  displayComponents(all) {
    var self = this;
    var URL = "http://localhost:8000/incidents";
    request
      .get(URL)
      .query({all: all})
      .then((res) => {
        var data = JSON.parse(res.text);
        self.setState({
          data: data
        })
      });
  }

  componentWillMount() {
    this.displayComponents(false); 
  }

  handleState(e) {
  }

  render() {
    var marginLeftRecord = {
      marginleft: '-7%',
    };

    return (
      <div>

        <div className="clearfix">
          <div className="col-lg-1">
            <select name="select2" onChange={this.dipslayComponents} className="select2">
              <option value="active">Active</option>
              <option value="all">All</option>
            </select>
          </div>
          <div className="pull-right">
           <Link to={`/incidents/add`}><button type="button" className="btn btn-info marginLeftRecord">Record New Incident</button></Link>
          </div>
        </div>

        <div>
          <BootstrapTable data={this.state.data} pagination={true} search={true} striped={true} hover={true}>
            <TableHeaderColumn width="50"  dataSort={true} dataField="Id" isKey={true}>#</TableHeaderColumn>
            <TableHeaderColumn width="120" dataSort={true} dataField="Machine">Machine</TableHeaderColumn>
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

export default DataTable