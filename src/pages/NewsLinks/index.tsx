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
    const fetchThemeLinks = async () => {
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
      fetchThemeLinks();
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
            <h2>{link.title}</h2>
            <p>
              <strong>Publicado em:</strong> {new Date(link.publishedDate!).toLocaleString()} {/* Formata a data */}
            </p>
            <p>
              <strong>Fonte:</strong> {link.sourceCountry}
            </p>
            <img src={link.imgUrl ?? ""} alt={link.title} style={{ maxWidth: "100%", height: "auto" }} /> {/* Exibe a imagem */}
            <p>
              <a
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ler mais
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsLinks;
