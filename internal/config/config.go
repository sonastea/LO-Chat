package config

import (
	"log"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/sonastea/LO-Chat/internal/server/http"
)

type Config struct{}

func (cfg *Config) HTTP() (*http.Config, error) {
	b, err := strconv.ParseBool(os.Getenv("CORS_DEBUG"))
	if err != nil {
		log.Fatal(err)
	}

	return &http.Config{
		Host:             "0.0.0.0",
		Port:             "8080",
		TemplateBasePath: strings.TrimSpace(os.Getenv("TEMPLATES_BASEPATH")),
		ReadTimeout:      10 * time.Second,
		WriteTimeout:     10 * time.Second,
		Debug:            b,
	}, nil
}

func NewConfig() (*Config, error) {
	return &Config{}, nil
}
