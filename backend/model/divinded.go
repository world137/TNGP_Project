package model

type DividendPolicy struct {
	Last_upd_date        string `json:"last_upd_date"`
	DividendPolicy       string `json:"dividend_policy"`
	DividendPolicyRemark string `json:"dividend_policy_remark"`
	Abbr_name            string `json:"class_abbr_name"`
}
