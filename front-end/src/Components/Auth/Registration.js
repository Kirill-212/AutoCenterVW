import React from "react";
import './Registration.css';
import { Navigate } from "react-router-dom";
//import ImgService from '../../Services/ImgServices/ImgService'

function Registration() {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [dBay, setDBay] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [MessageError, setMessageError] = React.useState("");
    const [img, setImg] = React.useState("");
    const [redirectLogin, setRedirectLogin] = React.useState(false);

    function ClearField(e) {
        setMessageError("");
        setFirstName("");
        setLastName("");
        setSurname("");
        setEmail("");
        setPassword("");
        setDBay("");
        setPhoneNumber("");
    }

    async function submitUser(event) {
        event.preventDefault();
        setMessageError("");

    }

    function AddImg(value) {
        if (!value) {
            setMessageError("Wrong file type!")
            return;
        }
        if (value.type.split("/")[0] !== "image") {
            setMessageError("Wrong file type!")
        } else {
            console.log(value)
            //setImg(value);
        }
    }

    const styles = {
        maxWidth: "700px",
        border: "none",
    };

    return (
        <div className="container-fluid pt-5 " id="BackgroundImage">
            <div className="d-flex   justify-content-center align-items-center ">
                <div className="   p-4  w-100" style={styles}>
                    <form onSubmit={submitUser}>
                        <h1 className="d-flex   justify-content-center align-items-center ">
                            Registration
                        </h1>
                        <div className="form-group mb-2 ">
                            <label>First name:</label>
                            <input
                                className="w-100 shadow-lg  bg-white rounded"
                                onChange={(e) => setFirstName(e.target.value)}
                                name="firstName"
                                type="text"
                                placeholder="Enter your first name..."
                                required
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label>Last name:</label>
                            <input
                                className="w-100 shadow-lg  bg-white rounded"
                                onChange={(e) => setLastName(e.target.value)}
                                name="lastName"
                                type="text"
                                placeholder="Enter your last name..."
                                required
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label>Surname:</label>
                            <input
                                className="w-100 shadow-lg  bg-white rounded"
                                onChange={(e) => setSurname(e.target.value)}
                                name="surname"
                                type="text"
                                placeholder="Enter your surname..."
                                required
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label>Phone number:</label>
                            <input
                                className="w-100 shadow-lg  bg-white rounded"
                                type="text"
                                name="phoneNumber"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label>Email:</label>
                            <input
                                className="w-100 shadow-lg  bg-white rounded"
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                type="text"
                                placeholder="Enter your email..."
                                required
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label>Birthday:</label>
                            <input
                                aria-label="Default select example"
                                className="shadow-lg  bg-white rounded ml-1 w-100"
                                type="date"
                                name="dBay"
                                onChange={(e) => setDBay(e.target.value)}
                                placeholder="Enter your birthday.."
                                required
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label>Password</label>
                            <input
                                className="w-100 shadow-lg  bg-white rounded"
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                type="password"
                                placeholder="Enter your password..."
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Image profile</label>
                            <div className="custom-file">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => AddImg(e.target.files[0])}
                                    className="custom-file-input"
                                    id="inputGroupFile01"
                                />
                                <label className="custom-file-label" for="inputGroupFile01">
                                    Choose file
                                </label>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center form-outline mb-3">
                            <div className="col-5 flex-fill">
                                <button
                                    type="submit"
                                    className="btn btn-secondary btn-rounded w-100 "
                                >
                                    Submit
                                </button>
                            </div>
                            <div className="col-5 flex-fill">
                                <button
                                    type="reset"
                                    className="btn btn-warning btn-rounded w-100"
                                    onClick={ClearField}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="row ">
                        <div className="col">
                            <a href="/login"> Authorization</a>
                        </div>
                    </div>
                    <div>
                        <p>{MessageError}</p>
                        {redirectLogin && <Navigate to="/login" />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
