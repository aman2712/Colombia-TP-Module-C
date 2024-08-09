import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const TopBar = () => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  async function handleClose() {
    const resp = await logout();

    if (!resp.error) {      
      navigate("/");
    }
  }

  return (
    <nav className="w-full bg-gray-800 px-8 py-4 flex justify-between items-center">
      <h1 className="text-3xl font-extrabold">Admin Panel</h1>
      {!user ? (
        <Link to="/">
          <button className="btn w-max mt-0 bg-gray-700">Log In</button>
        </Link>
      ) : (
        <button className="btn w-max mt-0 bg-gray-700" onClick={handleClose}>
          Close Session
        </button>
      )}
    </nav>
  );
};

export default TopBar;
