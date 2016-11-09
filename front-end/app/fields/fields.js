import React, {Component} from 'react'
import './styles'

//======TextBox =================
export const renderField = ({ label, onChange, type, placeholder, value, id, name, meta: { touched, error } }) => (
	<div className="font col-lg-4 col-lg-offset-2">
		<label >{label}</label>
		<div >
			<input  type={type} value={value} name={name} id={id} onChange={onChange} placeholder={placeholder}/>
			{touched && error && <span className="error"> { error}</span>}
		</div>
	</div>
)
//===================================

//==========TextArea=================
export const rendreTextArea = ({label, onChange, value, id, name, placeholder, meta: { touched, error } }) => (
	<div className="font col-lg-4 col-lg-offset-2">
		<label>{label}</label>
		<div>
			<textarea className="textAreaSize" value={value} name={name} id={id} onChange={onChange} placeholder={placeholder}/>
			{touched && error && <span>{error}</span>}
		</div>
	</div>
)
//====================================

//========fieldArray================
export const renderComponents = ({ fields }) => (
	<ul>
		<li>
			<button type="button" onClick={() => fields.push({})}>Add Component</button>
		</li>
		{fields.map((component, index) =>
			<li key={index}>
				<button type="button" title="Remove" onClick={() => fields.remove(index)}/>
				<h4>Component - {index + 1}</h4>
				<Field name={`${component}.name`} type="text" component={renderField} label="Name :" placeholder="Name" />
				<Field name={`${component}.serialNo`} value={`${component}.serialNo`} type="text" component={renderField} label="Serial No. :" placeholder="Serial No." />
				<Field name={`${component}.warranty`} component={renderField} label="Warranty Till :"/>
				<Field name={`${component}.component_description`} component={rendreTextArea} label="Description : " placeholder="Description"/>
			</li>
		)}
	</ul>
)
//==================================

//==========Label=================
export const rendreLabel = ({label, value, meta: { touched, error } }) => (
	<div className="font">
		<label>{label} :   </label>
	</div>
)
//====================================
