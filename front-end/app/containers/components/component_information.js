import { connect } from 'react-redux';
import Component_information from '../../components/components/Component_information';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/actions';

function mapStateToProps(state) {
  return {
  	props: state,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators(Actions, dispatch),
    dispatch: dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Component_information);



