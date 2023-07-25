package data

import "TNGP/backend/model"

func GetCustomerList() []model.Customer {
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
			PersonalScore:  1,

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
			PersonalScore:  1,
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
	return customerList
}
