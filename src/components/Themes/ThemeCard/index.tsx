import React, { useState } from "react";
import { Theme } from "../../../pages/Dashboard";
import api from "../../../services/api";
import ConfirmDeleteModal from "./ModalDeleteConfirmation";

interface ThemeCardProps {
  theme: Theme;
  onThemeUpdate: (updatedTheme: Theme) => void;
  onThemeDelete: (deletedTheme: Theme) => void;
}

const ThemeCard: React.FC<ThemeCardProps> = ({
  theme,
  onThemeUpdate,
  onThemeDelete,
}) => {
  const [title, setTitle] = useState<string>(theme.title);
  const [keywords, setKeywords] = useState<string>(theme.keywords);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);

  const updateTheme = async () => {
    const payload = { title, keywords };
    try {
      const response = await api.put(`/themes/${theme.id}`, payload);
      return response.data;
    } catch (err) {
      console.error("Erro na requisição.");
    } finally {
      setLoading(false);
    }
  };

  const deleteTheme = async () => {
    try {
      const response = await api.delete(`/themes/${theme.id}`);
      return response.data;
    } catch (err) {
      console.error("Erro na requisição.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTheme = await updateTheme();
    onThemeUpdate(updatedTheme);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteTheme();    
    onThemeDelete(theme);
    setIsConfirmationModalOpen(false);
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="status">Title:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div>
            <label htmlFor="keywords">Keywords:</label>
            <input
              id="keywords"
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancelar
          </button>
        </form>
      ) : (
        <>
          <h3>{theme.title}</h3>
          <p>Keywords: {theme.keywords}</p>
          <p>Status: {theme.status}</p>
          <button onClick={() => setIsEditing(true)}>Atualizar</button>
          <button onClick={() => setIsConfirmationModalOpen(true)}>
            Deletar
          </button>
        </>
      )}
      {isConfirmationModalOpen && (
        <ConfirmDeleteModal
          onConfirm={handleDelete}
          onClose={() => setIsConfirmationModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ThemeCard;
