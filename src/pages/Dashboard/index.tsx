import { useEffect, useState } from "react";
import api from "../../services/api";
import ThemeList from "../../components/Themes/ThemeList";
import ThemeCreationForm from "../../components/Themes/ThemeCreationForm";
import { Theme } from "../../types/theme.types";
import showToast from "../../errors/toastErrors";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [themes, setThemes] = useState<Theme[]>([]);

  const fetchThemes = async () => {
    try {
      const response = await api.get("/themes");
      setThemes(response.data);
    } catch (err) {
      console.error("Erro na requisição: ", err);
      showToast({
        message: "Não foi possível acessar os assuntos. Tente novamente mais tarde.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <h1>Dashboard</h1>
      <h2>Create your theme!</h2>
      <ThemeCreationForm onThemeCreated={fetchThemes} />
      <ThemeList
        themes={themes}
        onThemeUpdate={onThemeUpdate}
        onThemeDelete={onThemeDelete}
      />
    </>
  );
};

export default Dashboard;
