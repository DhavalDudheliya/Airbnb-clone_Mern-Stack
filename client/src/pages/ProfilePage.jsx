import { useContext, useState } from "react";
import { UserContext } from "../components/UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage.jsx";
import AccountNav from "../components/AccountNav.jsx";
import { BASE_URL } from "../services/helper.js";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post(`${BASE_URL}/logout`);
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (!user && ready && !redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as a {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm">
            Logout
          </button>
        </div>
      )}
      {subpage == "places" && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  );
}
