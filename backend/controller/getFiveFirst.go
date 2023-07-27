package controller

import (
	"TNGP/backend/model"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

func GetFiveMost() {
	http.HandleFunc("/getFiveMost/", func(w http.ResponseWriter, r *http.Request) {

		if r.Method == http.MethodGet {
			pathParts := strings.Split(r.URL.Path, "/")
			period := pathParts[len(pathParts)-1]
			proj_id := pathParts[len(pathParts)-3]
			fmt.Println(proj_id)
			apiUrl := "https://api.sec.or.th/FundFactsheet/fund/" + proj_id + "/FundTop5/" + period
			// เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลจาก API
			data, err := FetchAPI(apiUrl)

			factsheetURL := []model.FiveFirst{}
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
