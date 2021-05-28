import React, {Component} from "react"
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from 'react-google-places-suggest'

const API_KEY = "AIzaSyDwsdjfskhdbfjsdjbfksiTgnoriOAoUOgsUqOs10J0" // fake
export default class GoogleSuggest extends React.Component {
    state = {
        search: "",
        value: "",
    }
    handleInputChange = event => {
        this.setState({search: event.target.value, value: event.target.value})
    }
    handleSelectSuggest = (geocodePrediction, originalPrediction) =>
    {
        console.log(geocodePrediction, originalPrediction)
        this.setState({
            search: "",
            value: geocodePrediction.formatted_address,
        })
    }
    handleNoResult = () => {
        console.log("No results for", this.state.search)
    }
    render(){
        const {search, value} = this.state
        return (
            <ReactGoogleMapLoader
            params = {{
                key: API_KEY, libraries:"places, geocode",
            }}
            render = {googleMaps => googleMaps &&(<ReactGooglePlacesSuggest googleMaps = {googleMaps} autocompletionRequest = {{
                input: search,
            }}
            onNoResult = {this.handleNoResult}
            onSelectSuggest = {this.handleSelectSuggest}
            onStatusUpdate = {this.handleStatusUpdate}textNoResults = "My custom no results text"
            customRender = {prediction => (
                <div className = "custom Wrapper">
                    {prediction?prediction.description: " My custom no results text"}
                </div>
            )}
            >
            <input type = "text"
            value = {value}
            placeholder = "Search on a location"
            onChange = {this.handleInputChange}    />
            </ReactGooglePlacesSuggest>
            )}
            />
        )
    }
}