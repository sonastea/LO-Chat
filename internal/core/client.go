package ws

import "net"

type Client struct {
	conn net.Conn
	name string
	room *Room
}
