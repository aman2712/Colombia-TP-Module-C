import { useState, useContext } from "react";
import Input from "../components/input";
import Message from "../components/message";
import { AppContext } from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";

const AddParticipant = () => {
  const { addParticipant, events, getEvents } = useContext(AppContext);
  const [data, setData] = useState({
    fullname: "",
    email: "",
    phone: "",
    event_id: "1",
  });
  const [message, setMessage] = useState({ type: "error", text: "" });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setMessage({ type: "error", text: "" });
    const resp = await addParticipant(data);
    if (resp.error) {
      setMessage({ type: "error", text: resp.data.message });
    } else {
      getEvents();
      navigate("/");
    }
  };
  return (
    <section className="h-screen flex justify-center items-center">
      <div className="w-6/12 min-h-96 bg-gray-800 p-4 rounded-md">
        <div className="flex justify-between items-center border-b border-gray-600 pb-3">
          <h2 className="text-3xl font-semibold">Add New Participant</h2>
          <Link to='/events'><button className="btn w-max mt-0 bg-gray-700">Go Back</button></Link>
        </div>
        <div className="my-6 w-96 mx-auto">
        {message.text.length > 0 && (
            <Message type={message.type} text={message.text} />
          )}
          <Input
            id="fullname"
            label="Full Name"
            type="text"
            value={data.fullname}
            onChange={(e) => setData({ ...data, fullname: e.target.value })}
          />
          <Input
            id="email"
            label="Email"
            type="text"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <Input
            id="phone"
            label="Phone"
            type="text"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
          />
          <label htmlFor="venue" className="text-gray-400">
            Event
          </label>
          <select
            className="block w-full py-2 px-2 rounded-md bg-gray-200 text-black outline-none mb-4"
            id="event"
            value={data.event_id}
            onChange={(e) => setData({ ...data, event_id: e.target.value })}
          >
            {events?.map(event => (
              <option value={event.id} key={event.id}>{event.name}</option>
            ))} 
          </select>
          <button className="btn bg-gray-700" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </section>
  );
};

export default AddParticipant;
