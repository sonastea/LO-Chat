package http

import (
	"html/template"
	"net/http"
)

var templates *template.Template

func parseTemplates(path string) {
	templates = template.Must(template.ParseGlob(path + "*.html"))
}

func renderTemplate(w http.ResponseWriter, template string, u string) {
	err := templates.ExecuteTemplate(w, template+".html", u)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
