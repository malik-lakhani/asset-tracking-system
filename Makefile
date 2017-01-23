BUILDPATH=$(CURDIR)
GO=$(shell which go)
GOBUILD=$(GO) build
GOCLEAN=$(GO) clean
GOGET=glide up
GOTEST=$(GO) test -v

EXENAME=main

export GOPATH= $(HOME)/goWorkspace
export GO15VENDOREXPERIMENT=1
export GOBIN=$GOPATH/bin

makedir:
	@echo "start building tree..."
	@if [ ! -d $(GOPATH)/bin ] ; then mkdir -p $(GOPATH)/bin ; fi
	@if [ ! -d $(GOPATH)/pkg ] ; then mkdir -p $(GOPATH)/pkg ; fi

get:
	@echo "start downloading dependencies ..."
	@$(GOGET)
	@echo "DONE!"

build:
	@echo "start building..."
	$(GOBUILD)
	@echo "DONE!"

run:
	$(GO) run main.go

test:
	@echo "start testing..."
	$(GOTEST)

clean:
	@echo "cleanning"
	@rm -rf $(GOPATH)/bin/$(EXENAME)
	@rm -rf $(BUILDPATH)/pkg
	@rm -rf $(BUILDPATH)/vendor

all: makedir get build run
