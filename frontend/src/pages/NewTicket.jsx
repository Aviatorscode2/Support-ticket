/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import { createTicket, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from '../components/BackButton';

function NewTicket() {
    const {user} = useSelector(state => state.auth);
    const {isLoading, isError, isSuccess, message} = useSelector(state => state.ticket);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name] = useState(user.name);
    const [email] = useState(user.email);
    const [product, setProduct] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            toast.success(message);
            navigate('/tickets');
            dispatch(reset());
        }

        dispatch(reset());
    }, [dispatch, isError, isSuccess, navigate, message]);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createTicket({product, description}));
    }

    if (isLoading) {
        return <Spinner/>
    }

    return (
      <>
        <BackButton url='/'/>
        <section className="heading">
          <h1>Create a new ticket</h1>
          <p>Please fill out the form below to create a new ticket</p>
        </section>

        <section className="form">
          <div className="form-group">
            <label htmlFor="name">Customer Name</label>
            <input type="text" className="form-control" value={name} disabled />
          </div>

          <div className="form-group">
            <label htmlFor="email">Customer Email</label>
            <input
              type="text"
              className="form-control"
              value={email}
              disabled
            />
          </div>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="product">Product</label>
              <select
                name="product"
                id="product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              >
                <option value="Desktop">Desktop</option>
                <option value="Laptop">Laptop</option>
                <option value="Tablet">Tablet</option>
                <option value="Phone">Phone</option>
              </select>
            </div>
            <div className="form-group">
                <label htmlFor="description">Description of the issue</label>
                <textarea name="description" id="description" className="form-control" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-block">Submit</button>
            </div>
          </form>
        </section>
      </>
    );
}

export default NewTicket;