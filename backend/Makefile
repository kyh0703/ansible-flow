default: build test air

GO              := go

CURRENT_DIR     = .
BUILD_DIR       = $(CURRENT_DIR)/build
BUILD_BIN       = $(BUILD_DIR)/bin
BUILD_PACKAGE   = $(BUILD_DIR)/package
BUILD_REPORT    = $(BUILD_DIR)/report
TARGET          = app
PRIVATE_REPO    =

CI_USER         := $(if $(CI_USER),$(CI_USER),"gitlab-ci-token")
CI_TOKEN        := $(if $(CI_TOKEN),$(CI_TOKEN),"WjkhjLNzLUL76GBxTv9s")
GIT_COMMIT      := $(if $(GIT_COMMIT),$(GIT_COMMIT),$(shell git rev-parse HEAD | cut -c 1-8))

.PHONY: dep
dep:
	@echo "<dep>"
	@git config --global url."http://git.bridgetec.co.kr/IPRON-NE/common".insteadOf https://gitlab.com/ipron-ne
	@git config --global url."http://git.bridgetec.co.kr/IPRON-NE/core".insteadOf https://gitlab.com/ipron-core
	@GOPRIVATE=$(PRIVATE_REPO) $(GO) mod tidy
	@echo ""

.PHONY: build
build: dep
	@echo "<build>"
	@GO_PRIVATE=$(PRIVATE_REPO) GO111MODULE=on CGO_ENABLED=0 \
		$(GO) build -ldflags "$(LDFLAGS)" -o $(BUILD_BIN)/$(TARGET) ./cmd/flow
	@echo ""

.PHONY: build-admin
build-admin:
	@echo "<build-admin>"
	go build -o bin/admin cmd/admin/main.go
	@echo ""

.PHONY: air
air:
	@echo "<air>"
	@air -c .air.toml
	@echo ""

.PHONY: run
run:
	@echo "<run>"
	@$(BUILD_BIN)/$(TARGET)
	@echo ""

.PHONY: watch
watch:
	@echo "<watch>"
	@air -c .air.toml
	@echo ""

.PHONY: sqlc
sqlc:
	@echo "<sqlc>"
	@sqlc generate
	@echo ""

.PHONY: gen
gen: sqlc
	@echo "<gen>"
	@CGO_ENABLED=0 $(GO) generate ./...
	@echo ""

.PHONY: test
test:
	@echo "<test-result>"
	@mkdir -p $(BUILD_REPORT)
	@$(GO) test -v \
		-tags="unit integration" \
		-covermode=atomic \
		-coverprofile=coverage.out \
		-outputdir=$(BUILD_REPORT) ./... \
		> $(BUILD_REPORT)/test.log
	@cat $(BUILD_REPORT)/test.log
	@go-junit-report -in $(BUILD_REPORT)/test.log -out $(BUILD_REPORT)/test.xml
	@echo ""
	@echo "<test-cover>"
	@$(GO) tool cover -func $(BUILD_REPORT)/coverage.out
	@echo ""

.PHONY: lint
lint:
	@echo "<lint>"
	@mkdir -p $(BUILD_REPORT)
	@golangci-lint run --out-format junit-xml --issues-exit-code 0 ./... > $(BUILD_REPORT)/lint.xml
	@golangci-lint run ./...
	@echo ""

.PHONY: image
image:
	@echo "<image>"
	@docker build -t $(TARGET):$(GIT_COMMIT) \
		--build-arg CI_USER=$(CI_USER) \
		--build-arg CI_TOKEN=$(CI_TOKEN) \
		-f $(BUILD_PACKAGE)/Dockerfile .
	@echo ""

.PHONY: tag
tag:
	@echo "<tag>"
	@echo docker image tag $(TARGET):$(GIT_COMMIT) 100.100.103.167/ipron/$(TARGET):$(GIT_COMMIT)
	@echo docker image tag $(TARGET):$(GIT_COMMIT) real-image-registry.ncr.gov-ntruss.com/ipron/$(TARGET):$(GIT_COMMIT)
	@docker image tag $(TARGET):$(GIT_COMMIT) 100.100.103.167/ipron/$(TARGET):$(GIT_COMMIT)
	@docker image tag $(TARGET):$(GIT_COMMIT) real-image-registry.ncr.gov-ntruss.com/ipron/$(TARGET):$(GIT_COMMIT)
	@echo ""

.PHONY: vendor
vendor:
	@echo "<vendor>"
	@go mod vendor
	@echo ""

.PHONY: clean
clean:
	@echo "<clean>"
	@rm -f $(BUILD_BIN)/$(TARGET)
	@rm -f $(BUILD_REPORT)/*
	@echo ""
