import React, { useState } from "react";
import { Theme, ThemeStatus } from "../../../types/theme.types";
import api from "../../../services/api";
import ConfirmDeleteModal from "./ModalDeleteConfirmation";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import showToast from "../../../errors/toastErrors";
import { statusColorMap, translateThemeStatus } from "../../../utils/helpers";

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
      showToast({
        message: "Assunto atualizado com sucesso!",
        type: "success",
      });
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.status === 404) {
          console.error(err);
          showToast({
            message: "Tema não encontrado!",
            type: "error",
          });
        } else {
          console.error(err);
          showToast({
            message: "Erro na requisição. Tente novamente mais tarde.",
            type: "error",
          });
        }
      } else {
        console.error("Erro na requisição. Tente novamente mais tarde.");
        showToast({
          message: "Erro na requisição. Tente novamente mais tarde.",
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteTheme = async () => {
    setLoading(true);
    try {
      const response = await api.delete(`/themes/${theme.id}`);
      showToast({
        message: "Assunto deletado com sucesso!",
        type: "success",
      });
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.status === 404) {
          console.error(err);
          showToast({
            message: "Tema não encontrado!",
            type: "error",
          });
        } else {
          console.error(err);
          showToast({
            message: "Erro na requisição. Tente novamente mais tarde.",
            type: "error",
          });
        }
      } else {
        console.error("Erro na requisição. Tente novamente mais tarde.");
        showToast({
          message: "Erro na requisição. Tente novamente mais tarde.",
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const searchTheme = async () => {
    setLoading(true);
    try {
      await api.get(`/themes/${theme.id}/search-news`);
      setStatus(ThemeStatus.COMPLETED);
      showToast({
        message: "Pesquisa concluída! Você será redirecionado em breve.",
        type: "success",
      });
      setTimeout(() => {
        navigate(`/themes/${theme.id}`);
      }, 3000);
    } catch (err: unknown | AxiosError) {
      {
        if (axios.isAxiosError(err)) {
          if (err.status === 403) {
            setStatus(ThemeStatus.COMPLETED);
            console.error(err);
            showToast({
              message: "A pesquisa já foi feita para este Assunto!",
              type: "error",
            });
          } else {
            setStatus(ThemeStatus.PENDING);
            console.error(
              "Erro na requisição. Tente ajustar seus parâmetros de pesquisa novamente."
            );
            showToast({
              message:
                "Não foram encontrados resultados! Tente ajustar seus parâmetros de pesquisa novamente.",
              type: "error",
            });
          }
        } else {
          setStatus(ThemeStatus.IN_PROGRESS);
          console.error("Erro na requisição. Tente novamente mais tarde.");
          showToast({
            message: "Erro na requisição. Tente novamente mais tarde.",
            type: "error",
          });
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
    <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="flex flex-col space-y-4">
          <div>
            <label htmlFor="title" className="text-sm font-semibold">
              Assunto:
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              minLength={3}
              required
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="keywords" className="text-sm font-semibold">
              Palavras-chave:
            </label>
            <input
              id="keywords"
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              disabled={loading}
              minLength={3}
              required
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              disabled={loading}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition"
            >
              Atualizar
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h3 className="text-white font-bold">{title}</h3>
          <p className="text-gray-400">Palavras-chave: {keywords}</p>
          <p className="text-gray-400">
            Status:{" "}
            <span className={statusColorMap[status]}>
              {translateThemeStatus(status)}
            </span>
          </p>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setIsEditing(true)}
              disabled={loading}
              className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-500 transition"
            >
              Editar
            </button>
            <button
              onClick={() => setIsConfirmationModalOpen(true)}
              disabled={loading}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition"
            >
              Deletar
            </button>
            {status === ThemeStatus.COMPLETED ? (
              <button
                type="button"
                onClick={() => navigate(`/themes/${theme.id}`)}
                disabled={loading}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition"
              >
                Ir para Resultados!
              </button>
            ) : (
              <button
                type="button"
                onClick={onThemeSearch}
                disabled={loading}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition"
              >
                Pesquisar Assunto...
              </button>
            )}
          </div>
        </div>
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
