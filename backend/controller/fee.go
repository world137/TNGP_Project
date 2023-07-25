package controller

import (
	"TNGP/backend/model"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

func Fee() {
	http.HandleFunc("/getFee/", func(w http.ResponseWriter, r *http.Request) {

		if r.Method == http.MethodGet {
			pathParts := strings.Split(r.URL.Path, "/")
			proj_id_undefined := pathParts[len(pathParts)-2]
			proj_id_undefined_list := strings.Split(proj_id_undefined, ";")
			fmt.Println("proj_id_undefined_list", proj_id_undefined_list)
			proj_id := proj_id_undefined_list[0]
			apiUrl := "https://api.sec.or.th/FundFactsheet/fund/" + proj_id + "/fee"

			// เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลจาก API
			data, err := FetchAPI(apiUrl)

			fee := []model.Fee{}
			err = json.Unmarshal(data, &fee)
			if err != nil {
				fmt.Errorf("error")
			}

			// Convert user data to JSON
			userJSON, err := json.Marshal(fee)
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
