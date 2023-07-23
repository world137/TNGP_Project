package main

import (
	"TNGP/backend/controller"
	"net/http"
)

// MyData struct to hold the values from the web form
type MyData struct {
	Value1 string
	Value2 string
}
type User struct {
	Id   int
	Name string
}
type FunFact struct {
	Last_upd_date string `json:"last_upd_date"`
	Unique_id     string `json:"unique_id"`
	Name_th       string `json:"name_th"`
	Name_en       string `json:"name_en"`
}

func main() {
	// Serve static files from the "frontend" directory
	fs := http.FileServer(http.Dir("frontend"))
	http.Handle("/frontend/", http.StripPrefix("/frontend/", fs))

	controller.AllAssetManageMent()

	// Start the server on port 8080
	http.ListenAndServe(":8080", nil)
}
