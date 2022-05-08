package http

import (
	"html/template"
	"net/http"
)

var templates = template.Must(template.ParseFiles("./web/templates/user.html", "./web/templates/index.html"))

func renderTemplate(w http.ResponseWriter, template string, u string) {
	err := templates.ExecuteTemplate(w, template+".html", u)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
