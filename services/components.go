package services

import(
		"time"
		"encoding/json"
)

type ComponentInfo struct {
	Id int
	Name string
	Invoice_id int
	Warranty_till *time.Time
	Description string
	Active bool
	Deleted_at *time.Time
}

func DisplayComponents(all string) []byte {
	sess := SetupDB()
	components := []ComponentInfo{}
	query := sess.Select("id, name, invoice_id, warranty_till, description, active, deleted_at").
		From("components")

	//display all components or active components only ...
	if(all == "false") {
		query.Where("deleted_at IS NULL").
					LoadStruct(&components)
	} else {
		query.LoadStruct(&components)
	}
	b, err := json.Marshal(components)
	CheckErr(err)
	return b
}