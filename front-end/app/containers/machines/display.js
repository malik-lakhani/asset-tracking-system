import { connect } from 'react-redux';
import DisplayMachines from '../../components/machines/Display';
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

export default connect(mapStateToProps, mapDispatchToProps)(DisplayMachines);



