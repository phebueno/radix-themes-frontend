import React, { useState } from "react";
import api from "../../../services/api";

interface ThemeCreationForm {
  onThemeCreated: () => void;
}

const ThemeCreationForm: React.FC<ThemeCreationForm> = ({ onThemeCreated }) => {
  const [title, setTitle] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (title.length < 3 || keywords.length < 3) {
      alert("Os campos 'Title' e 'Keywords' devem ter pelo menos 3 caracteres.");
      setLoading(false);
      return;
    }

    try {
      const payload = { title, keywords };
      await api.post("/themes", payload);
      setTitle("");
      setKeywords("");
      onThemeCreated();
    } catch (err) {
      console.error("Erro ao criar tema:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          minLength={3}
          required
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="keywords">Keywords:</label>
        <input
          id="keywords"
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          minLength={3}
          required
          disabled={loading}
        />
      </div>
      <button type="submit">{loading ? "Criando..." : "Criar Assunto"}</button>
    </form>
  );
};

export default ThemeCreationForm;
