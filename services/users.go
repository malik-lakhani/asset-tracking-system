package services

import (
				"encoding/json"
				"io"
				"log"
				"strings"
				"time"
)

// sess *dbr.Session = SetupDB()
type UserInformation struct	{
	Id int
	Name string
	Machine_id int
	Machine_name string
	Company_email string
	Deleted_at time.Time
}

type UsersMachine struct {
	User_id int64
	Machine_id int
}

func AddNewUser(name string, email string, machineId int) {
	sess := SetupDB()
	addUser := UserInformation{}
	addUser.Name = name
	addUser.Company_email = email
	addUser.Machine_id = machineId

	_, err := sess.InsertInto("users").
		Columns("name", "company_email").
		Record(addUser).
		Exec()
	CheckErr(err)

	//get id of inserted user ...
	lastInsertedId, err := sess.Select("MAX(id)").
		From("users").
		ReturnInt64()

	addUserMachine := UsersMachine{}
	addUserMachine.User_id = lastInsertedId
	addUserMachine.Machine_id = machineId
	// Insert user's machine's information ...
	_, err1 := sess.InsertInto("users_machine").
		Columns("user_id", "machine_id").
		Record(addUserMachine).
		Exec()
	CheckErr(err1)
}

type TemporaryUserInfo struct {
	Name, Company_email, Machine_id, Machine string
}

func EditUserInfo(userId int, info string) {
	sess := SetupDB()
	dec := json.NewDecoder(strings.NewReader(info))
	var m TemporaryUserInfo // decode updated information in temp structure ...
	for {
		if err := dec.Decode(&m); err == io.EOF {
			break
		} else if err != nil {
			log.Fatal(err)
		}
	}
	_, err := sess.Update("users").
		Set("name", m.Name).
		Set("company_email", m.Company_email).
		Set("modified_at", "NOW()").
		Where("id = ?", userId).
		Exec()
	CheckErr(err)
}

func DeleteUser(userId int) {
	sess := SetupDB()
	_, err := sess.Update("users").
		Set("deleted_at", "NOW()").
		Where("id = ?", userId).
		Exec()
	CheckErr(err)
}

func DisplayUser(userId int) []byte {
	sess := SetupDB()
	userInfo := UserInformation {}
	err := sess.Select("users.id, users.name, users.company_email, users_machine.machine_id, machines.name as Machine_name").
		From("users").
		LeftJoin("users_machine", "users.id = users_machine.user_id").
		LeftJoin("machines", "users_machine.machine_id = machines.id").
		Where("users.id = ?", userId).LoadStruct(&userInfo)
	CheckErr(err)

	b, err := json.Marshal(userInfo)
	CheckErr(err)
	return b
}

func DisplayUsers(allUsers string) []byte { // Display one User's Information ..
	sess := SetupDB()
	usersInfo := []UserInformation{}
	query := sess.Select("users.id, users.name, users.company_email, users_machine.machine_id, machines.name as Machine_name").
		From("users").
		LeftJoin("users_machine", "users.id = users_machine.user_id").
		LeftJoin("machines", "users_machine.machine_id = machines.id")

	//display all users or active users only ...
	if(allUsers == "false") {
		query.Where("users.deleted_at IS NULL").
					LoadStruct(&usersInfo)
	} else {
		query.LoadStruct(&usersInfo)
	}
	b, err := json.Marshal(usersInfo)
	CheckErr(err)

	return b
}