import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    FName: "",
    LName: "",
    DOB: "",
    password: "",
    password2: "",
  });

  const { userName, email, FName, LName, DOB, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
          <p> Please create an account</p>
        </h1>
      </section>

      <section className="form" onSubmit={onSubmit}>
        <from>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="userName"
              name="userName"
              value={userName}
              placeholder="Enter user name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="FName"
              name="FName"
              value={FName}
              placeholder="First Name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="LName"
              name="LName"
              value={LName}
              placeholder="Last Name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control"
              id="DOB"
              name="DOB"
              value={DOB}
              placeholder="Date of birth"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-black" value="Register" />
          </div>
        </from>
      </section>
    </>
  );
}

export default Register;
