package model

type Account struct {
	AccountId      string
	AccountNumber  string
	AccountName    string
	AccountType    string
	AccountBalance int
	FundProfile    []FundProfile
}

type FundProfile struct {
	Fund_name string
	Amount    int
	Value     float64
}
