package controller

import (
	"TNGP/backend/model"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

func AllAssetManageMent() {
	http.HandleFunc("/getallAssetManagement/", func(w http.ResponseWriter, r *http.Request) {

		if r.Method == http.MethodGet {
			apiUrl := "https://api.sec.or.th/FundFactsheet/fund/amc"
			// เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลจาก API
			data, err := FetchAPI(apiUrl)
			AssetManageMent := []model.FunFact{}
			err = json.Unmarshal(data, &AssetManageMent)
			if err != nil {
				fmt.Errorf("error")
			}

			// Convert user data to JSON
			userJSON, err := json.Marshal(AssetManageMent)
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

func FetchAPI(url string) ([]byte, error) {
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
