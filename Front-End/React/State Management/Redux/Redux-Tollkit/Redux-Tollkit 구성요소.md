## 구성요소

### configureStore

```jsx
import { configureStore } from "@reduxjs/toolkit";
import NotesReducer from "./apps/notes/NotesSlice";
import CustomizerReducer from "./customizer/CustomizerSlice";
import ChatsReducer from "./apps/chat/ChatSlice";
import ContactsReducer from "./apps/contacts/ContactSlice";
import EmailReducer from "./apps/email/EmailSlice";
import TicketReducer from "./apps/ticket/TicketSlice";

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    notesReducer: NotesReducer,
    chatReducer: ChatsReducer,
    contactsReducer: ContactsReducer,
    emailReducer: EmailReducer,
    ticketReducer: TicketReducer,
  },
});

export default store;
```

### createSlice

```jsx
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const API_URL = "/api/data/ticket/TicketData";

const initialState = {
  tickets: [],
  currentFilter: "total_tickets",
  ticketSearch: "",
};

export const TicketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    getTickets: (state, action) => {
      state.tickets = action.payload;
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    SearchTicket: (state, action) => {
      state.ticketSearch = action.payload;
    },
    DeleteTicket: (state, action) => {
      const index = state.tickets.findIndex(
        (ticket) => ticket.Id === action.payload
      );
      state.tickets.splice(index, 1);
    },
  },
});

export const { getTickets, setVisibilityFilter, SearchTicket, DeleteTicket } =
  TicketSlice.actions;

export const fetchTickets = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getTickets(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

export default TicketSlice.reducer;
```

### useDispatch / useSelector

```jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Badge, UncontrolledTooltip, Input } from "reactstrap";
import {
  fetchTickets,
  DeleteTicket,
  SearchTicket,
} from "../../../store/apps/ticket/TicketSlice";

const TicketListing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const getVisibleTickets = (tickets, filter, ticketSearch) => {
    switch (filter) {
      case "total_tickets":
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch)
        );

      case "Pending":
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.Status === "Pending" &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch)
        );

      case "Closed":
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.Status === "Closed" &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch)
        );

      case "Open":
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.Status === "Open" &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch)
        );

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };

  const tickets = useSelector((state) =>
    getVisibleTickets(
      state.ticketReducer.tickets,
      state.ticketReducer.currentFilter,
      state.ticketReducer.ticketSearch
    )
  );

  return (
    <div>
      <div className="col-lg-3 mb-4">
        <Input
          type="text"
          onChange={(e) => dispatch(SearchTicket(e.target.value))}
          placeholder="Search Ticket..."
        />
      </div>
      <Table className="align-middle">
        <thead>
          <tr>
            <th>No</th>
            <th>Ticket</th>
            <th>Status</th>
            <th>Assigned to</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.Id}>
              <td>{ticket.Id}</td>
              <td>
                <h5 className="mb-0 mt-2">
                  <Link
                    to="/apps/ticket-detail"
                    className="text-dark text-decoration-none"
                  >
                    {ticket.ticketTitle}
                  </Link>
                </h5>
                <small
                  className="text-muted d-block text-truncate mb-2"
                  style={{ width: "300px" }}
                >
                  {ticket.ticketDescription}
                </small>
              </td>
              <td>
                <Badge color={ticket.Label}>{ticket.Status}</Badge>
              </td>
              <td>{ticket.AgentName}</td>
              <td>{ticket.Date}</td>
              <td>
                <i
                  className="bi bi-trash cursor-pointer"
                  id="TooltipExample"
                  onClick={() => dispatch(DeleteTicket(ticket.Id))}
                />
                <UncontrolledTooltip placement="left" target="TooltipExample">
                  Delete
                </UncontrolledTooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TicketListing;
```
