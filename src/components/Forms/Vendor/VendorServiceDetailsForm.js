import { useContext, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import Button from "../../UI/Button"
import { FieldError } from "../../UI/FieldError"
import Select from "react-select"
import { customReactSelectOptions } from "../../../utils/customReactSelectOptions"
import f from "../../../validation/fieldName"
import { ThemeContext } from "../../../context/ThemeContext"
import Input from "../../UI/Input"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaVendorServiceDetails } from "../../../validation/schemas"
import { ServiceForm } from "./VendorServiceForm"


const VendorServiceDetailsForm = ({ onCallback, onBack, onNext }) => {

  const {
    // register,
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaVendorServiceDetails()),
  });

  const theme = useContext(ThemeContext)

  const isValidField = field => !errors[field]
  const getErrorField = field => errors[field]?.message

  const [serviceList, setServiceList] = useState([])

  const setService = (service) => {
    if(service) {
        console.log(serviceList, service)
      const data = [...serviceList]
      const index = data.findIndex((s) => s.id === service.id)
      if (!Number.isInteger(index)) {
        console.log(index, data)
        data[index].title = service.title
      }else{
        data.push(service)
      }
      console.log(data)
      setServiceList(data)
    } 
  }

  const [serviceInputs, setServiceInputs] = useState([
    <ServiceForm id={0} services={serviceList} callback={setService} />
  ])

  console.log(serviceList)

  const handle = (data) => {
    data.services = serviceList
    handleSubmit(onCallback(data))
  }

  return (
    <form onSubmit={handleSubmit((data) => {
      data.serviceModels = serviceList.map(s => ({
        name: s.title,
        price: s.price
      }))
      onCallback(data)
    })}>
      {/* <label className="input-label">
        Service
        <Controller
          control={control}
          name={f.photo.types}
          render={({ field }) => (
            <Select
              closeMenuOnSelect={false}
              placeholder="Service"
              options={[
                { value: 'Day After Session', label: 'Day After Session' },
                { value: 'Engagement', label: 'Engagement' }
              ]}
              isClearable={false}
              isMulti
              {...field}
              {...customReactSelectOptions(theme.get())}
            />
          )}
        />
        { !isValidField(f.photo.types) && <FieldError text={getErrorField(f.photo.types)} />}
      </label> */}

      {serviceInputs.map((input, index) => <div key={index}>{input}</div>)}

      {/* <Button
        className="btn btn-light" onClick={() => setServiceInputs(prev => [
          ...prev,
          <ServiceForm id={serviceList.length} services={serviceList} callback={setService} />
        ])}
      >Add item</Button> */}
      <br />

      <label className="input-label">
        Type of services
        <Controller
          control={control}
          name={f.photo.types_1}
          render={({ field }) => (
            <Select
              closeMenuOnSelect={false}
              placeholder="Type of services"
              options={[
                { value: 'Day After Session', label: 'Day After Session' },
                { value: 'Engagement', label: 'Engagement' }
              ]}
              isClearable={false}
              isMulti
              {...field}
              {...customReactSelectOptions(theme.get())}
            />
          )}
        />
        {!isValidField(f.photo.types_1) && <FieldError text={getErrorField(f.photo.types_1)} />}
      </label>

      <label className="input-label">
        Photo & Video Styles
        <Controller
          control={control}
          name={f.photo.types_3}
          render={({ field }) => (
            <Select
              placeholder="Photo & Video Styles"
              options={[
                { value: "Artistic", label: "Artistic" },
                { value: "Classic", label: "Classic" },
              ]}
              isClearable={false}
              isMulti
              closeMenuOnSelect={false}
              {...field}
              {...customReactSelectOptions(theme.get())}
            />
          )}
        />
        {!isValidField(f.photo.types_3) && <FieldError text={getErrorField(f.photo.types_3)} />}
      </label>

      <label className="input-label">
        Starting Price Range
        <Controller
          control={control}
          name={f.priceRange}
          render={({ field }) => (
            <Select
              placeholder="Starting Price Range"
              options={[
                { value: { priceFrom: 0, priceTo: 999 }, label: "$0-$999" },
                { value: { priceFrom: 1000, priceTo: 1999 }, label: "$1,000-$1,999" },
                { value: { priceFrom: 2000, priceTo: 2999 }, label: "$2,000-$2,999" },
                { value: { priceFrom: 3000, priceTo: 4999 }, label: "$3,000-$4,999" },
                { value: { priceFrom: 5000, priceTo: 100000 }, label: "$5,000+" }
              ]}
              isClearable={false}
              isSearchable={false}
              {...field}
              {...customReactSelectOptions(theme.get())}
            />
          )}
        />
        {!isValidField(f.priceRange) && <FieldError text={getErrorField(f.priceRange)} />}
      </label>


      <label className="input-label">
        Wedding Activities
        <Controller
          control={control}
          name={f.activities}
          render={({ field }) => (
            <Select
              placeholder="Wedding Activities"
              options={[
                { value: "Getting Engaged", label: "Getting Engaged" }
              ]}
              isClearable={false}
              isSearchable={false}
              {...field}
              {...customReactSelectOptions(theme.get())}
            />
          )}
        />
        {!isValidField(f.activities) && <FieldError text={getErrorField(f.activities)} />}
      </label>
      <div className="input-row">
        <div
          className="btn btn-accent btn-circle m-t-24"
          onClick={onBack}
        >
          <i className="icon-arrow-line"></i>
        </div>
        <Button
          type="submit"
          className="btn btn-accent w-100 m-t-24"
          style={{ flex: 1 }}
          disabled={!isValid}
          // onClick={onNext}
        >Next</Button>
      </div>
    </form>
  )
}

export default VendorServiceDetailsForm