import React, { useState } from "react";
import api from "../../../services/api";
import showToast from "../../../errors/toastErrors";
import { Theme } from "../../../types/theme.types";
import LoadingWidget from "../../LoadingWidget";

interface ThemeCreationForm {
  onThemeCreate: (newTheme: Theme) => void;
}

const ThemeCreationForm: React.FC<ThemeCreationForm> = ({ onThemeCreate }) => {
  const [title, setTitle] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (title.length < 3 || keywords.length < 3) {
      showToast({
        message:
          "Os campos 'Título' e 'Palavras-chave' devem ter pelo menos 3 caracteres.",
        type: "warning",
      });
      setLoading(false);
      return;
    }

    try {
      const payload = { title, keywords };
      const response = await api.post("/themes", payload);
      setTitle("");
      setKeywords("");
      onThemeCreate(response.data);
      showToast({
        message: "Assunto criado com sucesso!",
        type: "success",
      });
    } catch (err) {
      console.error("Erro ao criar Assunto:", err);
      showToast({
        message:
          "Erro inesperado ao criar o Assunto. Tente novamente mais tarde.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="title" className="text-sm font-semibold">
          Assunto:
        </label>
        <input
          className="mt-2 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" // Ajusta a margin e estilo
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          minLength={3}
          required
          disabled={loading}
        />
      </div>
      <div className="mt-4">
        {" "}
        <label htmlFor="keywords" className="text-sm font-semibold">
          Palavras-chave:
        </label>
        <input
          className="mt-2 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" // Ajusta a margin e estilo
          id="keywords"
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          minLength={3}
          required
          disabled={loading}
        />
      </div>
      <div className="flex justify-end mt-4">
        {" "}
        <button
          className="relative bg-blue-600 min-h-10 min-w-32 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-200 ease-in-out" // Suaviza a cor e transição
          type="submit"
        >
          {!loading ? "Criar Assunto" : <LoadingWidget />}
        </button>
      </div>
    </form>
  );
};

export default ThemeCreationForm;
