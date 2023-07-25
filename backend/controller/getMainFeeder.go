package controller

import (
	"TNGP/backend/model"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

func FeederFund() {
	http.HandleFunc("/getFeederFund/", func(w http.ResponseWriter, r *http.Request) {

		if r.Method == http.MethodGet {
			pathParts := strings.Split(r.URL.Path, "/")
			proj_id := pathParts[len(pathParts)-2]
			fmt.Println(proj_id)
			apiUrl := "https://api.sec.or.th/FundFactsheet/fund/" + proj_id + "/feeder_fund"
			// เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลจาก API
			data, err := FetchAPI(apiUrl)

			feederFund := model.FeederFund{}
			err = json.Unmarshal(data, &feederFund)
			if err != nil {
				fmt.Errorf("error")
			}

			// Convert user data to JSON
			dataJSON, err := json.Marshal(feederFund)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			// Send the JSON data as response
			w.Header().Set("Content-Type", "application/json")
			w.Write(dataJSON)

			return
		}
	})
}
