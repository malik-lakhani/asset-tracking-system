package main

import (
			"fmt"
			"github.com/zenazn/goji"
			_"github.com/lib/pq"
			"github.com/zenazn/goji/web"
			"net/http"
			"strconv"
			"encoding/json"
			"./services"
 )

func invoiceHandler(c web.C, w http.ResponseWriter, r *http.Request) {

}

func addMachineHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	machineName := r.FormValue("machineName")
	services.AddNewMachine(machineName)
}

func editMachineHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	machineId, err := strconv.Atoi(r.FormValue("machineId"))
	services.CheckErr(err)
	machineName := r.FormValue("machineName")
	services.EditMachine(machineId, machineName)
}

func deleteMachineHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	machineId, err := strconv.Atoi(r.FormValue("machineId"))
	services.CheckErr(err)
	services.DeleteMachine(machineId)
}

func DisplayMachinesHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	// either all machines or deleted only.0 will be for deleted machine while 1 for all active machines ..
	machinesToBeDisplay, err := strconv.Atoi(r.FormValue("type"))
	services.CheckErr(err)
	displayMachines := services.DisplayMachines(machinesToBeDisplay)
	w.Write(displayMachines)
}


func main() {
	// goji.Get("/", machinesHandler)
	goji.Post("/invoice", invoiceHandler)
	//machines
	goji.Post("/machine/add", addMachineHandler)
	goji.Put("/machine/edit", editMachineHandler)
	goji.Delete("/machine/delete", deleteMachineHandler)
	goji.Post("/machines", DisplayMachinesHandler)

	//users
	goji.Post("/user/add", addUserHandler)
	goji.Put("/user/edit", editUSerHandler)
	goji.Delete("/user/delete", deleteUserHandler)
	goji.Post("/users", DisplayUsersHandler)

	goji.Serve()
}