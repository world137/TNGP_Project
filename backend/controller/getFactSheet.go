package controller

import (
	"TNGP/backend/model"
	"encoding/json"
	"fmt"
	"net/http"
)

func FactSheet(proj_id string) {
	http.HandleFunc("/getFactSheet/", func(w http.ResponseWriter, r *http.Request) {

		if r.Method == http.MethodGet {
			apiUrl := "https://api.sec.or.th/FundFactsheet/fund/" + proj_id + "/URLs"
			// เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลจาก API
			data, err := FetchAPI(apiUrl)

			factsheetURL := model.FactSheetURL{}
			err = json.Unmarshal(data, &factsheetURL)
			if err != nil {
				fmt.Errorf("error")
			}

			// Convert user data to JSON
			userJSON, err := json.Marshal(factsheetURL)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			// Send the JSON data as response
			w.Header().Set("Content-Type", "application/json")
			w.Write(userJSON)

			return
		}
	})
}
