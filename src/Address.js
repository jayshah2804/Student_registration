import { useRef } from "react";
import React from "react";
import "./Address.css";

let lat;
let lng;
const Address = (props) => {
    const addressRef = useRef();
    const script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAq88vEj-mQ9idalgeP1IuvulowkkFA-Nk&callback=initMap&libraries=places&v=weekly";
    script.async = true;

    document.body.appendChild(script);
    let myInt = setInterval(() => {
        if (document.getElementsByClassName("gm-svpc")[0]) {
            document.getElementsByClassName("gm-svpc")[0].style.display = "none";
            document.getElementsByClassName("gm-control-active")[0].style.display = "none"
            clearInterval(myInt);
        }
    })

    function initMap() {

        var map = new window.google.maps.Map(document.getElementById("map"), {
            center: { lat: 23.0225, lng: 72.5714 },
            zoom: 11,
            mapTypeControl: false,
        });
        // console.log(map);
        var input = document.getElementById("pac-input");
        // var options = {
        //     fields: ["formatted_address", "geometry", "name"],
        //     strictBounds: false,
        //     types: ["establishment"],
        // };
        var autocomplete = new window.google.maps.places.Autocomplete(input);
        var geocoder = new window.google.maps.Geocoder();
        
        autocomplete.bindTo("bounds", map);
        var infowindow = new window.google.maps.InfoWindow();
        var infowindowContent = document.getElementById("infowindow-content");
        infowindow.setContent(infowindowContent);
        var marker = new window.google.maps.Marker({
            map: map,
            draggable: true,
            animation: window.google.maps.Animation.DROP,
            anchorPoint: new window.google.maps.Point(0, -29),
        });

        window.google.maps.event.addListener(marker, 'dragend',
            function (marker) {
                geocoder.geocode({
                    latLng: marker.latLng
                }, function (value) {
                    // console.log(jay);
                    infowindowContent.children["place-address"].textContent =
                        value[0].formatted_address;
                    infowindowContent.children["place-name"].textContent = "";
                    addressRef.current.value = value[0].formatted_address;
                    addressChangeHandler();
                })
                console.log(marker.formatted_address);
                lat = marker.latLng.lat();
                lng = marker.latLng.lng();
            });

        autocomplete.addListener("place_changed", function () {
            infowindow.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry || !place.geometry.location) {
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }
            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                // map.fitBounds(place.geometry.viewport);
                console.log(place.geometry.location);
                map.setCenter(place.geometry.location);
                map.setZoom(18);
            }
            else {
                map.setCenter(place.geometry.location);
                map.setZoom(13);
            }
            console.log(place.geometry.location)
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
            lat = marker.getPosition().lat();
            lng = marker.getPosition().lng();
            console.log(marker.getPosition().lat());
            console.log(marker.getPosition().lng());
            infowindowContent.children["place-name"].textContent = place.name;
            infowindowContent.children["place-address"].textContent =
                place.formatted_address;
            infowindow.open(map, marker);
        });
    }
    window.initMap = initMap;

    const addressChangeHandler = () => {
        setTimeout(() => {
            if (addressRef.current.value)
                props.addressEntered(addressRef.current.value, lat, lng);
        }, 500);
    }

    return (
        <div>
            <label htmlFor="address" className="required">Bus Pickup Stop</label>
            <div id="pac-container">
                <input id="pac-input" type="text" ref={addressRef} placeholder="Enter a location" className="tags address" onBlur={addressChangeHandler} />
            </div>
            <div id="map" ></div>
            <div id="infowindow-content">
                <span id="place-name" className="title"></span><br />
                <span id="place-address"></span>
            </div>
        </div>
    );
}

export default React.memo(Address);