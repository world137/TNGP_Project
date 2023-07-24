package controller

import (
	"TNGP/backend/data"
	"TNGP/backend/model"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

func CustomerData() {
	http.HandleFunc("/customerdata/", func(w http.ResponseWriter, r *http.Request) {

		if r.Method == http.MethodGet {
			pathParts := strings.Split(r.URL.Path, "/")

			id := pathParts[len(pathParts)-1]

			var returncustomer model.Customer
			customerList := data.GetCustomerList()
			for _, v := range customerList {
				if v.CitizenId == id {
					returncustomer = v
					fmt.Println("true")
					break
				}
			}
			fmt.Println(returncustomer)

			CustomerData, err := json.Marshal(&returncustomer)
			fmt.Println(string(CustomerData))
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			// Send the JSON data as response
			w.Header().Set("Content-Type", "application/json")
			w.Write(CustomerData)
			return
		}
	})
}
