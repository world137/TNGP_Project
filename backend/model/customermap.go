package model

import (
	"fmt"
	"sort"
)

type mapStroage struct {
	data map[string]Customer
}

func InitMapStorage() *mapStroage {
	return &mapStroage{
		data: make(map[string]Customer),
	}
}
func (m *mapStroage) Create(customer Customer) error {
	if customer.CitizenId == "" {
		return fmt.Errorf("No citizenId id")
	}
	m.data[customer.CitizenId] = customer
	fmt.Println(m)
	return nil
}

func (m *mapStroage) Read(citizenId string) (Customer, error) {
	if citizenId == "" {
	}
	return m.data[citizenId], nil
}
func (m *mapStroage) ReadAll() ([]Customer, error) {
	var returnArray []Customer
	for _, v := range m.data {
		returnArray = append(returnArray, v)
	}

	sort.SliceStable(returnArray, func(i, j int) bool {
		return returnArray[i].CitizenId < returnArray[j].CitizenId //condition
	})

	return returnArray, nil
}
func (m *mapStroage) Update(customer Customer) error {
	if customer.CitizenId == "" {
		return fmt.Errorf("No account id")
	}
	m.data[customer.CitizenId] = customer
	return nil
}
