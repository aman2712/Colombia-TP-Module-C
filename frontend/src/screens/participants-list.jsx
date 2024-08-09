import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";

const ParticipantsList = () => {
  const [participants, setParicipants] = useState([]);
  const params = useParams();

  const { getParticipants, deleteParticipant } = useContext(AppContext);

  const fetchParticipants = async () => {
    const resp = await getParticipants({eventId: params.eventid})
    
    if(!resp.error){      
      setParicipants(resp.data.body)      
    }
  }

  const handleDelete = async (participant) => {
    const resp = await deleteParticipant(participant)
    
    if(!resp.data.error){
      fetchParticipants()
    }
  } 

  useEffect(() => {
    fetchParticipants()    
  }, []);

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="w-6/12 96 bg-gray-800 p-4 rounded-md">
        <div className="flex justify-between items-center border-b border-gray-600 pb-3">
          <h2 className="text-3xl font-semibold">Partcipants List of Tennis</h2>
          <Link to='/events'><button className="btn w-max mt-0 bg-gray-700">Go Back</button></Link>
        </div>
        <table className="w-full mt-5" border="2">
          <thead>
            <tr>
              <th>Id</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Cancel Event</th>
            </tr>
          </thead>
          <tbody>
            {participants?.map((participant) => (
              <tr key={participant.id}>
              <td>{participant.id}</td>
              <td>{participant.fullname}</td>
              <td>{participant.email}</td>
              <td>{participant.phone}</td>
              <td>
                <button className="btn w-max mt-0 bg-red-800 hover:bg-red-900" onClick={() => handleDelete(participant)}>
                  Delete
                </button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ParticipantsList;
