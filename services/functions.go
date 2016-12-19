package services

import (
	"os"
	"github.com/improwised/cantaloupe/dbconfig"
	"github.com/gocraft/dbr"
)

func CheckErr(err error) {
	if err != nil {
		panic(err)
	}
}

type Configuration struct {
	DbName   string
	UserName string
}

//will return database connection string either for test or development and run migrations accoringly ...
func DbConnectionString() string {
	var path string
	Go_Env := (os.Getenv("GO_ENV2"))
	if Go_Env == "" {
		Go_Env = "settings"
		path = "./dbconfig/test-files/" + Go_Env + ".json"
	} else if Go_Env == "production" {
		path = "../dbconfig/test-files/" + Go_Env + ".json"
	} else if Go_Env == "testing" {
		path = "./dbconfig/test-files/" + Go_Env + ".json"
	}
	connectionString := dbconfig.PostgresConnectionString(path, "disable") // second parameter for sslmode
	return connectionString
}

func DbConneection() *dbr.Connection {
	connectionString := DbConnectionString()
	conn, _ := dbr.Open("postgres", connectionString, nil)
	return conn
}

var conn *dbr.Connection
func SetupDB() *dbr.Session {
	if(conn == nil) {
		conn = DbConneection()
	}

	// create a session for each business unit of execution
	sess := conn.NewSession(nil)
	return sess
}
