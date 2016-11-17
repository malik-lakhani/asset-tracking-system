package services

import (
				"encoding/json"
				// "fmt"
				"strings"
				"time"
)

type Categories struct {
	Id int
	Category string
	Description *string
	Deleted_at *time.Time
}

func AddNewCategory(category string, descritpion string) {
	sess := SetupDB()
	var m = Categories{}
	m.Category = category
	m.Description = &descritpion

	_, err := sess.InsertInto("categories").
		Columns("category", "description").
		Record(m).
		Exec()
	CheckErr(err)
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
