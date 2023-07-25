package model

type Customer struct {
	NameTitle      string
	Name           string
	Surname        string
	CitizenId      string
	Account        []Account
	Score          int
	DOB            string
	MinIncome      int
	MaxIncome      int
	Tel            string
	Email          string
	Job            string
	Risk           int
	Experience     bool
	ExperienceTest bool
	Answer         [12]string
}
