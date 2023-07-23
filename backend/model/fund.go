package model

type Fund struct {
	Last_upd_date        string `json:"last_upd_date"`
	Proj_id              string `json:"proj_id"`
	Regis_id             string `json:"regis_id"`
	Regis_date           string `json:"regis_date"`
	Cancel_date          string `json:"cancel_date"`
	Proj_name_th         string `json:"proj_name_th"`
	Proj_name_en         string `json:"proj_name_en"`
	Proj_abbr_name       string `json:"proj_abbr_name"`
	Fund_status          string `json:"fund_status"`
	Unique_id            string `json:"unique_id"`
	Permit_us_investment string `json:"permit_us_investment"`
	Invest_country_flage string `json:"invest_country_flage"`
}
