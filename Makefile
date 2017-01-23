BUILDPATH=$(CURDIR)
GO=$(shell which go)
GOBUILD=$(GO) build
GOCLEAN=$(GO) clean
GOGET=glide up
GOTEST=$(GO) test -v

EXENAME=main

export GOPATH= $(HOME)/goWorkspace

makedir:
	@echo "start building tree..."
	@if [ ! -d $(BUILDPATH)/bin ] ; then mkdir -p $(BUILDPATH)/bin ; fi
	@if [ ! -d $(BUILDPATH)/pkg ] ; then mkdir -p $(BUILDPATH)/pkg ; fi

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
	@rm -rf $(BUILDPATH)/bin/$(EXENAME)
	@rm -rf $(BUILDPATH)/pkg
	@rm -rf $(BUILDPATH)/vendor

all: makedir get build run
