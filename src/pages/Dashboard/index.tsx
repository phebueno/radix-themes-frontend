import { useEffect, useState } from "react";
import api from "../../services/api";
import ThemeList from "../../components/Themes/ThemeList";
import ThemeCreationForm from "../../components/Themes/ThemeCreationForm";
import { Theme } from "../../types/theme.types";
import showToast from "../../errors/toastErrors";
import InfiniteScroll from "react-infinite-scroller";

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
      console.log(response)
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
      <h1>Dashboard</h1>
      <h2>Create your theme!</h2>
      <ThemeCreationForm onThemeCreate={onThemeCreate} />
      <InfiniteScroll
        pageStart={page}
        loadMore={() => {
          if (!loading) {
            fetchThemes();
          }
        }}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        <ThemeList
          themes={themes}
          onThemeUpdate={onThemeUpdate}
          onThemeDelete={onThemeDelete}
        />
      </InfiniteScroll>
    </>
  );
};

export default Dashboard;
