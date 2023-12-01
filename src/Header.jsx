import axios from "axios";
import { useState } from "react";

const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}
import "./Header.css";

export function Header() {

  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("/sessions.json", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        event.target.reset();
        window.location.href = "/"; 
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };


  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };


  return (
    <div className="content">
      <nav className="navbar navbar-expand-lg .bg-transparent">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active text-white" aria-current="page" href="/"><h3 className="navtext">HOME</h3></a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/nationalparks"><h3 className="navtext">PARK INDEX</h3></a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/myparks"><h3 className="navtext">MY PARKS</h3></a>
              </li>
              <li className="Signup">
                <a className="nav-link text-white" href="/signup"><h3 className="navtext">SIGN UP</h3></a>
              </li>
            </ul>
            <div>
            {errors.map((error) => (
              <div key={error}>{error}</div>
              ))}
            <form onSubmit={handleSubmit}>
              <div className="signinblock">
                <div className="row">
                  <div className="col">
                    <input name="email" type="email" placeholder="Email"/>
                  </div>
                  <div className="col">
                    <input name="password" type="password" placeholder="Password"/>
                  </div >
                  <div className="col">
                    <button className="loginbutton" type="submit"><h3 className="navtext">SIGN IN</h3></button>
                  </div>
                  <div className="col">
                    <div className="logout">
                      <button className="noline" href="#" type="submit" onClick={handleClick}>
                        <h3 className="navtext">LOGOUT</h3>
                      </button>
                    </div>  
                  </div>
                </div>
              </div>    
            </form>
            </div>
          </div>
        </div>
      </nav>
  </div>
  )
}