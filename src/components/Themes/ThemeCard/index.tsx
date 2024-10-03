import React, { useState } from "react";
import { Link, Theme, ThemeStatus } from "../../../types/theme.types";
import api from "../../../services/api";
import ConfirmDeleteModal from "./ModalDeleteConfirmation";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>(theme.title);
  const [keywords, setKeywords] = useState<string>(theme.keywords);
  const [status, setStatus] = useState<ThemeStatus>(theme.status);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);

  const updateTheme = async () => {
    setLoading(true);
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
    setLoading(true);
    try {
      const response = await api.delete(`/themes/${theme.id}`);
      return response.data;
    } catch (err) {
      console.error("Erro na requisição.");
    } finally {
      setLoading(false);
    }
  };

  const searchTheme = async () => {
    setLoading(true);
    try {
      await api.get(`/themes/${theme.id}/search-news`);
      setStatus(ThemeStatus.COMPLETED)
      setTimeout(() => {
        navigate(`/themes/${theme.id}`);
      }, 500);
    } catch (err: unknown | AxiosError) {
      {
        if (axios.isAxiosError(err))  {
          if (err.status===403){
            setStatus(ThemeStatus.COMPLETED)
            console.error("A pesquisa já foi feita para este Assunto!");
          }
          else{
            setStatus(ThemeStatus.PENDING);
            console.error("Erro na requisição. Tente ajustar seus parâmetros de pesquisa novamente.");
          }
        } else {
          setStatus(ThemeStatus.IN_PROGRESS)
          console.error("Erro na requisição. Tente novamente mais tarde.");
        }
      }
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

  const onThemeSearch = async () => {
    setStatus(ThemeStatus.IN_PROGRESS);
    await searchTheme();
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
          <button type="submit" disabled={loading}>
            Salvar
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            disabled={loading}
          >
            Cancelar
          </button>
        </form>
      ) : (
        <>
          <h3>{title}</h3>
          <p>Keywords: {keywords}</p>
          <p>Status: {status}</p>
          <button onClick={() => setIsEditing(true)} disabled={loading}>
            Atualizar
          </button>
          <button
            onClick={() => setIsConfirmationModalOpen(true)}
            disabled={loading}
          >
            Deletar
          </button>
          {status === ThemeStatus.COMPLETED ? (
            <button
              type="button"
              onClick={() => navigate(`/themes/${theme.id}`)}
              disabled={loading}
            >
              Ir para Resultados!
            </button>
          ) : (
            <button type="button" onClick={onThemeSearch} disabled={loading}>
              Pesquisar!
            </button>
          )}
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
