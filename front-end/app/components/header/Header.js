import React, { Component } from 'react'

class Header extends Component {

  render() {
    return (
        <div className="container-fluid">
          <nav className="navbar navbar-inverse">
            <div className="container">

              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-3">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">Asset Tracking System</a>
              </div>
              <div className="collapse navbar-collapse" id="navbar-collapse-3">
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="http://localhost:8080/public/#/invoices/?_k=ycsmgk">Invoice</a></li>
                  <li><a href="http://localhost:8080/public/#/components/?_k=0iufjw">Components</a></li>
                  <li><a href="http://localhost:8080/public/#/machines/?_k=ycsmgk">Machines</a></li>
                  <li><a href="http://localhost:8080/public/#/incidents/?_k=0iufjw">Incidents</a></li>
                  <li><a href="http://localhost:8080/public/#/users/?_k=0iufjw">Users</a></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
    )
  }
}

export default Header
