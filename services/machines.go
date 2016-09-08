package services

import (
	"encoding/json"
	"io"
	"log"
	"strconv"
	"strings"
	"time"


)

type MachineInfo struct{
	Id int
	Name string
	Deleted_at *time.Time
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

func DeleteMachine(id int) {
	sess := SetupDB()
	_, err := sess.Update("machines").
		Set("deleted_at", "NOW()").
		Where("id = ?", id).
		Exec()
	CheckErr(err)
}

func DisplayMachines(allMachiens string) []byte {
	sess := SetupDB()
	machinesInfo := []MachineInfo{}
	query := sess.Select("id, name, deleted_at").
		From("machines")

	//display all machines or active machines only ...
	if(allMachiens == "false") {
		query.Where("deleted_at IS NULL").
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
	sess.Select("id, name, deleted_at").
		From("machines").
		Where("id = ?", id).
		LoadStruct(&machineInfo)

	b, err := json.Marshal(machineInfo)
	CheckErr(err)
	return b
}

type Components struct{
 	Id int
 	Name string
	Deleted_at *time.Time
}

type MachinesComponentInfo struct{
	Components []Components
	MachineName string
	MachineId int
}

func DisplayMachineComponents(machineId int, allComponents string) []byte {
	sess := SetupDB()
	//all machine's information ....========
	machineInfo := MachineInfo{}
	err := sess.Select("id, name").From("machines").
		Where("id = ?", machineId).
		LoadStruct(&machineInfo)
	CheckErr(err)
	//==================================

	//all information of machine's components ===========
	MachineComponents := []Components{}
	query := sess.Select("machine_components.id, machine_components.deleted_at, components.name").
		From("machine_components").
		LeftJoin("components", "machine_components.component_id = components.id")

	if(allComponents == "false") {//display only active components ....
		query.Where("machine_components.machine_id = ? AND machine_components.deleted_at IS NULL", machineId).
					LoadStruct(&MachineComponents)
	} else {// display all components ...
		query.Where("machine_components.machine_id = ?", machineId).
					LoadStruct(&MachineComponents)//defaults it will display only active components ...
	}
	//=============================================

	//merge all info of machine and it's components in single object=======
	allInfo := MachinesComponentInfo{}
	allInfo.MachineId = machineInfo.Id
	allInfo.MachineName = machineInfo.Name
	allInfo.Components = MachineComponents
	//============================================

	b, err := json.Marshal(allInfo)
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

