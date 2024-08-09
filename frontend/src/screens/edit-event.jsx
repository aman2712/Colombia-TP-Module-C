import Input from "../components/input";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";
import Message from "../components/message";

const EditEvent = () => {
  const { eventToEdit, editEvent, getEvents } = useContext(AppContext);

  const [data, setData] = useState({
    id: eventToEdit?.id,
    name: eventToEdit?.name,
    date: eventToEdit?.date.split('T')[0],
    venue_id: String(eventToEdit?.venue_id),
  });
  const [message, setMessage] = useState({ type: "error", text: "" });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setMessage({ type: "error", text: "" });
    const resp = await editEvent(data);
    if (resp.error) {
      setMessage({ type: "error", text: resp.data.message });
    }else{
      getEvents()
      navigate('/')
    }
  };

  useEffect(() => {
    if (!eventToEdit) {
      navigate("/events");
    }
  }, [eventToEdit]);

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="w-6/12 min-h-96 bg-gray-800 p-4 rounded-md">
        <div className="flex justify-between items-center border-b border-gray-600 pb-3">
          <h2 className="text-3xl font-semibold">Edit an Event</h2>
          <Link to='/events'><button className="btn w-max mt-0 bg-gray-700">Go Back</button></Link>
        </div>
        <div className="my-6 w-96 mx-auto">
          {message.text.length > 0 && (
            <Message type={message.type} text={message.text} />
          )}
          <Input
            id="name"
            label="Name"
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <Input
            id="date"
            label="Date"
            type="text"
            placeholder="2024-08-10"
            value={data.date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
          />
          <label htmlFor="venue" className="text-gray-400">
            Venue
          </label>
          <select
            className="block w-full py-2 px-2 rounded-md bg-gray-200 text-black outline-none mb-4"
            id="venue"
            value={data.venue_id}
            onChange={(e) => setData({ ...data, venue_id: e.target.value })}
          >
            <option value="1">Stade de France</option>
            <option value="2">Arena Bercy</option>
            <option value="3">Roland Garros</option>
            <option value="4">Vélodrome National</option>
            <option value="5">Grand Palais</option>
          </select>
          <button className="btn bg-gray-700" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </section>
  );
};

export default EditEvent;
