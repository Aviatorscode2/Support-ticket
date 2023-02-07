/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/*eslint no-undef: "error"*/
import { useState } from 'react';
import { FaSignInAlt} from 'react-icons/fa';
import { toast } from 'react-toastify';
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../features/auth/authSlice';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
   
  });

  const { email, password } = formData;

  const dispatch = useDispatch();

  const {user, isLoading, isSuccess, message} = useSelector((state) => state.auth);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    }
    dispatch(login(userData));
  };
  return (
    <>
      <section className="heading">
        <h1>
          {' '}
          <FaSignInAlt />
          Login
        </h1>
        <p>Please log in to get support</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={onChange}
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={onChange}
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
