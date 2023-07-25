package model

type NAV struct {
	Last_upd_date string     `json:"last_upd_date"`
	Nav_date      string     `json:"nav_date"`
	Net_asset     float64    `json:"net_asset"`
	Last_val      float64    `json:"last_val"`
	Previous_val  float64    `json:"previous_val"`
	Amc_info      []Amc_info `json:"amc_info"`
}

type Amc_info struct {
	Sell_price float64 `json:"sell_price"`
}
