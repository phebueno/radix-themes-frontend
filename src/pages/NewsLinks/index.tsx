import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link, Theme } from "../../types/theme.types";
import api from "../../services/api";
import InfiniteScroll from "react-infinite-scroller";

const NewsLinks: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [theme, setTheme] = useState<Theme | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleGoBack = () => {
    navigate(-1);
  };

  const fetchThemeLinks = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/themes/${id}?page=${page}`);
      setTheme(response.data.theme);
      setLinks((prevLinks) => [...prevLinks, ...response.data.theme.links]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(response.data.meta.hasMore);
    } catch (err) {
      console.error("Erro ao carregar tema:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchThemeLinks();
    }
  }, [id]);

  if (!theme && !loading) {
    return <h2>Tema não encontrado.</h2>;
  }
  return (
    <div>
      <button onClick={handleGoBack}>Voltar</button>
      <h1>{theme && theme.title}</h1>
      <ul>
        <InfiniteScroll
          pageStart={page}
          loadMore={() => {
            if (!loading) {
              fetchThemeLinks();
            }
          }}
          hasMore={hasMore}
          loader={
            <div className="loader" key={0}>
              Carregando...
            </div>
          }
        >
          {links &&
            links.map((link) => (
              <li key={link.id}>
                <h2>{link.title}</h2>
                <p>
                  <strong>Publicado em:</strong>
                  {new Date(link.publishedDate!).toLocaleString()}
                </p>
                <p>
                  <strong>Fonte:</strong> {link.sourceCountry}
                </p>
                <img
                  src={link.imgUrl ?? ""}
                  alt={link.title}
                  style={{ maxWidth: "100%", height: "auto" }}
                />{" "}
                <p>
                  <a href={link.link} target="_blank" rel="noopener noreferrer">
                    Ler mais
                  </a>
                </p>
              </li>
            ))}
        </InfiniteScroll>
      </ul>
    </div>
  );
};

export default NewsLinks;
