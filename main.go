package main

import (

		"strconv"
		"net/http"

		"./services"
		_"github.com/lib/pq"
		"github.com/zenazn/goji"
		_"github.com/gocraft/dbr"
		"github.com/zenazn/goji/web"
 )

func usersHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	all := r.URL.Query().Get("all")//either display all users or only active users ...
	if all != "true"{//true for display all users ...
		all = "false" // false for display only active users ...
	} // default it will display active users only ...
	b := services.DisplayUsers(all)
	w.Write([]byte(b))
}

func addUserHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	name := r.FormValue("name")
	company_email := r.FormValue("company_email")
	machine_id, err := strconv.Atoi(r.FormValue("machine_id"))
	services.CheckErr(err)
	services.AddNewUser(name, company_email, machine_id)
}

func editUserInfoHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	user_id, err := strconv.Atoi(c.URLParams["user_id"])
	updated_data := r.FormValue("information")
	services.CheckErr(err)
	services.EditUserInfo(user_id, updated_data)
}

func deleteUserHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	user_id, err := strconv.Atoi(c.URLParams["user_id"])
	services.CheckErr(err)
	services.DeleteUser(user_id)
}

func displayOneUserHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	user_id, err := strconv.Atoi(c.URLParams["user_id"])
	services.CheckErr(err)
	b := services.DisplayUser(user_id)
	w.Write([]byte(b))
}

func machinesHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	all := r.URL.Query().Get("all") //either display all machines or only active machines ...
	if all != "true"{
		all = "false"
	}
	b := services.DisplayMachines(all)
	w.Write([]byte(b))
}

func addMachineHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	name := r.FormValue("name")
	services.AddNewMachine(name)
}

func editMachineHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(c.URLParams["machine_id"])
	services.CheckErr(err)
	name := r.FormValue("name")
	services.EditMachineInfo(id, name)
}

func deleteMachineHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(c.URLParams["machine_id"])
	services.CheckErr(err)
	services.DeleteMachine(id)
}

func displayMachineHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(c.URLParams["machine_id"])
	services.CheckErr(err)
	services.DisplayMachine(id)
}

func machineComponentsHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(c.URLParams["machine_id"])
	services.CheckErr(err)
	all := r.URL.Query().Get("all") //either display all components or only active components ...
	if all != "true"{
		all = "false"
	}
	response := services.DisplayMachineComponents(id, all)
	w.Write([]byte(response))
}

func addComponentsToMachine(c web.C, w http.ResponseWriter, r *http.Request) {
	machine_id, err := strconv.Atoi(c.URLParams["machine_id"])
	services.CheckErr(err)
	components_details := r.FormValue("information")
	services.AddComponentsToMachine(machine_id, components_details)
}

func removeComponentsFromMachine(c web.C, w http.ResponseWriter, r *http.Request) {
	machine_id, err := strconv.Atoi(c.URLParams["machine_id"])
	services.CheckErr(err)
	component_id, err2 := strconv.Atoi(c.URLParams["component_id"])
	services.CheckErr(err2)
	services.RemoveComponentsFromMachine(machine_id, component_id)
}

func changeUserFromMachine(c web.C, w http.ResponseWriter, r *http.Request) {
	machine_id, err := strconv.Atoi(c.URLParams["machine_id"])
	services.CheckErr(err)
	user_id, err2 := strconv.Atoi(c.URLParams["user_id"])
	services.CheckErr(err2)
	services.ChangeUserFromMachine(machine_id, user_id)
}

func addInvoiceHandler(c web.C, w http.ResponseWriter, r *http.Request) {

}

func incidentsHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	response := services.DisplayIncidents()
	w.Write([]byte(response))
}

func addIncidentHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	component_id, err :=  strconv.Atoi(r.FormValue("component_id"))
	services.CheckErr(err)
	title := r.FormValue("title")
	description := r.FormValue("description")
	services.AddIncident(component_id, title, description)
}

func editIncidentHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	incident_id, err := strconv.Atoi(c.URLParams["incidents_id"])
	services.CheckErr(err)
	componentId, err2 :=  strconv.Atoi(r.FormValue("component_id"))
	services.CheckErr(err2)
	title := r.FormValue("title")
	description := r.FormValue("description")
	services.EditIncident(incident_id, componentId, title, description)
}

func deleteIncidentHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	incident_id, err := strconv.Atoi(c.URLParams["incidents_id"])
	services.CheckErr(err)
	services.DeleteIncident(incident_id)
}

func displayIncidentHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	incidents_id, err := strconv.Atoi(c.URLParams["incidents_id"])
	services.CheckErr(err)
	response := services.DisplayIncident(incidents_id)
	w.Write([]byte(response))
}

func incidentsUpdateHandler(c web.C, w http.ResponseWriter, r *http.Request) {

}

func componentsHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	all := r.URL.Query().Get("all") //either display all components or only active components ...
	if all != "true"{
		all = "false"
	}
	response := services.DisplayComponents(all)
	w.Write([]byte(response))
}


func main() {
	//dealing with users ...
	goji.Get("/users", usersHandler)
	goji.Post("/users", addUserHandler)
	goji.Patch("/users/:user_id", editUserInfoHandler)
	goji.Delete("/users/:user_id", deleteUserHandler)
	goji.Get("/users/:user_id", displayOneUserHandler)

	//dealing with machines, it's user and its components ...
	goji.Get("/machines", machinesHandler)
	goji.Post("/machines", addMachineHandler)
	goji.Patch("/machines/:machine_id", editMachineHandler)
	goji.Delete("/machines/:machine_id", deleteMachineHandler)
	goji.Get("/machines/:machine_id", displayMachineHandler)
	goji.Get("/machines/:machine_id/components", machineComponentsHandler)
	goji.Post("/machines/:machine_id/components", addComponentsToMachine)
	goji.Delete("/machines/:machine_id/components/:component_id", removeComponentsFromMachine)
	goji.Delete("/machines/:machine_id/users/:user_id", changeUserFromMachine)

	//dealing with invoice ...
	goji.Post("/invoices", addInvoiceHandler)

	//dealing with incidents ...
	goji.Get("/incidents", incidentsHandler)
	goji.Post("/incidents", addIncidentHandler)
	goji.Patch("/incidents/:incidents_id", editIncidentHandler)
	goji.Delete("/incidents/:incidents_id", deleteIncidentHandler)
	goji.Get("/incidents/:incidents_id", displayIncidentHandler)
	goji.Post("/incidents/:incidents_id/update", incidentsUpdateHandler)

	//dealing with components ...
	goji.Get("/components", componentsHandler)

	goji.Serve()
}