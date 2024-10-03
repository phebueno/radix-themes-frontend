import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Theme } from "../../types/theme.types";
import api from "../../services/api";

const NewsLinks: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [theme, setTheme] = useState<Theme | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await api.get(`/themes/${id}`);
        console.log(response.data.newsLinks);
        setTheme(response.data.newsLinks);
      } catch (err) {
        console.error("Erro ao carregar tema:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTheme();
    }
  }, [id]);

  if (loading) {
    return <h3>Carregando...</h3>;
  }

  if (!theme) {
    return <h2>Tema não encontrado.</h2>;
  }
  return (
    <div>
      <button onClick={handleGoBack}>Voltar</button>
      <h1>{theme.title}</h1>
      <ul>
        {theme.links.map((link) => (
          <li key={link.id}>
            <a
              href={link.link.toString()}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.link.toString()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsLinks;
