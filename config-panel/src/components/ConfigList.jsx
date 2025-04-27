import { useEffect, useState } from "react";

const API_URL = `${import.meta.env.VITE_API_URL}/api/configurations`;

function ConfigList({ onEdit, onDeleted }) {
  const [configs, setConfigs] = useState([]);
  const [applicationName, setApplicationName] = useState("SERVICE-A");

  useEffect(() => {
    fetch(`${API_URL}?applicationName=${applicationName}`)
      .then((res) => res.json())
      .then((data) => setConfigs(data))
      .catch((err) => console.error("Veri alınamadı:", err));
  }, [applicationName, onDeleted]); // yenileme için onDeleted dependency

  const handleDelete = (id) => {
    if (!confirm("Bu kaydı silmek istediğine emin misin?")) return;

    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Silme başarısız");
        // Listeyi yeniden yüklemek için değişkeni tetikle
        onDeleted?.();
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Konfigürasyon Listesi</h2>

      <input
        type="text"
        value={applicationName}
        onChange={(e) => setApplicationName(e.target.value)}
        className="border px-3 py-2 mb-4 w-full"
        placeholder="Application Name ile filtrele"
      />

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Value</th>
            <th className="p-2 border">IsActive</th>
            <th className="p-2 border">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {configs.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-2 border">{c.name}</td>
              <td className="p-2 border">{c.type}</td>
              <td className="p-2 border">{c.value}</td>
              <td className="p-2 border">{c.isActive ? "✔️" : "❌"}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => onEdit?.(c)}
                  className="bg-yellow-400 text-sm px-2 py-1 rounded"
                >
                  Güncelle
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="bg-red-500 text-white text-sm px-2 py-1 rounded"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConfigList;
