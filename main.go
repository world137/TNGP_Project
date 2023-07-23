package main

import (
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("frontend"))
	http.Handle("/frontend/", http.StripPrefix("/frontend/", fs))

	http.HandleFunc("/unique/", uniqueHandler)
	http.HandleFunc("/allAssetManagement/", allAssetManagementHandler)

	// Start the server on port 8080
	http.ListenAndServe(":8080", nil)
}

// renderTemplate function to render the HTML template
