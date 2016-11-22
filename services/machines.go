package services

import (
	"encoding/json"
	"fmt"
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
 	Id *int
 	Name *string
 	SerialNo *string
 	Description *string
 	Warranty *time.Time
 	Warranty_till string
 	Created_at *time.Time
 	AddOn string
}

type AllIncidents struct {
 	Id *int
 	LastUpdate *string
 	Title *string
 	Description *string
 	Status *string
 	Recorder *string
}

type PastUses struct {
	Begin *time.Time
	BeginDate string
	End *time.Time
	EndDate string
	User *string

}

type AllInfoOfMachine struct {
	Id int
	Name string
	Machine string
	Created_at *time.Time
	UsingSince string

	Components[] AllComponents
	Incidents[] AllIncidents
	PastUses[] PastUses
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
		sql, _ := query2.ToSql()
		fmt.Println(sql)
		query2.LoadStruct(&machineInfo)

		t := machineInfo.Created_at
		machineInfo.UsingSince = t.Format("2006-01-02")
	//==================================
		fmt.Println("=>",machineInfo)
	//all information of machine's components ===========
	MachineComponents := []AllComponents{}
	query := sess.Select("components.id, components.name, components.serial_no, components.description, components.warranty_till AS Warranty, machine_components.created_at").
		From("components").
		Join("machine_components", "machine_components.component_id = components.id")

	query.Where("machine_components.machine_id = ?", machineId).
		LoadStruct(&MachineComponents)

	for i := 0; i < len (MachineComponents); i++ {
		time := MachineComponents[i].Created_at
		MachineComponents[i].AddOn = time.Format("2006-01-02")

		time2 := MachineComponents[i].Warranty
		MachineComponents[i].Warranty_till = time2.Format("2006-01-02")
	}

	incidents := []AllIncidents{}
	sess.Select("incidents.id, incidents.title, incidents.description, incidents.status, incidents.recorder").
		From("incidents").
		LeftJoin("components", "incidents.component_id=components.id").
		LeftJoin("machine_components", "machine_components.component_id=components.id").
		Where("machine_components.machine_id = ?", machineId).
		LoadStruct(&incidents)

	pastUses := []PastUses{}
	sess.Select("users_machine.created_at AS Begin, users_machine.deleted_at AS End, users.name AS User").
		From("users_machine").
		Join("users", "users_machine.user_id = users.id").
		Where("users_machine.machine_id = ?", machineId).
		LoadStruct(&pastUses)

		for i := 0; i < len(pastUses); i++ {
			t2 := pastUses[i].Begin
			pastUses[i].BeginDate = t2.Format("2006-01-02")

			t3 := pastUses[i].End
			pastUses[i].EndDate = t3.Format("2006-01-02")
		}

	//merge all info of machine and it's components in single object=======
	machineInfo.PastUses = pastUses
	machineInfo.Incidents = incidents
	machineInfo.Components = MachineComponents
	//============================================

	b, err := json.Marshal(machineInfo)
	CheckErr(err)
	return b
}

type MachineComponents struct {
	MachineId int
	ComponentId int
}

func AddComponentsToMachine(machineId int, componentId int) {
	sess := SetupDB()
	m := MachineComponents{}
	m.MachineId = machineId
	m.ComponentId = componentId
	_, err := sess.Update("machine_components").
		Set("deleted_at", "NOW()").
		Where("component_id = ?", componentId).
		Exec()
	CheckErr(err)

	_, err2 := sess.InsertInto("machine_components").
		Columns("machine_id", "component_id").
		Record(m).
		Exec()
	CheckErr(err2)

	_, err3 := sess.Update("components").
		Set("active", "true").
		Where("id = ?", componentId).
		Exec()
		CheckErr(err3)
}

func RemoveComponentsFromMachine(machineId int, componentId int) {
	sess := SetupDB()
	_, err := sess.Update("machine_components").
		Set("deleted_at", "NOW()").
		Where("component_id = ?", componentId).
		Exec()
	CheckErr(err)

	_, err2 := sess.Update("components").
		Set("active", false).
		Where("id = ?", componentId).
		Exec()
	CheckErr(err2)
}

func ChangeUserFromMachine(machineId int, userId int) {
	sess := SetupDB()
	_, err := sess.Update("users_machine").
		Set("deleted_at", "NOW()").
		Where("machine_id = ? AND user_id = ?" ,machineId, userId).
		Exec()
	CheckErr(err)
}

