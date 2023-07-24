package model

type NAV struct {
	Last_upd_date string  `json:"last_upd_date"`
	Nav_date      string  `json:"nav_date"`
	Net_asset     float64 `json:"net_asset"`
	Last_val      float64 `json:"last_val"`
}
