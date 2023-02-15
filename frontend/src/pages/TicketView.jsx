/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Modal from "react-modal"
import { FaPlus } from "react-icons/fa"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getTicket, closeTicket } from "../features/tickets/ticketSlice"
import { getNotes, createNote, reset as notesReset } from "../features/notes/noteSlice"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import NoteItem from "../components/NoteItem"

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
}

Modal.setAppElement("#root")

function TicketView() {
    const { ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets)
    const { notes, isLoading: notesIsLoading, isError: notesIsError} = useSelector((state) => state.notes)

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState("")

    const params = useParams()

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const {ticketId} = useParams()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))
    }, [isError, message, ticketId])


    //function to close ticket
       const onTicketClose = () => {
         dispatch(closeTicket(ticketId));
          toast.success('Ticket closed successfully');
         navigate('/tickets');
       };

    //function to open modal
    const openModal = () => {
        setModalIsOpen(true)
    }

    //function to close modal
    const closeModal = () => {
        setModalIsOpen(false)
    }

    //function to submit note
    const onNoteSubmit = (e) => {
        e.preventDefault()
        dispatch(createNote({ticketId, noteText}))
        toast.success('Note added successfully')
        setNoteText('')
        closeModal()
    }

    if (isLoading || notesIsLoading) {
        return <Spinner />
    }

    if (isError || notesIsError) {
      return <h3>Oops, something went wrong</h3>
    }


  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {/* Checking to see if the ticket is closed, if it is, we don't want to show the Add Note button or the Close Ticket button. We also don't want to show the Add Note button if there are no notes for the ticket. */}
      {ticket.status !== 'closed' && (
        <button onClick={openModal} className="btn">
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button onClick={closeModal} className="btn-close btn-danger">
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea className="form-control" name="noteText" placeholder="Note Text" value={noteText} onChange={(e) => setNoteText(e.target.value)} />
          </div>
          <div className="form-group">
            <button type="submit" className="btn">Submit</button>
          </div>
        </form>
      </Modal>

      {/* if there are notes for the ticket, we want to map over the notes and display them. */}
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default TicketView