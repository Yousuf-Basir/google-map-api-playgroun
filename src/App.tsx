import React, { useState } from 'react'
import axios from 'axios'

// https://mapsplatform.google.com/pricing/?authuser=1

type Props = {}
type GetPlaceAutocomplete = {
  // source: https://developers.google.com/maps/documentation/places/web-service/autocomplete#maps_http_places_autocomplete_amoeba_strict-txt
  input: string
  types?: 'geocode' | 'address' | 'establishment' | 'region' | 'cities' // source: https://developers.google.com/maps/documentation/places/web-service/supported_types
  strictbounds?: boolean
  location?: string
  radius?: number
  language?: string
}

const App = (props: Props) => {
  const [inputText, setInputText] = useState('')

  const getPlaceAutocomplete = (options: GetPlaceAutocomplete) => {
    const { input, types, strictbounds } = options

    const API_KEY = 'AIzaSyBW3dVME_hXcRpeIeD9GTmDXwYRXYzfrok'
    var config = {
      method: 'get',
      // https://maps.googleapis.com/maps/api/place/autocomplete/json?input=dhaka&types=address&key=AIzaSyBW3dVME_hXcRpeIeD9GTmDXwYRXYzfrok
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=${types}&key=${API_KEY}&strictbounds=${strictbounds}`,
      headers: {},
    }

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const handleInputEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      getPlaceAutocomplete({
        input: inputText,
        types: "address"
      })
    }
  }

  return (
    <div>
      <p>Type and hit enter to get autocomplete in console</p>
      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyUp={(e) => handleInputEnterPress(e)}
      ></input>
    </div>
  )
}

export default App
