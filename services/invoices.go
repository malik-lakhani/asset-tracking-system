package services

import(

	"encoding/json"

)

type AllInvoiceDetails struct {
	Number string `json:"number"`
	InvoicerDetails struct {
		Name string `json:"name"`
		Address string `json:"address"`
		Contact string `json:"contact"`
	} `json:"invoicer_details"`
	ComponentDetails struct {
		Name []string `json:"name"`
		Description []string `json:"description"`
		WarrantyTill []string `json:"warranty_till"`
	} `json:"component_details"`
	Description string `json:"description"`
	Date string `json:"date"`
}

type InvoiceDetails struct {
	InvoiceNumber string
	InvoicerName string
	Invoicer_add string
	Invoicer_contact string
	Description string
	InvoiceDate string
}

type ComponentsInfo struct {
	Name string
	Description string
	WarrantyTill string
	InvoiceId int64
	Active bool
}

func AddInvoice(details string) {
	var m AllInvoiceDetails
	err := json.Unmarshal([]byte(details), &m)//converting JSON Object to GO structure ...
	CheckErr(err)

	sess := SetupDB()
	i := InvoiceDetails{}
	i.InvoiceNumber = m.Number
	i.InvoicerName = m.InvoicerDetails.Name
	i.Invoicer_add = m.InvoicerDetails.Address
	i.Invoicer_contact = m.InvoicerDetails.Contact
	i.Description = m.Description
	i.InvoiceDate = m.Date

	_, err1 := sess.InsertInto("invoices").
		Columns("invoice_number", "invoicer_name", "invoicer_add", "invoicer_contact", "description", "invoice_date").
		Record(i).
		Exec()
	CheckErr(err1)

	recentInsertedId, err2 := sess.Select("MAX(id)").
		From("invoices").
		ReturnInt64()
	CheckErr(err2)

	c := ComponentsInfo{}
	c.InvoiceId = recentInsertedId
	c.Active = true

	for i := 0; i < len(m.ComponentDetails.Name); i++ {
		c.Name = m.ComponentDetails.Name[i]
		c.Description = m.ComponentDetails.Description[i]
		c.WarrantyTill = m.ComponentDetails.WarrantyTill[i]

		_, err3 := sess.InsertInto("components").
			Columns("invoice_id", "name", "warranty_till", "description", "active").
			Record(c).
			Exec()
		CheckErr(err3)
	}
}