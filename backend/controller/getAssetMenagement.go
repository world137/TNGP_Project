package controller

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type FunFact struct {
	Last_upd_date string `json:"last_upd_date"`
	Unique_id     string `json:"unique_id"`
	Name_th       string `json:"name_th"`
	Name_en       string `json:"name_en"`
}

func AllAssetManageMent() {
	http.HandleFunc("/getallAssetManagement/", func(w http.ResponseWriter, r *http.Request) {

		if r.Method == http.MethodGet {
			apiUrl := "https://api.sec.or.th/FundFactsheet/fund/amc"
			// เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลจาก API
			data, err := fetchAPI(apiUrl)
			Fact := []FunFact{}
			err = json.Unmarshal(data, &Fact)
			if err != nil {
				fmt.Errorf("error")
			}

			// Convert user data to JSON
			userJSON, err := json.Marshal(Fact)
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

func fetchAPI(url string) ([]byte, error) {
	// ส่ง HTTP GET request ไปยัง URL ที่กำหนด
	response, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()
	// อ่านข้อมูลที่ได้รับมา
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}
	return body, nil
}
