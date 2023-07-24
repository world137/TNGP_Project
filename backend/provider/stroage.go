package provider

import "TNGP/backend/model"

type StroageProvider interface {
	Create(model.Customer) error
	Read(string) (model.Customer, error)
	ReadAll() ([]model.Customer, error)
	Update(model.Customer) error
}
