package http

import (
	"net/http"
	"regexp"
)

func UserRoutes(m *http.ServeMux) {
	m.HandleFunc("/user/", userProfile)
}

func userProfile(w http.ResponseWriter, r *http.Request) {
	valid := regexp.MustCompile("^/(user)/([a-zA-Z0-9]+/?)$")
	m := valid.FindStringSubmatch(r.URL.Path)
	if m == nil {
		http.NotFound(w, r)
		return
	}
	renderTemplate(w, "user", m[2])
}
