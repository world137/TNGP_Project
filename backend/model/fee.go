package model

type Fee struct {
	Last_upd_date     string `json:"last_upd_date"`
	Class_abbr_name   string `json:"class_abbr_name"`
	Fee_type_desc     string `json:"fee_type_desc"`
	Rate              string `json:"rate"`
	Rate_unit         string `json:"rate_unit"`
	Actual_value      string `json:"actual_value"`
	Actual_value_unit string `json:"actual_value_unit"`
	Fee_other_desc    string `json:"fee_other_desc"`
}
