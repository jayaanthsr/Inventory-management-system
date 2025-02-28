import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const authCheck = () => {
    setTimeout(() => {
      fetch("http://localhost:4000/api/login")
        .then((response) => response.json())
        .then((data) => {
          alert("Successfully Logged In");
          localStorage.setItem("user", JSON.stringify(data));
          authContext.signin(data._id, () => {
            navigate("/");
          });
        })
        .catch((err) => {
          alert("Wrong credentials, Try again");
          console.log(err);
        });
    }, 3000);
  };

  const loginUser = (e) => {
    if (form.email === "" || form.password === "") {
      alert("To login, enter details to proceed...");
    } else {
      fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(form),
      })
        .then((result) => {
          console.log("User login", result);
        })
        .catch((error) => {
          console.log("Something went wrong ", error);
        });
    }
    authCheck();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen bg-gray-900 text-white items-center place-items-center">
      <div className="flex justify-center">
        <img src={require("../assets/signup.jpg")} alt="" className="rounded-lg shadow-lg" />
      </div>
      <div className="w-full max-w-md space-y-8 p-10 rounded-lg bg-gray-800 shadow-md">
        <div className="text-center">
          <img className="mx-auto h-12 w-auto" src={require("../assets/logo.png")} alt="Your Company" />
          <h2 className="mt-6 text-3xl font-bold">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-400">Or start your 14-day free trial</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-3/4 rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-gray-600 bg-gray-700 focus:ring-indigo-500"
                placeholder="Email address"
                value={form.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col items-center">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-3/4 rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-gray-600 bg-gray-700 focus:ring-indigo-500"
                placeholder="Password"
                value={form.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 bg-gray-700 text-indigo-500 focus:ring-indigo-500"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <span className="text-indigo-400 hover:text-indigo-300 cursor-pointer">Forgot your password?</span>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-3/4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
              onClick={loginUser}
            >
              Sign in
            </button>
            <p className="mt-2 text-sm text-gray-400">
              Don't have an account? <Link to="/register" className="text-indigo-400 hover:text-indigo-300">Register now</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
