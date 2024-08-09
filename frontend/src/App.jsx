import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TopBar from "./components/top-bar";

import Login from "./screens/login";
import ParticipantsList from "./screens/participants-list";
import EditEvent from "./screens/edit-event";
import Events from "./screens/events";
import AddParticipant from "./screens/add-participant";
import AddEvent from "./screens/add-event";
import { AppProvider } from "./context/AppContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <main className="bg-gray-900 text-gray-200 h-full">
          <Router>
            <TopBar />
            <Routes>
              <Route path="/add-event" element={<AddEvent />} />
              <Route path="/add-participant" element={<AddParticipant />} />
              <Route path="/events" element={<Events />} />
              <Route path="/edit-event/:id" element={<EditEvent />} />
              <Route
                path="/participants-list/:eventid"
                element={<ParticipantsList />}
              />
              <Route path="/" element={<Login />} />
            </Routes>
          </Router>
        </main>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
