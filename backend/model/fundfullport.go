package model

type FundFullPort struct {
	Proj_id        string `json:"proj_id"`
	Assetliab_code string `json:"assetliab_code"`
	Period         string `json:"period"`
	Market_value   string `json:"market_value"`
	Percent_nav    string `json:"percent_nav"`
}
