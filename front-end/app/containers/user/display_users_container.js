import { connect } from 'react-redux';
import DisplayUsers from '../../components/user/Display_users_component';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/actions';

const mapStateToProps = (state) => {
	return {
		state: state
	};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		actions: bindActionCreators(Actions, dispatch),
		dispatch: dispatch
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayUsers);

