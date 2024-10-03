import { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [themes, setThemes] = useState();

  useEffect(() => {
    const fetchTest = async () => {
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
    fetchTest();
  }, []);

    return (
      <div>Dashboard status: {JSON.stringify(themes)}</div>
    );
  };
  
  export default Dashboard;