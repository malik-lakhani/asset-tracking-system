package services

import (
	"encoding/json"
	"strings"
	"time"
)

type Categories struct {
	Id int64
	Category string
	Description *string
	Deleted_at *time.Time
}

func AddNewCategory(category string, descritpion string) []byte {
	sess := SetupDB()
	var m = Categories{}
	m.Category = category
	m.Description = &descritpion

	_, err := sess.InsertInto("categories").
		Columns("category", "description").
		Record(m).
		Exec()
	CheckErr(err)

	//get id of inserted category ...
	lastInsertedId, err := sess.Select("MAX(id)").
		From("categories").
		ReturnInt64()

	m.Id = lastInsertedId
	b, err := json.Marshal(m)
	CheckErr(err)
	return b
}

func EditCategoryInfo(categoryId int, category string, descritpion string) {
	sess := SetupDB()

	_, err := sess.Update("categories").
		Set("category", category).
		Set("description", descritpion).
		Set("modified_at", "NOW()").
		Where("id = ?", categoryId).
		Exec()
	CheckErr(err)
}

func DeleteCategory(CategoryIds string) {
	ids := strings.Split(CategoryIds, ",")
	sess := SetupDB()

	//deleting mulitple users ======
	for i := 0; i<len(ids); i++  {
		_, err := sess.Update("categories").
		Set("deleted_at", "NOW()").
		Where("id = ?", ids[i]).
		Exec()
		CheckErr(err)
	}
	//==============================

}

func DisplayCategories(allCategories string) []byte { // Display one User's Information ..
	sess := SetupDB()
	categories := []Categories{}
	query := sess.Select("id, category, description").
		From("categories")

	//display all users or active users only ...
	if(allCategories == "false") {
		query.Where("deleted_at IS NULL").
			LoadStruct(&categories)
	} else {
		query.LoadStruct(&categories)
	}

	b, err := json.Marshal(categories)
	CheckErr(err)
	return b
}
