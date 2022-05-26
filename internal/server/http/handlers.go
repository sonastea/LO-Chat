package http

import (
	"net/http"
	"regexp"
)

func NewServeMux() *http.ServeMux {
	mux := initRoutes()
	return mux
}

func initRoutes() *http.ServeMux {
	mux := http.NewServeMux()

	Routes(mux)
	AuthRoutes(mux)
	UserRoutes(mux)
	RoomRoutes(mux)

	return mux
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
	renderTemplate(w, "index", "")
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
