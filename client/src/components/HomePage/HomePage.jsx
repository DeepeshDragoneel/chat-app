import React, { useState } from "react";
import "./HomePage.scss";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [name, setname] = useState("");
    const [room, setroom] = useState("");
    const [error, seterror] = useState(false);

    return (
        <div>
            <div className="homePageMainDiv">
                <div className="homePageInner">
                    <h1 className="mb-4">Welcome to Group Chat Application!</h1>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Enter Display Username"
                            onChange={(e) => {
                                setname(e.target.value);
                            }}
                        ></input>
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Enter Room"
                            onChange={(e) => {
                                setroom(e.target.value);
                            }}
                        ></input>
                        <label htmlFor="floatingPassword">Room</label>
                    </div>
                    {error ? (
                        <div class="alert alert-danger" role="alert">
                            Fill out all Details!
                        </div>
                    ) : null}
                    <Link
                        onClick={(e) => {
                            if (!name || !room) {
                                e.preventDefault();
                                seterror(true);
                            } else {
                                seterror(false);
                            }
                        }}
                        to={`./chat?name=${name}&room=${room}`}
                    >
                        <button className="button" type="submit">
                            ENTER
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
