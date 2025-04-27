import { useState, useEffect } from "react";

const API_URL = `${import.meta.env.VITE_API_URL}/api/configurations`; // Doğru olan bu

function UpdateConfigForm({ selectedConfig, onUpdated, onCancel }) {
  const [formData, setFormData] = useState(selectedConfig);

  useEffect(() => {
    setFormData(selectedConfig); // seçilen konfigürasyon değişirse güncelle
  }, [selectedConfig]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/${formData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Güncelleme başarısız");
        onUpdated();
      })
      .catch((err) => alert(err.message));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded shadow mb-6 bg-yellow-50">
      <h2 className="text-xl font-bold">Konfigürasyonu Güncelle</h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Key (name)"
        required
        className="w-full border p-2"
      />

      <select name="type" value={formData.type} onChange={handleChange} className="w-full border p-2">
        <option value="string">string</option>
        <option value="int">int</option>
        <option value="bool">bool</option>
        <option value="double">double</option>
      </select>

      <input
        name="value"
        value={formData.value}
        onChange={handleChange}
        placeholder="Değer"
        required
        className="w-full border p-2"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
        />
        Aktif mi?
      </label>

      <input
        name="applicationName"
        value={formData.applicationName}
        onChange={handleChange}
        placeholder="Application Name"
        required
        className="w-full border p-2"
      />

      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Güncelle
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded">
          İptal
        </button>
      </div>
    </form>
  );
}

export default UpdateConfigForm;
