package controller

import (
	"TNGP/backend/provider"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

var keeparr [12]string

func SetRiskScore(stroage provider.StroageProvider) {

	http.HandleFunc("/updateriskscore/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			pathParts := strings.Split(r.URL.Path, "/")
			sensitive := pathParts[len(pathParts)-1]
			riskScore := pathParts[len(pathParts)-3]
			id := pathParts[len(pathParts)-4]
			ansArr := pathParts[len(pathParts)-2]
			fmt.Println("path", pathParts)
			fmt.Println("risk", riskScore)
			fmt.Println("ans", ansArr)
			fmt.Println("sensitive", sensitive)
			fmt.Println("id", id)
			setAns := strings.Split(ansArr, ",")
			fmt.Println("setAns", setAns)
			// customerList := data.GetCustomerList()
			customerList, err := stroage.ReadAll()
			if err != nil {
				fmt.Println("error")
			}

			for i, v := range setAns {

				keeparr[i] = v
			}

			for _, v := range customerList {
				if v.CitizenId == id {
					score, err := strconv.Atoi(riskScore)
					if err != nil {
						http.Error(w, err.Error(), http.StatusInternalServerError)
						return
					}
					v.Risk = score
					v.Answer = keeparr
					Issensitive, err := strconv.Atoi(sensitive)
					if err != nil {
						http.Error(w, err.Error(), http.StatusInternalServerError)
						return
					}
					v.PersonalScore = Issensitive

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
