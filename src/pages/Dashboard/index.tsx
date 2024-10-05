import { useEffect, useState } from "react";
import api from "../../services/api";
import ThemeList from "../../components/Themes/ThemeList";
import ThemeCreationForm from "../../components/Themes/ThemeCreationForm";
import { Theme } from "../../types/theme.types";
import showToast from "../../errors/toastErrors";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingWidget from "../../components/LoadingWidget";

const Dashboard: React.FC = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [page, setPage] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchThemes = async () => {
    setLoading(true);
    try {
      const url = `/themes?page=${page}&offset=${offset}`;
      const response = await api.get(url);
      setThemes((prevThemes) => [...prevThemes, ...response.data.themes]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(response.data.meta.hasMore);
    } catch (err) {
      console.error("Erro na requisição: ", err);
      showToast({
        message:
          "Não foi possível acessar os assuntos. Tente novamente mais tarde.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onThemeCreate = async (newTheme: Theme) => {
    setThemes((prevThemes) => [newTheme, ...prevThemes]);
    setOffset((prevOffset) => prevOffset + 1);
  };

  const onThemeUpdate = async (updatedTheme: Theme) => {
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === updatedTheme.id ? { ...theme, ...updatedTheme } : theme
      )
    );
  };

  const onThemeDelete = async (deletedTheme: Theme) => {
    setThemes((prevThemes) =>
      prevThemes.filter((theme) => theme.id !== deletedTheme.id)
    );
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center">
        <header className="w-full flex flex-col items-center justify-start py-8">
          {" "}
          <h1 className="text-5xl font-bold mb-4">RadixThemes</h1>
          <h2 className="text-2xl font-semibold text-gray-400">
            Se informe sobre o seu <span className="font-bold">Assunto</span>{" "}
            predileto!
          </h2>
        </header>
        <main className="w-full max-w-lg px-4">
          <ThemeCreationForm onThemeCreate={onThemeCreate} />
          <InfiniteScroll
            dataLength={themes.length}
            next={() => {
              if (!loading) {
                fetchThemes();
              }
            }}
            style={{ overflow: 'hidden' }}
            hasMore={hasMore}
            loader={
              <div className="relative loader" key={0}>
                <LoadingWidget />
              </div>
            }
          >
            <ThemeList
              themes={themes}
              onThemeUpdate={onThemeUpdate}
              onThemeDelete={onThemeDelete}
            />
          </InfiniteScroll>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
