package http

import (
	"fmt"
	"io"
	"net/http"
	"regexp"
)

func AuthRoutes(m *http.ServeMux) {
	m.HandleFunc("/api/login", logIn)
	m.HandleFunc("/api/login/", logIn)
	m.HandleFunc("/api/signup", signUp)
	m.HandleFunc("/api/signup/", signUp)
}

func logIn(w http.ResponseWriter, r *http.Request) {
	valid := regexp.MustCompile("^/api/login(/?)$")
	m := valid.FindStringSubmatch(r.URL.Path)
	if m == nil {
		http.NotFound(w, r)
		return
	}
	if r.Method != "POST" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte("500 - Only POST method is supported."))
		return
	}
	body, _ := io.ReadAll(r.Body)
	fmt.Println(string(body))
    w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message" : "Login successful."}`))
}

func signUp(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	valid := regexp.MustCompile("^/api/signup(/?)$")
	m := valid.FindStringSubmatch(r.URL.Path)
	if m == nil {
		http.NotFound(w, r)
		return
	}
	/* if r.Method != "POST" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte("500 - Only POST method is supported."))
		return
	} */
	body, _ := io.ReadAll(r.Body)
	fmt.Println(string(body))
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message" : "Signup successful."}`))
}
