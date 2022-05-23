package http

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"regexp"
)

type room struct {
	Private     bool   `json:"private"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

func RoomRoutes(h *http.ServeMux) {
	h.HandleFunc("/rooms/", rooms)
	h.HandleFunc("/api/create_room", create_room)
}

func rooms(w http.ResponseWriter, r *http.Request) {
	rooms := []room{
		{false, "test", "test desc"},
		{true, "private", "private desc"},
		{false, "test2", "test2 desc"},
	}

	valid := regexp.MustCompile(`^rooms[\/?]$`)
	m := valid.FindStringSubmatch(r.URL.Path[1:])
	if m == nil {
		http.NotFound(w, r)
		return
	}

	for _, room := range rooms {
		fmt.Printf("[%t] %s-%s\n", room.Private, room.Name, room.Description)
	}
	fmt.Fprintf(w, "%+v", rooms)
}

func create_room(w http.ResponseWriter, r *http.Request) {
	valid := regexp.MustCompile(`^api\/create_room$`)
	m := valid.FindStringSubmatch(r.URL.Path[1:])
	if m == nil {
		http.NotFound(w, r)
		return
	}

	var b room
	body, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(body, &b)
	fmt.Printf("%t, %s-%s", b.Private, b.Name, b.Description)
	fmt.Fprintf(w, "[%t] %s-%s", b.Private, b.Name, b.Description)
}
