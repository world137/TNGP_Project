package model

type Customer struct {
	Name      string
	Surname   string
	CitizenId string
	Account   []Account
	Score     int
	DOB       string
	MinIncome int
	MaxIncome int
	Tel       string
	Email     string
}
