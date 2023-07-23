package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/world137/TNGP_Project/blob/main/backend/controller"
)

type FunFact struct {
	Last_upd_date string `json:"last_upd_date"`
	Unique_id     string `json:"unique_id"`
	Name_th       string `json:"name_th"`
	Name_en       string `json:"name_en"`
}

func main() {
	router := mux.NewRouter()

	// Register API endpoints from different files
	router.HandleFunc("/api1", controller.API2Handler)

	port := ":8080" // Change to the desired port
	fmt.Printf("Server listening on port %s\n", port)
	http.ListenAndServe(port, router)
}
