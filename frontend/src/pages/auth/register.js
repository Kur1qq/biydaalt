import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

export default function Register(){
  const [data, setData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: ""
  });
  
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5001/api/users/register";
      const { data: res } = await axios.post(url, data);

      setMessage("Амжилттай бүртгэгдлээ. Логин хуудас руу шилжиж байна...");
      
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.error("ERROR:", error);
      if (error.response) {
        if (error.response.status === 400) {
          alert(`Бүртгэлийн алдаа: ${error.response.data.message}`);
        } else {
          alert(`Серверийн алдаа (${error.response.status}): ${error.response.statusText}`);
        }
      } else {
        alert("Сервертэй холболт үүсгэхэд алдаа гарлаа. Дахин оролдоно уу.");
      }
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-cyan-600 mb-4">Бүртгүүлэх</h2>
        
        <input
          type="text"
          name="name"
          placeholder="Нэр"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          onChange={handleChange}
          value={data.name}
          required
        />
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
          type="text"
          name="phone_number"
          placeholder="Утасны дугаар"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          onChange={handleChange}
          value={data.phone_number}
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
            Бүртгүүлэх
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-1/2 bg-gray-300 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-400 ml-2"
          >
            Буцах
          </button>
        </div>
        
        {message && (
          <div className="mt-4 text-center text-green-600 font-semibold">
            {message}
          </div>
        )}
      </form>
    </div>
  );  
}
