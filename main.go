package main

import (
	"TNGP/backend/controller"
	"net/http"
)

func main() {
	// Serve static files from the "frontend" directory
	fs := http.FileServer(http.Dir("frontend"))
	http.Handle("/frontend/", http.StripPrefix("/frontend/", fs))

	controller.AllAssetManageMent()
	controller.AllFund()

	// Start the server on port 8080
	http.ListenAndServe(":8080", nil)
}
