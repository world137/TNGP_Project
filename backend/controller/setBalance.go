package controller

import (
	"TNGP/backend/model"
	"TNGP/backend/provider"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

func SetBalance(stroage provider.StroageProvider) {

	http.HandleFunc("/updateBalance/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			fmt.Println(r.Body)
			pathParts := strings.Split(r.URL.Path, "/")
			fund_name := pathParts[len(pathParts)-1]
			amount := pathParts[len(pathParts)-2]
			value := pathParts[len(pathParts)-3]
			id := pathParts[len(pathParts)-4]

			// customerList := data.GetCustomerList()
			customerList, err := stroage.ReadAll()
			if err != nil {
				fmt.Println("error")
			}

			for _, v := range customerList {
				if v.CitizenId == id {
					amount, err := strconv.Atoi(amount)
					value, err := strconv.Atoi(value)

					if err != nil {
						http.Error(w, err.Error(), http.StatusInternalServerError)
						return
					}
					fundProfile1 := model.FundProfile{
						Fund_name: fund_name,
						Amount:    amount,
						Value:     float64(value),
					}
					fmt.Println(fundProfile1)
					v.Account[0].AccountBalance = v.Account[0].AccountBalance - value
					v.Account[1].AccountBalance = v.Account[1].AccountBalance + value
					v.Account[1].FundProfile = append(v.Account[1].FundProfile, (fundProfile1))
					break
				}
			}

			userJSON, err := json.Marshal(fund_name)
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
