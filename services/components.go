package services

import(
		"encoding/json"
		"fmt"
		"time"
)

type DisplayAllComponents struct {
	Id int
	Serial_no string
	Name string
	Machine *string
	Invoice_id int
	Category *string
	Warranty_timestamp *time.Time
	Warranty_till string
	Description string
	Active bool
	Deleted_at *time.Time
}

func DisplayComponents(all string) []byte {
	sess := SetupDB()
	components := []DisplayAllComponents{}

	query := sess.Select("c.id, c.invoice_id, c.serial_no, c.name, c.active, c.description, c.warranty_till as Warranty_timestamp, machines.name as Machine, categories.category").
	From("components c").
		LeftJoin("machine_components", "c.id = machine_components.component_id").
		LeftJoin("machines", "machines.id = machine_components.machine_id").
		Join("categories", "c.category_id = categories.id")
	// display all components or active components only ...
	if(all == "false") {
		query.Where("c.deleted_at IS NULL").
			LoadStruct(&components)
	} else {
		query.LoadStruct(&components)
	}

	//extract only date from timestamp========
	for i := 0; i < len(components); i++ {
		t := components[i].Warranty_timestamp
		components[i].Warranty_till = t.Format("2006-01-02")
	}
	//================================
	b, err := json.Marshal(components)
	CheckErr(err)
	return b
}

func FilterComponents(category_id int) []byte {
	fmt.Println("------->caled <-------")
	sess := SetupDB()
	components := []DisplayAllComponents{}

	query := sess.Select("c.id, c.invoice_id, c.serial_no, c.name, c.active, c.description, c.warranty_till as Warranty_timestamp, machines.name as Machine, categories.category").
	From("components c").
		LeftJoin("machine_components", "c.id = machine_components.component_id").
		LeftJoin("machines", "machines.id = machine_components.machine_id").
		Join("categories", "c.category_id = categories.id")

		query.Where("c.deleted_at IS NULL AND c.category_id::text like '%%?%%'", category_id).
		// SQL,_ := query.ToSql()
		// fmt.Println("====>", SQL)
			LoadStruct(&components)

		fmt.Println("--->", components)

	//extract only date from timestamp========
	for i := 0; i < len(components); i++ {
		t := components[i].Warranty_timestamp
		components[i].Warranty_till = t.Format("2006-01-02")
	}
	//================================
	b, err := json.Marshal(components)
	CheckErr(err)
	return b
}

type DisplayComponentInfo struct {
	Incidents []Incidents
	User User
	Machine Machine
	Machine_component_id int
	Invoice_id int
	Invoice_number string
	Component string
	Description string
	Active string
	Status string
	Warranty_timestamp time.Time
	Warranty_till string

}

type Incidents struct {
	Id int
	Title string
	Description string
	Recorder string
	Status string
}

type Machine struct {
	Id int
	Name string
	Machine_component_id int
}

type User struct {
	Id int
	Name string
}

func DisplayComponentInformation(ComponentId int) []byte {
	sqlStmt := "invoices.id AS Invoice_id,"
	sqlStmt += "invoices.invoice_number,"
	sqlStmt += "components.name AS Component,"
	sqlStmt += "components.description,"
	sqlStmt += "components.active,"
	sqlStmt += "components.warranty_till As Warranty_timestamp"

	sess := SetupDB()
	components := DisplayComponentInfo{}

	err := sess.Select(sqlStmt).
		From("invoices").
		RightJoin("components", "invoices.id = components.invoice_id").
		Where("components.id= ?", ComponentId).
		LoadStruct(&components)
	CheckErr(err)

	//extract only date from timestamp========
		t := components.Warranty_timestamp
		components.Warranty_till = t.Format("2006-01-02")
	//================================

	components.Status = "Active"
	if(components.Active == "false"){
		components.Status = "Not Active"
	}

	//Get AllIncidents information happen with perticuler component ...
	incidents := []Incidents{}
	sess.Select("id, title, description, status, recorder").
		From("incidents").
		Where("Component_id = ?", ComponentId).
		LoadStruct(&incidents)

	//Get Machine Information to which component connected if connected ...
	machine := Machine{}
	sess.Select("machines.id, machines.Name, machine_components.id AS Machine_component_id").
		From("machines").
		Join("machine_components","machine_components.machine_id = machines.id").
		Where("machine_components.Component_id = ? AND machine_components.deleted_at IS NULL", ComponentId).
		OrderDir("machine_components.id", false).
		Limit(1).
		LoadStruct(&machine)

	//Get User's Information owned machine to which component connected if owned...
	if(machine.Name != "") {
		user := User{}
		sess.Select("users.id, users.name").
			From("users").
			LeftJoin("users_machine", "users.id = users_machine.user_id").
			Where("users_machine.machine_id = ?", machine.Id).
			LoadStruct(&user)
			components.User = user
	}

	//combine all information in one object and return it ...
	components.Incidents = incidents
	components.Machine = machine

	b, err5 := json.Marshal(components)
	CheckErr(err5)
	return b
}

type Components struct {
	Id int
	Name string
}






