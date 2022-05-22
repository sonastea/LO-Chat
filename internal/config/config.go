package config

import (
	"os"
	"strings"
	"time"

	"github.com/sonastea/LO-Chat/internal/server/http"
)

type Config struct{}

func (cfg *Config) HTTP() (*http.Config, error) {
	return &http.Config{
		Host:             "0.0.0.0",
		Port:             "8080",
		TemplateBasePath: strings.TrimSpace(os.Getenv("TEMPLATES_BASEPATH")),
		ReadTimeout:      10 * time.Second,
		WriteTimeout:     10 * time.Second,
	}, nil
}

func NewConfig() (*Config, error) {
	return &Config{}, nil
}
