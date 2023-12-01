import axios from "axios";
import { useState } from "react";
import "./Signup.css"

export function Signup() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("https://park-camping-api.onrender.com//users.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div className="signup-page">
      <div className='signup'>
        <div id="signup">
          <h1>SIGN UP</h1>
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <div className="form-info">
              <div className="form-text">
                <div>
                  <h6 className="form"></h6><input className="bar" name="name" type="text" placeholder="Name" />
                </div>
                <div>
                  <h6 className="form"></h6><input className="bar" name="email" type="email" placeholder="Email"/>
                </div>
                <div>
                  <h6 className="form"></h6><input className="bar" name="password" type="password" placeholder="Password" />
                </div>
                <div>
                  <h6 className="form"></h6><input className="bar" name="password_confirmation" type="password" placeholder="Password Confirmation"/>
                </div>
                <br/>
              </div> 
              <button className="button" type="submit">Join Now</button>
            </div>  
          </form>
        </div>
      </div>  
    </div>  
  );
}