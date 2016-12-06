package main

import (
	"io/ioutil"
	"net/http"
	"strconv"
	_"github.com/lib/pq"
	"github.com/zenazn/goji"
	_"github.com/gocraft/dbr"
	"github.com/zenazn/goji/web"
	"github.com/rs/cors"

	"./services"
)

func usersHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	all := r.URL.Query().Get("all")//either display all users or only active users ...
	if all != "true"{//true for display all users ...
		all = "false" // false for display only active users ...
	} // default it will display active users only ...
	b := services.DisplayUsers(all)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(b))
}

func addUserHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	name := r.FormValue("name")
	company_email := r.FormValue("company_email")
	machine_id := r.FormValue("machine_id")
	response := services.AddNewUser(name, company_email, machine_id) //PATH : /services/users.go
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(response))
}

func editUserInfoHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	user_id, err := strconv.Atoi(c.URLParams["user_id"]) // converting from string to int ...
	name := r.FormValue("name")
	company_email := r.FormValue("company_email")
	machine_id := r.FormValue("machine_id")
	services.CheckErr(err)
	services.EditUserInfo(user_id, name, company_email, machine_id) //PATH : /services/users.go
}

func deleteUserHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	ids := c.URLParams["user_id"]
	services.DeleteUser(ids) //PATH : /services/users.go
}

func displayOneUserHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	user_id, err := strconv.Atoi(c.URLParams["user_id"]) // converting from string to int ...
	services.CheckErr(err)
	b := services.DisplayUser(user_id) //PATH : /services/users.go
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(b))
}

func machinesHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	all := r.URL.Query().Get("all") //either display all machines or only active machines ...
	if all != "true"{
		all = "false"
	}
	b := services.DisplayMachines(all) //PATH : /services/machines.go
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(b))
}

func addMachineHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	name := r.FormValue("name")
	response := services.AddNewMachine(name) //PATH : /services/machines.go
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(response))
}

func editMachineHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(c.URLParams["machine_id"]) // converting from string to int ...
	services.CheckErr(err)
	name := r.FormValue("name")
	services.EditMachineInfo(id, name) //PATH : /services/machines.go
}

func deleteMachineHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	ids := c.URLParams["machine_id"]
	services.DeleteMachine(ids) //PATH : /services/machines.go
}

func displayMachineHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(c.URLParams["machine_id"]) // converting from string to int ...
	services.CheckErr(err)
	services.DisplayMachine(id) //PATH : /services/machines.go
}

func machineComponentsHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(c.URLParams["machine_id"]) // converting from string to int ...
	services.CheckErr(err)
	all := r.URL.Query().Get("all") //either display all components or only active components ...
	if all != "true"{
		all = "false"
	}
	response := services.DisplayMachineComponents(id, all) //PATH : /services/machines.go
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(response))
}

func addComponentsToMachine(c web.C, w http.ResponseWriter, r *http.Request) {
	machine_id, err := strconv.Atoi(c.URLParams["machine_id"]) // converting from string to int ...
	services.CheckErr(err)
	component_id, err := strconv.Atoi(r.FormValue("component_id")) // converting from string to int ...
	services.CheckErr(err)
	services.AddComponentsToMachine(machine_id, component_id) //PATH : /services/machines.go
}

func removeComponentsFromMachine(c web.C, w http.ResponseWriter, r *http.Request) {
	machine_id, err := strconv.Atoi(c.URLParams["machine_id"]) // converting from string to int ...
	services.CheckErr(err)
	component_id, err2 := strconv.Atoi(c.URLParams["component_id"]) // converting from string to int ...
	services.CheckErr(err2)
	services.RemoveComponentsFromMachine(machine_id, component_id) //PATH : /services/machines.go
}

func changeUserFromMachine(c web.C, w http.ResponseWriter, r *http.Request) {
	machine_id, err := strconv.Atoi(c.URLParams["machine_id"]) // converting from string to int ...
	services.CheckErr(err)
	user_id, err2 := strconv.Atoi(c.URLParams["user_id"]) // converting from string to int ...
	services.CheckErr(err2)
	services.ChangeUserFromMachine(machine_id, user_id) //PATH : /services/machines.go
}

func invoiceHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	b := services.DisplayInvoices() //PATH : /services/invoices.go
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(b))
}

func addInvoiceHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	body, err3 := ioutil.ReadAll(r.Body) // read all dara of form ...
	services.CheckErr(err3)
	services.AddInvoice(string(body)) //PATH : /services/invoices.go
}

func editInvoiceHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	invoice_id, err := strconv.Atoi(c.URLParams["invoice_id"]) // converting from string to int ...
	services.CheckErr(err)
	invoice := r.FormValue("invoice")
	invoicer := r.FormValue("invoicer")
	address := r.FormValue("address")
	contact := r.FormValue("contact")
	description := r.FormValue("description")
	date := r.FormValue("date")
	services.EditInvoice(invoice_id, invoice, invoicer, address, contact, description, date) //PATH : /services/invoices.go
}

func oneInvoiceDetailsHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	invoice_id, err := strconv.Atoi(c.URLParams["invoice_id"]) // converting from string to int ...
	services.CheckErr(err)
	b := services.DisplayOneInvoice(invoice_id) //PATH : /services/invoices.go
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(b))
}

func incidentsHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	all := r.URL.Query().Get("all")//either display all users or only active users ...
	if all != "true"{//true for display all incidents ...
		all = "false" // false for display only active incidents ...
	} // default it will display active incidents only ...
	response := services.DisplayIncidents(all) //PATH : /services/incidents.go
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(response))
}

func addIncidentHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body) // read all dara of form ...
	services.CheckErr(err)
	services.AddIncident(string(body)) //PATH : /services/incidents.go
}

func editIncidentHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	incident_id, err := strconv.Atoi(c.URLParams["incident_id"]) // converting from string to int ...
	services.CheckErr(err)
	componentId := r.FormValue("component_id")
	title := r.FormValue("title")
	description := r.FormValue("description")
	recorder := r.FormValue("recorder")
	services.EditIncident(incident_id, componentId, recorder, title, description) //PATH : /services/incidents.go
}

func deleteIncidentHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	incident_id, err := strconv.Atoi(c.URLParams["incident_id"]) // converting from string to int ...
	services.CheckErr(err)
	services.DeleteIncident(incident_id) //PATH : /services/incidents.go
}

func displayIncidentHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	incident_id, err := strconv.Atoi(c.URLParams["incident_id"]) // converting from string to int ...
	services.CheckErr(err)
	response := services.DisplayIncident(incident_id) //PATH : /services/incidents.go
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(response))
}

func incidentsUpdateHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	isResolved := r.URL.Query().Get("resolved")
	incident_id, err := strconv.Atoi(c.URLParams["incident_id"]) // converting from string to int ...
	services.CheckErr(err)
	description := r.FormValue("description")
	resolvedBy := r.FormValue("resolvedBy")
	services.IncidentUpdates(incident_id, resolvedBy, description, isResolved) //PATH : /services/incidents.go
}

func addComponentHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	incident_id, err := strconv.Atoi(c.URLParams["incident_id"]) // converting from string to int ...
	services.CheckErr(err)
	description := r.FormValue("description")
	resolvedBy := r.FormValue("resolvedBy")
	serialNo := r.FormValue("serialNo")
	component := r.FormValue("component")
	categoryId, err2 := strconv.Atoi(r.FormValue("category"))
	services.CheckErr(err2)
	warranty := r.FormValue("warranty")
	services.IncidentAddComponent(incident_id, resolvedBy, categoryId, component, serialNo, warranty, description) //PATH : /services/incidents.go
}

func incidentInfoHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	incident_id, err := strconv.Atoi(c.URLParams["incident_id"]) // converting from string to int ...
	services.CheckErr(err)
	response := services.IncidentInformations(incident_id) //PATH : /services/incidents.go
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(response))
}

func componentsHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	all := r.URL.Query().Get("all") //either display all components or only active components ...
	if all != "true"{
		all = "false"
	}
	response := services.DisplayComponents(all) //PATH : /services/components.go
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(response))
}

func filterComponentsHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	category, err := strconv.Atoi(r.URL.Query().Get("category_id")) // converting from string to int ...
	services.CheckErr(err)
	response := services.FilterComponents(category) //PATH : /services/components.go
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(response))
}

func componentInfoHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	component_id, err := strconv.Atoi(c.URLParams["component_id"]) // converting from string to int ...
	services.CheckErr(err)
	response := services.DisplayComponentInformation(component_id) //PATH : /services/components.go
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(response))
}

func categoriesHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	all := r.URL.Query().Get("all")//either display all users or only active users ...
	if all != "true"{//true for display all users ...
		all = "false" // false for display only active users ...
	} // default it will display active users only ...
	b := services.DisplayCategories(all)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(b))
}

func addCategoryHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	category := r.FormValue("category")
	description := r.FormValue("description")
	response := services.AddNewCategory(category, description) //PATH : /services/category.go
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(response))
}

func editCategoryInfoHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	category_id, err := strconv.Atoi(c.URLParams["category_id"]) // converting from string to int ...
	category := r.FormValue("category")
	description := r.FormValue("description")
	services.CheckErr(err)
	services.EditCategoryInfo(category_id, category, description) //PATH : /services/users.go
}

func deleteCategoryHandler(c web.C, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

	ids := c.URLParams["category_id"]
	services.DeleteCategory(ids) //PATH : /services/users.go
}

func main() {

//======= Middleware for AJAX Requsests ========================================
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowCredentials: true,
		AllowedMethods: []string{"GET", "POST", "PATCH", "DELETE"},
		AllowedHeaders: []string{"*"},
	})

	goji.Use(c.Handler)
//==============================================================================

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

	//dealing with invoices ...
	goji.Post("/invoices", addInvoiceHandler)
	goji.Get("/invoices", invoiceHandler)
	goji.Get("/invoices/:invoice_id", oneInvoiceDetailsHandler)
	goji.Patch("/invoices/:invoice_id", editInvoiceHandler)

	//dealing with incidents and its updates ...
	goji.Get("/incidents", incidentsHandler)
	goji.Post("/incidents", addIncidentHandler)
	goji.Patch("/incidents/:incident_id", editIncidentHandler)
	goji.Delete("/incidents/:incident_id", deleteIncidentHandler)
	goji.Get("/incidents/:incident_id", displayIncidentHandler)
	goji.Get("/incidents/:incident_id/incidentInfo", incidentInfoHandler)
	goji.Post("/incidents/:incident_id/update", incidentsUpdateHandler)
	goji.Post("/incidents/:incident_id/addComponent", addComponentHandler)

	//dealing with components ...
	goji.Get("/components", componentsHandler)
	goji.Get("/components/categories", categoriesHandler)
	goji.Get("/components/filter", filterComponentsHandler)
	goji.Get("/components/:component_id", componentInfoHandler)
	goji.Post("/components/categories", addCategoryHandler)
	goji.Patch("/components/categories/:category_id", editCategoryInfoHandler)
	goji.Delete("/components/categories/:category_id", deleteCategoryHandler)

	goji.Serve()
}
