import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5001/api/users/login";
      const { data: res } = await axios.post(url, data);

      if (res.token) {
        localStorage.setItem("token", res.token);
        navigate("/");
        window.location.reload();
      } else {
        alert(res.message || "Нэвтрэхэд алдаа гарлаа.");
      }
    } catch (error) {
      console.log("ERROR:", error);
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        alert("Нэвтрэхэд алдаа гарлаа. Дахин оролдоно уу.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-center text-cyan-600 mb-4">
          Нэвтрэх
        </h2>
        <input
          type="email"
          name="email"
          placeholder="И-мэйл"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          onChange={handleChange}
          value={data.email}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Нууц үг"
          className="w-full p-3 mb-6 border border-gray-300 rounded-md"
          onChange={handleChange}
          value={data.password}
          required
        />
        
        <div className="flex justify-between">
          <button
            type="submit"
            className="w-1/2 bg-cyan-500 text-white py-3 rounded-full font-semibold hover:bg-cyan-600 mr-2"
          >
            Нэвтрэх
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-1/2 bg-gray-300 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-400 ml-2"
          >
            Буцах
          </button>
        </div>
      </form>
    </div>
  );  
}
