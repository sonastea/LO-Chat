package configs

import (
	"os"
	"strings"
	"time"

	"github.com/sonastea/LO-Chat/internal/server/http"
)

type Configs struct{}

func (cfg *Configs) HTTP() (*http.Config, error) {
	return &http.Config{
		Port:             "8080",
		TemplateBasePath: strings.TrimSpace(os.Getenv("TEMPLATES_BASEPATH")),
		ReadTimeout:      10 * time.Second,
		WriteTimeout:     10 * time.Second,
	}, nil
}

func NewConfig() (*Configs, error) {
	return &Configs{}, nil
}
