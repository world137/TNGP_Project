package controller

import (
	"TNGP/backend/model"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

func DividendPolicy() {
	http.HandleFunc("/getDividend/", func(w http.ResponseWriter, r *http.Request) {

		if r.Method == http.MethodGet {
			pathParts := strings.Split(r.URL.Path, "/")
			proj_id := pathParts[len(pathParts)-2]

			apiUrl := "https://api.sec.or.th/FundFactsheet/fund/" + proj_id + "/dividend"
			// เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลจาก API
			data, err := FetchAPI(apiUrl)

			DividendPolicy := []model.DividendPolicy{}
			err = json.Unmarshal(data, &DividendPolicy)
			if err != nil {
				fmt.Errorf("error")
			}

			// Convert user data to JSON
			dataJSON, err := json.Marshal(DividendPolicy)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			fmt.Println(string(data))
			// Send the JSON data as response
			w.Header().Set("Content-Type", "application/json")
			w.Write(dataJSON)

			return
		}
	})
}
