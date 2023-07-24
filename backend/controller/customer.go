package controller

import (
	"TNGP/backend/model"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

func CustomerData() {
	http.HandleFunc("/customerdata/", func(w http.ResponseWriter, r *http.Request) {

		customerList := []model.Customer{
			{
				NameTitle: "นาย",
				Name:      "สมชาย",
				Surname:   "จริง",
				CitizenId: "2232323456789",
				DOB:       "01/01/2000",
				MinIncome: 10000,
				MaxIncome: 30000,
				Tel:       "0988787654",
				Email:     "test@gmail.com",
				Job:       "BA",
				Risk:      5,

				ExperienceTest: true,
				Experience:     true,
				Account: []model.Account{
					{
						AccountId:      "001a",
						AccountNumber:  "3042343575",
						AccountName:    "สมชาย",
						AccountType:    "ออมทรัพย์",
						AccountBalance: 10000,
					},
					{
						AccountId:      "001b",
						AccountNumber:  "3042334575",
						AccountName:    "สมชาย",
						AccountType:    "กองทุน",
						AccountBalance: 100,
					},
				},
			},
			{
				NameTitle:      "นาง",
				Name:           "สมหญิง",
				Surname:        "จริง",
				CitizenId:      "2212323456789",
				DOB:            "01/01/2000",
				MinIncome:      10000,
				MaxIncome:      30000,
				Tel:            "0988398454",
				Email:          "test2@gmail.com",
				Job:            "BA",
				Risk:           0,
				ExperienceTest: false,
				Experience:     false,
				Account: []model.Account{
					{
						AccountId:      "001a",
						AccountNumber:  "3041114475",
						AccountName:    "สมหญิง",
						AccountType:    "ออมทรัพย์",
						AccountBalance: 10500,
					},
					{
						AccountId:      "001b",
						AccountNumber:  "4562334575",
						AccountName:    "สมหญิง",
						AccountType:    "กองทุน",
						AccountBalance: 66000,
					},
				},
			},
		}

		if r.Method == http.MethodGet {
			pathParts := strings.Split(r.URL.Path, "/")

			id := pathParts[len(pathParts)-1]

			var returncustomer model.Customer

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
