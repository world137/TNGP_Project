package controller

import (
	"TNGP/backend/model"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

func NAV() {
	http.HandleFunc("/getNAV/", func(w http.ResponseWriter, r *http.Request) {

		if r.Method == http.MethodGet {
			pathParts := strings.Split(r.URL.Path, "/")
			nav_date := pathParts[len(pathParts)-1]
			proj_id := pathParts[len(pathParts)-3]
			fmt.Println(proj_id)
			apiUrl := "https://api.sec.or.th/FundDailyInfo/" + proj_id + "/dailynav/" + nav_date
			// เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลจาก API
			data, err := FetchAPI(apiUrl)

			nav := model.NAV{}
			err = json.Unmarshal(data, &nav)
			if err != nil {
				fmt.Errorf("error")
			}

			// Convert user data to JSON
			userJSON, err := json.Marshal(nav)
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
