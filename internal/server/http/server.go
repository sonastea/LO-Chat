package http

import (
	"fmt"
	"net/http"
	"time"

	"github.com/rs/cors"
)

type Config struct {
	Host             string
	Port             string
	TemplateBasePath string
	ReadTimeout      time.Duration
	WriteTimeout     time.Duration
	Debug            bool
}

type Server struct {
	server *http.Server
	mux    *http.ServeMux
	config *Config
}

func NewServer(srvCfg *Config) *Server {
	parseTemplates(srvCfg.TemplateBasePath)

	s := &Server{}
	s.mux = NewServeMux()

	h := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
		Debug:            srvCfg.Debug,
	})

	s.server = &http.Server{
		Addr:              fmt.Sprintf("%s:%s", srvCfg.Host, srvCfg.Port),
		Handler:           h.Handler(s.mux),
		ReadTimeout:       srvCfg.ReadTimeout,
		ReadHeaderTimeout: srvCfg.ReadTimeout,
		WriteTimeout:      srvCfg.WriteTimeout,
		IdleTimeout:       srvCfg.ReadTimeout,
	}

	return s
}

func (s *Server) Start() {
	fmt.Println("Listening on " + s.server.Addr)
	s.server.ListenAndServe()
}
