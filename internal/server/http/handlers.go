package http

import (
	"net/http"
	"regexp"
)

func NewHandler() *http.ServeMux {
	handler := initRoutes()
	return handler
}

func initRoutes() *http.ServeMux {
	handler := http.NewServeMux()

	Routes(handler)
	UserRoutes(handler)
	RoomRoutes(handler)

	return handler
}

func Routes(h *http.ServeMux) {
	h.HandleFunc("/", index)
	h.HandleFunc("/favicon.ico", favicon)
}

func index(w http.ResponseWriter, r *http.Request) {
	valid := regexp.MustCompile(`^\/$|^\/home$`)
	m := valid.FindStringSubmatch(r.URL.Path)
	if m == nil {
		http.NotFound(w, r)
		return
	}
	renderTemplate(w, "index", "t")
}

func favicon(w http.ResponseWriter, r *http.Request) {
	valid := regexp.MustCompile(`^favicon\.ico$`)
	m := valid.FindStringSubmatch(r.URL.Path[1:])
	if m == nil {
		http.NotFound(w, r)
		return
	}
	http.ServeFile(w, r, "./web/favicon.ico")
}
