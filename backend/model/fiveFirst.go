package model

type FiveFirst struct {
	Proj_id           string  `json:"proj_id"`
	Assetseq          int     `json:"assetseq"`
	Secur_name        string  `json:"secur_name"`
	Secur_abbr_name   string  `json:"secur_abbr_name"`
	Period            string  `json:"period"`
	Secur_Invest_size float64 `json:"secur_Invest_size"`
}
