// backend/main.go
package main

import (
	"log"
	"os"
	"strconv"

	"github.com/wjdittmar/chestPainTriage/internal/server"
)

func main() {
	port := 50051
	if val, ok := os.LookupEnv("GRPC_PORT"); ok {
		p, err := strconv.Atoi(val)
		if err == nil {
			port = p
		}
	}

	if err := server.Run(port); err != nil {
		log.Fatalf("Failed to run gRPC server: %v", err)
	}
}
