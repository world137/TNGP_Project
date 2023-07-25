// package controller

// import (
// 	"TNGP/backend/provider"
// 	"encoding/json"
// 	"fmt"
// 	"net/http"
// 	"strconv"
// 	"strings"
// )

// func SetpersonalScore(stroage provider.StroageProvider) {

// 	http.HandleFunc("/updatepersonal/", func(w http.ResponseWriter, r *http.Request) {
// 		if r.Method == http.MethodPost {
// 			pathParts := strings.Split(r.URL.Path, "/")
// 			personalScore := pathParts[len(pathParts)-1]
// 			id := pathParts[len(pathParts)-2]

// 			fmt.Println("path", pathParts)
// 			// fmt.Println("risk", personalScore)
// 			fmt.Println("id", id)

// 			customerList, err := stroage.ReadAll()
// 			if err != nil {
// 				fmt.Println("error")
// 			}

// 			for _, v := range customerList {
// 				if v.CitizenId == id {
// 					score, err := strconv.Atoi(personalScore)
// 					if err != nil {
// 						http.Error(w, err.Error(), http.StatusInternalServerError)
// 						return
// 					}
// 					v.PersonalScore = score
// 					v.PersonalTest = true

// 					tagetCustomer := v
// 					fmt.Println(tagetCustomer)
// 					err = stroage.Update(tagetCustomer)
// 					if err != nil {
// 						fmt.Println("error can't upadate")
// 					}
// 					break
// 				}
// 			}

// 			userJSON, err := json.Marshal(personalScore)
// 			if err != nil {
// 				http.Error(w, err.Error(), http.StatusInternalServerError)
// 				return
// 			}

// 			// Send the JSON data as response
// 			w.Header().Set("Content-Type", "application/json")
// 			w.Write(userJSON)
// 			return
// 		}
// 	})

// }
package controller
