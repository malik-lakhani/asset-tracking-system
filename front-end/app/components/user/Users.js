import React, {component} from 'react'
import request from 'superagent';
import { Field, reduxForm } from 'redux-form'

const renderField = ({ input, label, type, placeholder, meta: { touched, error } }) => (
  <div >
    <label >{label}</label>
    <div >
      <input {...input} type={type} placeholder={placeholder}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const Add_user = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit(add_user)}>
      <Field name={`${component}.Name`} type="text" component={renderField} label="Name :" placeholder="Name" />
      <Field name={`${component}.email`} type="email" component={renderField} label="Email :" placeholder="Email" />
      <div>
        <label>Machine : </label>
        <div>
          <Field name="machine" component="select">
            <option></option>
            <option value="1">Mako</option>
            <option value="2">Olaf</option>
            <option value="3">Thor</option>
          </Field>
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

const validate = values => {
  console.log(values.undefined);
  const errors = {}
  if(!values.Name) {
    errors.Name = 'Required'
  }
   if(!values.email) {
    errors.email = 'Required'
  }
   if(!values.machine) {
    errors.machine = 'Required'
  }
  return errors
}

function add_user(props){
//   console.log(props);
//   var Obj = {
//     "name" : props.Name,
//     "company_email": props.email,
//     "machine_id": props.machine
//   }

//    $.ajax({
//         type: 'POST',
//         url: "http://localhost:8000/users",
//         contentType: 'application/json',
//         data: {
//           "name":"ashvin"
//         },
//         success: function(data) {
//            console.log("success")
//         }.bind(this),
//         error: function(xhr, status, err) {
//           alert(err);
//         }
//     });
}

export default reduxForm({
  form: 'add_user',  // a unique identifier for this form
  validate
})(Add_user)