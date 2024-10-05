import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link, Theme } from "../../types/theme.types";
import api from "../../services/api";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingWidget from "../../components/LoadingWidget";

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
    return (
      <div className="relative min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center">
        <button
          onClick={handleGoBack}
          className="fixed top-4 left-4 text-lg font-medium bg-gray-800 text-gray-100 px-4 py-2 rounded shadow hover:bg-gray-700"
        >
          Voltar
        </button>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl">Assunto não encontrado!</h2>
      </div>
    );
  }

  if (!theme && loading) {
    return (
      <div className="relative min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center">
        <LoadingWidget />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center">
      <header className="w-full flex flex-col items-center justify-start py-8">
        <button
          onClick={handleGoBack}
          className="fixed top-4 left-4 text-lg font-medium bg-gray-800 text-gray-100 px-4 py-2 rounded shadow hover:bg-gray-700"
        >
          Voltar
        </button>
        <h1 className="text-4xl font-bold mb-4">{theme && theme.title}</h1>
        <h2 className="text-2xl font-semibold text-gray-400">
          Palavras-chave: {theme && theme.keywords}
        </h2>
      </header>
      <main className="w-full max-w-6xl px-4">
        <InfiniteScroll
          dataLength={links.length}
          next={() => {
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
              <div
                key={link.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col mb-4"
              >
                <div className="flex flex-grow">
                  <img
                    src={link.imgUrl ?? ""}
                    alt={link.title}
                    className="w-1/3 h-auto rounded-md object-cover mr-6"
                  />
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">
                        {link.title}
                      </h2>
                      <p className="mb-2">
                        <strong>Publicado em:</strong>{" "}
                        {new Date(link.publishedDate!).toLocaleString()}
                      </p>
                      <p className="mb-2">
                        <strong>Fonte:</strong> {link.sourceCountry}
                      </p>
                    </div>
                    <p className="mt-4">
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline text-lg"
                      >
                        Ler mais
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </InfiniteScroll>
      </main>
    </div>
  );
};

export default NewsLinks;
