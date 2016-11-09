package services

import (
	"encoding/json"
	// "fmt"
	"io"
	"log"
	"strconv"
	"strings"
	"time"
)

type MachineInfo struct{
	Id *int
	Name string
	User *string
	Deleted_at *time.Time
	UserId *int
	UserName *string
}

func AddNewMachine(name string) {
	sess := SetupDB()
	addMachine := MachineInfo{}
	addMachine.Name = name

	// Insert new machine ...
	_, err := sess.InsertInto("machines").
		Columns("name").
		Record(addMachine).
		Exec()
	CheckErr(err)
}

func EditMachineInfo(id int, name string) {
	sess := SetupDB()
	_, err := sess.Update("machines").
		Set("name", name).
		Set("modified_at", "NOW()").
		Where("id = ?", id).
		Exec()
	CheckErr(err)
}

func DeleteMachine(machineIds string) {
	ids := strings.Split(machineIds, ",")
	sess := SetupDB()

	//deleting mulitple users ======
	for i := 0; i<len(ids); i++  {
		_, err := sess.Update("machines").
		Set("deleted_at", "NOW()").
		Where("id = ?", ids[i]).
		Exec()
		CheckErr(err)
	}
	//==============================

}

func DisplayMachines(allMachiens string) []byte {
	sess := SetupDB()
	machinesInfo := []MachineInfo{}

	query := sess.Select("machines.id, users.name as User, machines.name").
		From("machines").
    LeftJoin("users_machine", "machines.id = users_machine.machine_id").
    LeftJoin("users", "users.id = users_machine.user_id")

	//display all machines or active machines only ...
	if(allMachiens == "false") {
		query.Where("machines.deleted_at IS NULL").
					LoadStruct(&machinesInfo)
	} else {
		query.LoadStruct(&machinesInfo)
	}
	b, err := json.Marshal(machinesInfo)
	CheckErr(err)
	return b
}

func DisplayMachine(id int) []byte { // Display Single machine's information ...
	sess := SetupDB()
	machineInfo := MachineInfo{}

	sess.Select("u.id, u.name, machines.name").
		From("users u").
	    LeftJoin("users_machine", "u.id = users_machine.user_id").
	    LeftJoin("machines", "machines.id = users_machine.machine_id").
		Where("u.id = 1").
		LoadStruct(&machineInfo)

	b, err := json.Marshal(machineInfo)
	CheckErr(err)
	return b
}

type AllComponents struct {
 	Id int
 	Name string
 	SerialNo string
 	Description string
 	Warranty_till string
 	Created_at string
}

type AllIncidents struct {
 	Id int
 	LastUpdate string
 	Title string
 	Description string
 	Status string
}

type PastUses struct {
	Begin string
	End string
	User string
}

type AllInfoOfMachine struct {
	Components[] AllComponents
	Incidents[] AllIncidents
	PastUses[] PastUses

	Id *int
	Name *string
	Machine *string
	Created_at time.Time
	UsingSince string
}

func DisplayMachineComponents(machineId int, allComponents string) []byte {
	sess := SetupDB()
	//all machine's information ....========
	machineInfo := AllInfoOfMachine{}
	query2 := sess.Select("machines.id, machines.name AS Machine, users_machine.created_at, users.name, users.id AS UserId").
		From("machines").
		LeftJoin("users_machine","users_machine.machine_id = machines.id").
		LeftJoin("users","users_machine.user_id = users.id").
		Where("machines.id = ? AND users_machine.deleted_at IS NULL", machineId)

		query2.LoadStruct(&machineInfo)

		t := machineInfo.Created_at
		machineInfo.UsingSince = t.Format("2006-01-02")
	//==================================

	//all information of machine's components ===========
	MachineComponents := []AllComponents{}
	query := sess.Select("components.id, components.name, components.serial_no, components.description, components.warranty_till, machine_components.created_at").
		From("components").
		Join("machine_components", "machine_components.component_id = components.id")

	query.Where("machine_components.machine_id = ?", machineId).
			LoadStruct(&MachineComponents)

	incidents := []AllIncidents{}
	sess.Select("incidents.id, incidents.title, incidents.description, incidents.status").
		From("incidents").
		LeftJoin("components", "incidents.component_id=components.id").
		LeftJoin("machine_components", "machine_components.component_id=components.id").
		Where("machine_components.machine_id = ?", machineId).
		LoadStruct(&incidents)

	pastUses := []PastUses{}
	sess.Select("users_machine.created_at AS Begin, users_machine.deleted_at AS End, users.name AS User").
		From("users_machine").
		Join("users", "users_machine.user_id = users.id").
		Where("users_machine.machine_id = ? AND users_machine.deleted_at IS NULL", machineId).
		LoadStruct(&pastUses)

	//merge all info of machine and it's components in single object=======
	machineInfo.PastUses = pastUses
	machineInfo.Incidents = incidents
	machineInfo.Components = MachineComponents
	//============================================

	b, err := json.Marshal(machineInfo)
	CheckErr(err)
	return b
}

type MachineComponents struct{
	Id, Machine_id, Name, Component_id, Component_name string
	Components_id, Components_name []string
}

func AddComponentsToMachine(machineId int, componentsInfo string) {
	sess := SetupDB()
	dec := json.NewDecoder(strings.NewReader(componentsInfo))
	var m MachineComponents // decode all information in structure ...
	for {
		if err := dec.Decode(&m); err == io.EOF {
			break
		} else if err != nil {
			log.Fatal(err)
		}
	}
	m.Machine_id = strconv.Itoa(machineId)

	for i := 0; i < len(m.Components_id); i++ { //will insert all component one by one for machine ...
		m.Component_id = string(m.Components_id[i]) //will assign one by one component id from array of id to insert separately  ...
		_, err := sess.InsertInto("machine_components").
			Columns("machine_id", "component_id").
			Record(m).
			Exec()
		CheckErr(err)

		_, err2 := sess.Update("components").
			Set("active", "true").
			Where("id = ?", m.Component_id).
			Exec()
		CheckErr(err2)
	}
}

func RemoveComponentsFromMachine(machineId int, componentId int) {
	sess := SetupDB()
	_, err := sess.Update("machine_components").
		Set("deleted_at", "NOW()").
		Where("machine_id = ? AND component_id = ?" ,machineId, componentId).
		Exec()
	CheckErr(err)
}

func ChangeUserFromMachine(machineId int, userId int) {
	sess := SetupDB()
	_, err := sess.Update("users_machine").
		Set("deleted_at", "NOW()").
		Where("machine_id = ? AND user_id = ?" ,machineId, userId).
		Exec()
	CheckErr(err)
}

