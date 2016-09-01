package services

import(
	"time"
	"encoding/json"
)

type IncidentInfo struct {
	Id int
	Component_id int
	Title string
	Description string
	Status string
	Resolved_at *time.Time
}

func AddIncident(componentsId int, title string, description string) {
	sess := SetupDB()
	i := IncidentInfo{}
	i.Component_id = componentsId
	i.Title = title
	i.Description = description
	i.Status = "active"

	_, err := sess.InsertInto("incidents").
		Columns("component_id", "title", "description", "status").
		Record(i).
		Exec()
	CheckErr(err)

	_, err1 := sess.Update("components").
							Set("active", "false").
							Where("id = ?", componentsId).
							Exec()
	CheckErr(err1)
}

func EditIncident(incidentId int, componentsId int, title string, description string) {
	sess := SetupDB()
	_, err := sess.Update("incidents").
		Set("component_id", componentsId).
		Set("title", title).
		Set("description", description).
		Where("id = ?", incidentId).
		Exec()
	CheckErr(err)
}

func DeleteIncident(incidentId int) {
	sess := SetupDB()

	componentId, err := sess.Select("component_id").
		From("incidents").
		Where("id = ?", incidentId).
		ReturnInt64()
	CheckErr(err)

	_, err1 := sess.Update("components").
		Set("active", true).
		Where("id = ?", componentId).
		Exec()
	CheckErr(err1)

	_, err2 := sess.DeleteFrom("incidents").
			Where("id = ?", incidentId).
			Exec()
	CheckErr(err2)
}

func DisplayIncidents() []byte {
	sess := SetupDB()
	incidentInfo := []IncidentInfo{}
	err := sess.Select("id, component_id, title, description, status, resolved_at").
		From("incidents").
		LoadStruct(&incidentInfo)
	b, err := json.Marshal(incidentInfo)
	CheckErr(err)
	return b
}

func DisplayIncident(incidentId int) []byte {
	sess := SetupDB()
	incidentInfo := IncidentInfo{}
	err := sess.Select("id, component_id, title, description, status, resolved_at").
		From("incidents").
		Where("id = ?", incidentId).
		LoadStruct(&incidentInfo)
	b, err := json.Marshal(incidentInfo)
	CheckErr(err)
	return b
}

type IncidentUpdate struct {
	ComponentId int
	IncidentId int
	Description string
}

func IncidentUpdates(incidentId int, componentId int, description string) {
	sess := SetupDB()

 //insert record into incident_updates table ...===============
	var incident IncidentUpdate
	incident.ComponentId = componentId
	incident.IncidentId = incidentId
	incident.Description = description

	_, err := sess.InsertInto("incident_update").
		Columns("incident_id", "component_id", "description").
		Record(incident).
		Exec()
	CheckErr(err)
	//===========================================================

	//select component id on which incident happen ....==========
	id, err1 := sess.Select("component_id").
		From("incidents").
		Where("id = ?", incidentId).
		ReturnInt64()
	CheckErr(err1)
	//===========================================================


	//Add replaces components after resolved ....================
	components := ComponentInfo{}
	components.Active = true
	err2 := sess.Select("name, invoice_id, warranty_till, description, active").
		From("components").
		Where("id = ? ", id).
		LoadStruct(&components)
	CheckErr(err2)


	_, err3 := sess.InsertInto("components").
		Columns("name", "invoice_id", "warranty_till", "description", "active").
		Record(components).
		Exec()
	CheckErr(err3)
	//===========================================================

	//remove active is false of damaged component ...============
	_, err4 := sess.Update("components").
		Set("active", false).
		Where("id = ?", componentId).
		Exec()
	CheckErr(err4)
	//===========================================================

	//===Add resolved date in incidents table after resolved component
	_, err5 := sess.Update("incidents").
							Set("resolved_at", "NOW()").
							Where("id = ?", incidentId).
							Exec()
	CheckErr(err5)
	//===========================================================
}

