package http

import (
	"fmt"
	"net/http"
	"time"
)

type Config struct {
	Host             string
	Port             string
	TemplateBasePath string
	ReadTimeout      time.Duration
	WriteTimeout     time.Duration
}

type Server struct {
	server  *http.Server
	handler *http.ServeMux
	config  *Config
}

func NewServer(srvCfg *Config) *Server {
	s := &Server{}
	s.handler = NewHandler()
	s.server = &http.Server{
		Addr: fmt.Sprintf("%s:%s", srvCfg.Host, srvCfg.Port),

		Handler:           s.handler,
		ReadTimeout:       srvCfg.ReadTimeout,
		ReadHeaderTimeout: srvCfg.ReadTimeout,
		WriteTimeout:      srvCfg.WriteTimeout,
		IdleTimeout:       srvCfg.ReadTimeout,
	}
	return s
}

func (s *Server) Start() {
	s.server.ListenAndServe()
}
