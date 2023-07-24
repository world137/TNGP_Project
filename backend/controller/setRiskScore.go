package controller

import (
	"TNGP/backend/provider"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

func SetRiskScore(stroage provider.StroageProvider) {

	http.HandleFunc("/updateriskscore/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			pathParts := strings.Split(r.URL.Path, "/")
			riskScore := pathParts[len(pathParts)-1]
			id := pathParts[len(pathParts)-2]
			fmt.Println(pathParts)
			fmt.Println(riskScore)
			fmt.Println(id)
			// customerList := data.GetCustomerList()
			customerList, err := stroage.ReadAll()
			if err != nil {
				fmt.Println("error")
			}

			for _, v := range customerList {
				if v.CitizenId == id {
					score, err := strconv.Atoi(riskScore)
					if err != nil {
						http.Error(w, err.Error(), http.StatusInternalServerError)
						return
					}
					v.Risk = score

					tagetCustomer := v
					fmt.Println(tagetCustomer)
					err = stroage.Update(tagetCustomer)
					if err != nil {
						fmt.Println("error can't upadate")
					}
					break
				}
			}

			userJSON, err := json.Marshal(riskScore)
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
