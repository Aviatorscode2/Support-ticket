import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'
import React from 'react'

function Home() {
  return (
    <>
      <section className="heading">
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Create a new ticket
      </Link>

      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt /> View my ticket
      </Link>
    </>
  );
}

export default Home