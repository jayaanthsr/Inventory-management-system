import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadImage from "../components/UploadImage";

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    imageUrl: "",
  });

  const navigate = useNavigate();

  // Handling Input change for registration form.
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Register User
  const registerUser = () => {
    fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((result) => {
        alert("Successfully Registered, Now Login with your details");
        navigate('/login')
      })
      .catch((err) => console.log(err));
  };
  
  // Uploading image to cloudinary
  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "inventoryapp");

    await fetch("https://api.cloudinary.com/v1_1/ddhayhptm/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setForm({ ...form, imageUrl: data.url });
        alert("Image Successfully Uploaded");
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-sm p-6 space-y-4 bg-gray-800 shadow-lg rounded-lg">
        <div className="text-center">
          <img
            className="mx-auto h-8 w-auto"
            src={require("../assets/logo.png")}
            alt="Your Company"
          />
          <h2 className="mt-4 text-xl font-bold tracking-tight text-white">
            Register your account
          </h2>
        </div>
        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                name="firstName"
                type="text"
                required
                className="w-full p-2 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleInputChange}
              />
              <input
                name="lastName"
                type="text"
                required
                className="w-full p-2 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleInputChange}
              />
            </div>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full p-2 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="Email address"
              value={form.email}
              onChange={handleInputChange}
            />
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full p-2 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="Password"
              value={form.password}
              onChange={handleInputChange}
            />
            <input
              name="phoneNumber"
              type="number"
              autoComplete="phoneNumber"
              required
              className="w-full p-2 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={handleInputChange}
            />
            <UploadImage uploadImage={uploadImage} />
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-500 rounded focus:ring-indigo-400"
              checked
              required
            />
            <label htmlFor="remember-me" className="text-sm text-white">
              I Agree to Terms & Conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            onClick={registerUser}
          >
            Sign up
          </button>
          <p className="mt-2 text-center text-sm text-gray-400">
            Already have an account? 
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300"> Sign in now</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;