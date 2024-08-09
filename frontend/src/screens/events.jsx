import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";

const Events = () => {
  const { events, setEventToEdit } = useContext(AppContext);

  const navigate = useNavigate();

  function handleEditEvent(e) {
    setEventToEdit(e);
    navigate(`/edit-event/${e.id}`);
  }

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="w-6/12 min-h-96 bg-gray-800 p-4 rounded-md">
        <div className="flex justify-between items-center border-b border-gray-600 pb-3">
          <h2 className="text-3xl font-semibold">All Events</h2>
          <div className="flex items-center gap-2">
            <Link to="/add-participant">
              <button className="btn w-max mt-0 bg-gray-700">
                Add Participant
              </button>
            </Link>
            <Link to="/add-event">
              <button className="btn w-max mt-0 bg-gray-700">Add Event</button>
            </Link>
          </div>
        </div>
        <table className="w-full mt-5" border="2">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Edit</th>
              <th>Participants</th>
            </tr>
          </thead>
          <tbody>
            {events?.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{new Date(e.date).toLocaleDateString()}</td>
                <td>{e.venue.name}</td>
                <td>
                  <button
                    className="btn w-max mt-0 bg-gray-700"
                    onClick={() => handleEditEvent(e)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <Link to={`/participants-list/${e.id}`}>
                    <button className="btn w-max mt-0 bg-gray-700">
                      Participants
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Events;
