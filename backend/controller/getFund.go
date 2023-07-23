package controller

import (
	"TNGP/backend/model"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

func AllFund() {
	http.HandleFunc("/getallFund/", func(w http.ResponseWriter, r *http.Request) {

		if r.Method == http.MethodGet {
			pathParts := strings.Split(r.URL.Path, "/")
			id := pathParts[len(pathParts)-1]
			apiUrl := "https://api.sec.or.th/FundFactsheet/fund/amc/" + id
			// เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลจาก API
			data, err := FetchAPI(apiUrl)
			Fund := []model.Fund{}
			err = json.Unmarshal(data, &Fund)
			if err != nil {
				fmt.Errorf("error")
			}

			// Convert user data to JSON
			userJSON, err := json.Marshal(Fund)
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
