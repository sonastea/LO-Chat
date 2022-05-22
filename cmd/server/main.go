package main

import (
	"log"
	"os"

	"github.com/sonastea/LO-Chat/internal/configs"
	"github.com/sonastea/LO-Chat/internal/server/http"
)

func main() {
	logger := log.New(os.Stderr, "v.0.0.1", 1)

	cfg, err := configs.NewConfig()
	if err != nil {
		logger.Fatal(err.Error())
		return
	}

	srvCfg, err := cfg.HTTP()
	if err != nil {
		logger.Fatal(err.Error())
		return
	}

	server := http.NewServer(srvCfg)

	server.Start()
}
