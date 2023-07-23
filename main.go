package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"
)

// MyData struct to hold the values from the web form
type MyData struct {
	Value1 string
	Value2 string
}
type User struct {
	Id   int
	Name string
}
type FunFact struct {
	Last_upd_date string `json:"last_upd_date"`
	Unique_id     string `json:"unique_id"`
	Name_th       string `json:"name_th"`
	Name_en       string `json:"name_en"`
}

func main() {
	// Serve static files from the "frontend" directory
	fs := http.FileServer(http.Dir("frontend"))
	http.Handle("/frontend/", http.StripPrefix("/frontend/", fs))
	ArrUser := []User{
		{
			Id:   1,
			Name: "world",
		},
		{
			Id:   2,
			Name: "nod",
		},
	}
	// var ArrFunFact []FunFact

	// fmt.Println()
	// ตัวอย่าง: พิมพ์ข้อมูลที่ได้รับมาจาก API
	// fmt.Println("ข้อมูลจาก API:", string(data))

	http.HandleFunc("/unique/", func(w http.ResponseWriter, r *http.Request) {

		if r.Method == http.MethodGet {
			// Extract the user ID from the URL path
			pathParts := strings.Split(r.URL.Path, "/")
			uniqueID := pathParts[len(pathParts)-1]
			fmt.Println(uniqueID)

			// Get the user with the given ID from ArrUser
			var fact FunFact
			apiUrl := "https://api.sec.or.th/FundFactsheet/fund/amc"
			// เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลจาก API
			data, err := fetchAPI(apiUrl)
			Fact := []FunFact{}
			err = json.Unmarshal(data, &Fact)
			if err == nil {
				fmt.Errorf("error")

			}
			for _, v := range Fact {
				if v.Unique_id == uniqueID {
					fact = v
				}

			}

			// Convert user data to JSON
			userJSON, err := json.Marshal(fact)
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

	http.HandleFunc("/allunique/", func(w http.ResponseWriter, r *http.Request) {

		if r.Method == http.MethodGet {
			// var fact FunFact
			apiUrl := "https://api.sec.or.th/FundFactsheet/fund/amc"
			// เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลจาก API
			data, err := fetchAPI(apiUrl)
			Fact := []FunFact{}
			err = json.Unmarshal(data, &Fact)
			if err == nil {
				fmt.Errorf("error")

			}

			// Convert user data to JSON
			userJSON, err := json.Marshal(Fact)
			if err == nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			// Send the JSON data as response
			w.Header().Set("Content-Type", "application/json")
			w.Write(userJSON)
			return
		}
	})

	http.HandleFunc("/user/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			// Extract the user ID from the URL path
			pathParts := strings.Split(r.URL.Path, "/")
			userID, err := strconv.Atoi(pathParts[len(pathParts)-1])
			if err != nil {
				http.Error(w, "Invalid user ID", http.StatusBadRequest)
				return
			}

			// Get the user with the given ID from ArrUser
			var user User
			for _, u := range ArrUser {
				if u.Id == userID {
					user = u
					break
				}
			}

			// Convert user data to JSON
			userJSON, err := json.Marshal(user)
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
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			// Get the values from the form
			value1 := r.FormValue("value1")
			value2 := r.FormValue("value2")

			// Convert the string values to integers
			num1, _ := strconv.Atoi(value1)
			num2, _ := strconv.Atoi(value2)

			// Calculate the sum
			sum := num1 + num2

			// Send the sum as a plain text response
			fmt.Fprintf(w, "%d", sum)
			return
		}

		// If not a POST request, render the HTML template without data
		// renderTemplate(w, "frontend/index.html", nil)
	})

	// Start the server on port 8080
	http.ListenAndServe(":8080", nil)
}

// renderTemplate function to render the HTML template
func renderTemplate(w http.ResponseWriter, tmpl string, data MyData) {
	t, err := template.ParseFiles(tmpl)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	t.Execute(w, data)
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
