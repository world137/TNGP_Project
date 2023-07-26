package data

import "TNGP/backend/model"

func GetCustomerList() []model.Customer {
	customerList := []model.Customer{
		{
			NameTitle:      "นาย",
			Name:           "สมชาย",
			Surname:        "จริง",
			CitizenId:      "2212323456789",
			DOB:            "01/01/2000",
			MinIncome:      30000,
			MaxIncome:      40000,
			Tel:            "0988787654",
			Email:          "test@gmail.com",
			Job:            "พนักงานบริษัท",
			Risk:           8,
			Answer:         [12]string{"4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "1", "1"},
			ExperienceTest: true,
			Experience:     true,
			PersonalScore:  0,
			Age:            23,
			Gender:         "ชาย",
			ProvinceName:   "สุพรรณบุรี",
			Sector:         "กลาง",
			MarriageStatus: "โสด",
			Education:      "ปริญญาตรี",
			Branch_name:    "สาขากำแพงแสน",
			SuitDate:       "20/07/2023",
			MainAccount:    "001a",
			Account: []model.Account{
				{
					AccountId:      "001a",
					AccountNumber:  "3042343575",
					AccountName:    "สมชาย",
					AccountType:    "ออมทรัพย์",
					AccountBalance: 10000,
					FundProfile:    []model.FundProfile{},
				},
				{
					AccountId:      "001b",
					AccountNumber:  "3042334575",
					AccountName:    "สมชาย",
					AccountType:    "กองทุน",
					AccountBalance: 10000,
					FundProfile:    []model.FundProfile{},
				},
			},
		},
		{
			NameTitle:      "นาง",
			Name:           "สมหญิง",
			Surname:        "จริง",
			CitizenId:      "1212323456789",
			DOB:            "01/01/2000",
			MinIncome:      30000,
			MaxIncome:      40000,
			Tel:            "0988398454",
			Email:          "test2@gmail.com",
			Job:            "พนักงานบริษัท",
			Risk:           0,
			ExperienceTest: false,
			Experience:     false,
			Answer:         [12]string{},
			PersonalScore:  1,
			Age:            23,
			Gender:         "หญิง",
			ProvinceName:   "ชลบุรี",
			Sector:         "กลาง",
			MarriageStatus: "โสด",
			Education:      "ปริญญาตรี",
			Branch_name:    "สาขาชลบุรี",
			SuitDate:       "12/07/2023",
			MainAccount:    "001c",
			Account: []model.Account{
				{
					AccountId:      "001c",
					AccountNumber:  "3041114475",
					AccountName:    "สมหญิง",
					AccountType:    "ออมทรัพย์",
					AccountBalance: 10500,
					FundProfile:    []model.FundProfile{},
				},
				{
					AccountId:      "001d",
					AccountNumber:  "4562334575",
					AccountName:    "สมหญิง",
					AccountType:    "กองทุน",
					AccountBalance: 66000,
					FundProfile:    []model.FundProfile{},
				},
			},
		},
	}
	return customerList
}
