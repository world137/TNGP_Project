package main

import (
	"TNGP/backend/controller"
	"TNGP/backend/model"
	"TNGP/backend/provider"
	"net/http"
)

func main() {
	// Serve static files from the "frontend" directory
	fs := http.FileServer(http.Dir("frontend"))
	http.Handle("/frontend/", http.StripPrefix("/frontend/", fs))
	var db provider.StroageProvider
	db = model.InitMapStorage()
	createCustomer(db)
	controller.AllAssetManageMent()
	controller.AllFund()

	controller.CustomerData(db)
	controller.FactSheet()
	controller.SetRiskScore(db)
	controller.NAV()
	controller.Risk()
	controller.DividendPolicy()

	// Start the server on port 8080
	defer http.ListenAndServe(":8080", nil)
}
func createCustomer(stroage provider.StroageProvider) {
	customerArr := []model.Customer{
		{
			NameTitle:      "นาย",
			Name:           "สมชาย",
			Surname:        "จริง",
			CitizenId:      "2212323456789",
			DOB:            "01/01/2000",
			MinIncome:      10000,
			MaxIncome:      30000,
			Tel:            "0988787654",
			Email:          "test@gmail.com",
			Job:            "BA",
			Risk:           8,
			Answer:         [...]string{"4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "1", "1"},
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
			CitizenId:      "1212323456789",
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
	for _, customer := range customerArr {

		err := stroage.Create(customer)
		if err != nil {
			return
		}

	}

}
