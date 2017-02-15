package services

import (
  "github.com/gocraft/dbr"
  "github.com/improwised/cantaloupe/dbconfig"
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

func DbConneection() *dbr.Connection {
  connectionString := dbconfig.PostgresConnectionString("disable")
  conn, _ := dbr.Open("postgres", connectionString, nil)
  return conn
}

var conn *dbr.Connection

func SetupDB() *dbr.Session {
  if conn == nil {
    conn = DbConneection()
  }

  // create a session for each business unit of execution
  sess := conn.NewSession(nil)
  return sess
}
