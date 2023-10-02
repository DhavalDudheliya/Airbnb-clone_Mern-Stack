import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  async function registerUser(event, response) {
    event.preventDefault();
    if (name === "" || email === "" || password === "") {
      alert("Please fill all fields");
    } else {
      // setButtonLoading(true);
      try {
        await axios.post("/register", {
          name,
          email,
          password,
        });
        alert("Register Succesfull");
        // .then((response) => {
        //   if (response.data.message == "User already Exists") {
        //     toast.error("User already exists");
        //   }
        // })
        // setButtonLoading(false);
      } catch (e) {
        alert("Registration failed. Please try again later");
        // setButtonLoading(false);
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-32">
          <h1 className="text-4xl text-center mb-6">Register</h1>
          <form className="max-w-md mx-auto" onSubmit={registerUser}>
            <input
              type="text"
              placeholder="Dhaval Dudheliya"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <button className="primary">
              {/* {buttonLoading ? <ButtonLoading /> : <p>Register</p>} */}
              <p>Register</p>
            </button>
            <div className="text-center text-gray-500">
              <p>
                Already a member?{" "}
                <Link className="underline text-black" to={"/login"}>
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
