package controller

import (
	"TNGP/backend/model"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

func FundFullPort() {
	http.HandleFunc("/getFundFullPort/", func(w http.ResponseWriter, r *http.Request) {

		if r.Method == http.MethodGet {
			pathParts := strings.Split(r.URL.Path, "/")
			proj_id := pathParts[len(pathParts)-3]
			period := "202304"
			apiUrl := "https://api.sec.or.th/FundFactsheet/fund/" + proj_id + "/FundFullPort/" + period
			// เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลจาก API
			data, err := FetchAPI(apiUrl)
			fundFullPort := []model.FundFullPort{}
			err = json.Unmarshal(data, &fundFullPort)
			if err != nil {
				fmt.Errorf("error")
			}

			// Convert user data to JSON
			userJSON, err := json.Marshal(fundFullPort)
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
