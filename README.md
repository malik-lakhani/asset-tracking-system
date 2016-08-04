# Tracker

Internal Software for Tracking and Maintain different Components.

# Development

## Dependencies
* Go 1.6
* [Glide](https://github.com/Masterminds/glide) - Package manager for Go
* PostgreSQL 9.4.4+

## Installation
* Setup go workspace by following this [Guide](https://golang.org/doc/code.html#Organization)
* Set Go vendor flag. Add the following to your `.bashrc` or `.zshrc` along with `$GOPATH` above
```
export GO15VENDOREXPERIMENT=1
```
* Install dependencies
```
$ glide install
```
* Create Database
```
$ create database ats
```
* Database Migration
```
$ go run ./db/migration.go
```