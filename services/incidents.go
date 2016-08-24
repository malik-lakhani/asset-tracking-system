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
	Created_at string
	Resolved_at *time.Time
}

func AddIncident(componentsId int, title string, description string) {
	sess := SetupDB()
	incidentInfo := IncidentInfo{}
	incidentInfo.Component_id = componentsId
	incidentInfo.Title = title
	incidentInfo.Description = description
	incidentInfo.Status = "active"
	incidentInfo.Created_at = "NOW()"

	_, err := sess.InsertInto("incidents").
							Columns("component_id", "title", "description", "status", "created_at").
							Record(incidentInfo).
							Exec()
	CheckErr(err)
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
	_, err := sess.DeleteFrom("incidents").
							Where("id = ?", incidentId).
							Exec()
	CheckErr(err)
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



















