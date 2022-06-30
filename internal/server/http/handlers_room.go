package http

import (
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"regexp"

	"github.com/gorilla/websocket"
)

type room struct {
	Private     bool   `json:"private"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

var (
	addr = flag.String("addr", ":8080", "http service address")
	wss  = websocket.Upgrader{CheckOrigin: func(*http.Request) bool { return true }}
)

func RoomRoutes(m *http.ServeMux) {
	m.HandleFunc("/rooms/", rooms)
	m.HandleFunc("/api/create_room", create_room)
	m.HandleFunc("/api/join_room/", join_room)
	m.HandleFunc("/api/browse/", browse)
}

func browse(w http.ResponseWriter, r *http.Request) {
	valid := regexp.MustCompile(`^api\/browse\/$`)
	m := valid.FindStringSubmatch(r.URL.Path[1:])
	if m == nil {
		http.NotFound(w, r)
		return
	}
	c, err := wss.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}
	defer c.Close()
	for {
		mt, message, err := c.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}
		log.Printf("recv: %s", message)
		err = c.WriteMessage(mt, message)
		if err != nil {
			log.Println("write:", err)
			break
		}
	}
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
	renderTemplate(w, "browse", rooms)
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

func join_room(w http.ResponseWriter, r *http.Request) {
	valid := regexp.MustCompile(`^api\/join_room\/([0-9]+/?)$`)
	m := valid.FindStringSubmatch(r.URL.Path[1:])
	if m == nil {
		http.NotFound(w, r)
		return
	}
	if r.Method != "PUT" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte("500 - Only PUT method is supported."))
		return
	}
	fmt.Fprintf(w, "Successfully joined room %s", r.URL.Path[15:])
}
