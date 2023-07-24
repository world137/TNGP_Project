package controller

import (
	"TNGP/backend/data"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

func SetRiskScore() {

	http.HandleFunc("/updateriskscore/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			pathParts := strings.Split(r.URL.Path, "/")
			riskScore := pathParts[len(pathParts)-1]
			id := pathParts[len(pathParts)-2]
			fmt.Println(pathParts)
			fmt.Println(riskScore)
			fmt.Println(id)
			customerList := data.GetCustomerList()
			for _, v := range customerList {
				if v.CitizenId == id {
					score, err := strconv.Atoi(riskScore)
					if err != nil {
						http.Error(w, err.Error(), http.StatusInternalServerError)
						return
					}
					v.Score = score
					break
				}
			}
			userJSON, err := json.Marshal("success")
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			// Send the JSON data as response
			w.Header().Set("Content-Type", "application/json")
			w.Write(userJSON)
			return
		}
	})

}
