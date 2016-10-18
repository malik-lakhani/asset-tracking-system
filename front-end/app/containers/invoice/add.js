import { connect } from 'react-redux';
import AddInvoice from '../../components/invoice/Add';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/actions';

function mapStateToProps(state) {
	return {
		props: state
	};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		actions: bindActionCreators(Actions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddInvoice);



