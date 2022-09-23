import React, { useState } from "react";
import "./Modal.css";
import littleLogo from "../Little Logo.png";

const Modal = (props) => {
    const script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAq88vEj-mQ9idalgeP1IuvulowkkFA-Nk&callback=myInitMap&libraries=places&v=weekly";
    script.async = true;
    document.body.appendChild(script);

    let myInt = setInterval(() => {
        if (document.getElementsByClassName("gm-svpc")[1]) {
            document.getElementsByClassName("gm-svpc")[1].style.display = "none";
            document.getElementsByClassName("gm-control-active")[6].style.display = "none"
            clearInterval(myInt);
        }
    })

    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
    const DataSubmitHandler = () => {
        let element = document.getElementsByClassName("header")[0];
        element.scrollIntoView({ behavior: "smooth", block: "end" });
        // console.log("here");
        setIsSubmitClicked(true);
    }
    const closeDataSavedClickHandler = () => {
        setTimeout(() => {
            window.location.reload();
        })
    }

    function myInitMap() {
        var map = new window.google.maps.Map(document.getElementById("map-modal"), {
            center: { lat: props.lat, lng: props.lng },
            zoom: 16,
            mapTypeControl: false,
        });

        let marker = new window.google.maps.Marker({
            position: { lat: props.lat, lng: props.lng },
            map,
            title: 'Hello World!'
        });
    }
    window.myInitMap = myInitMap;
    return (
        <React.Fragment>
            {!isSubmitClicked &&
                <div className="modalBackground">
                    <div className="modalContainer">
                        <div className="header">
                            <div className="header-text">Please Verify Your Details</div>
                            <div className="close" onClick={() => props.closeCLickHandler(false)}>&times;</div>
                        </div>
                        <div className="main-container">
                            <div className="student-school">
                                <label>School/Institute Name </label>
                                <span>{props.schoolname}</span>
                            </div>
                            <h4>Student Details</h4>
                            <div className="sub-container">
                                <div>
                                    <div className="student-details">
                                        <div>
                                            <div>
                                                <label>First Name</label>
                                                <span>{props.studentfirstname}</span>
                                            </div>
                                            <div>
                                                <label>Student passport size photo</label>
                                                <img src={props.studentPhoto} className="student-photo" alt="student" ></img>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <label>last name</label>
                                                <span>{props.studentlastname}</span>
                                            </div>
                                            <div>
                                                <label>class standards</label>
                                                <span>{props.studentclass}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <h4>Parent Details</h4>
                                    <div className="parent-details">
                                        <div>
                                            <div>
                                                <label>first name</label>
                                                <span>{props.parentfirstname}</span>
                                            </div>
                                            <div>
                                                <label>Mobile number</label>
                                                <span>{props.parentmobilenumber}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <label>last name </label>
                                                <span>{props.parentlastname}</span>
                                            </div>
                                            <div>
                                                <label>Email Address</label>
                                                <span>{props.parenteemailaddress}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="address-details">
                                    <div>
                                        <label>Address</label>
                                        <span>{props.address}</span>
                                    </div>
                                    <br />
                                    <div>
                                        {/* <img src={littleLogo} alt="dummy" /> */}
                                        <div id="map-modal"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <hr />
                        <div className="footer">
                            <div className="text">
                                <span>Need to Edit some details?</span><button onClick={() => props.closeCLickHandler(false)} className="back-button">Go Back</button>
                                <button onClick={DataSubmitHandler} className="submit-button" >Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                isSubmitClicked &&
                <div className="container-success-msg">
                    <div className="success-msg">
                        <p className="data-save">Data Saved Successfully <span className="x-button" onClick={closeDataSavedClickHandler}>X</span></p>
                    </div>
                </div>
            }
        </React.Fragment >
    );
}

export default Modal;