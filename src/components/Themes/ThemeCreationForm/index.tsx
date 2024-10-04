import React, { useState } from "react";
import api from "../../../services/api";
import showToast from "../../../errors/toastErrors";
import { Theme } from "../../../types/theme.types";

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
        message: "Os campos 'Título' e 'Palavras-chave' devem ter pelo menos 3 caracteres.",
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
      console.error("Erro ao criar tema:", err);
      showToast({
        message: "Erro inesperado ao criar o Assunto. Tente novamente mais tarde.",
        type: "error",
      });
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
