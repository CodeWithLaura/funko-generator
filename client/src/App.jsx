import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [form, setForm] = useState({
    nombre: "",
    estilo: "",
    accesorios: "",
    colores: "",
    ropa: "",
    pose: "",
    fondo: ""
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/generar", form);
      setImage(res.data.image);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Generador de Funko Pop</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className="p-2 border rounded"
          />
        ))}
        <button
          type="submit"
          className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
        >
          Generar Funko
        </button>
      </form>

      {loading && <p className="mt-4">Generando imagen...</p>}
      {image && (
        <img src={image} alt="Funko generado" className="mt-4 rounded-xl shadow-lg" />
      )}
    </div>
  );
}
