import { useEffect, useState } from "react";
import api from "../../services/api";
import ThemeList from "../../components/Themes/ThemeList";
import ThemeCreationForm from "../../components/Themes/ThemeCreationForm";

export interface Link {
  id: string;
  link: URL;
}
export interface Theme {
  id: string;
  title: string;
  keywords: string;
  status: string;
  links: Link[];
  createdAt: Date;
  updatedAt: Date;
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [themes, setThemes] = useState<Theme[]>([]);

  const fetchThemes = async () => {
    try {
      const response = await api.get("/themes");
      console.log(response.data);
      setThemes(response.data);
    } catch (err) {
      console.error("Erro na requisição.");
    } finally {
      setLoading(false);
    }
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
      <ThemeList themes={themes} />
    </>
  );
};

export default Dashboard;
