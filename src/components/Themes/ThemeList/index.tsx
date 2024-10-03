import React from "react";
import ThemeCard from "../ThemeCard";
import { Theme } from "../../../pages/Dashboard";

interface ThemeListProps {
  themes: Theme[];
}

const ThemeList: React.FC<ThemeListProps> = ({ themes }) => {
  return (
    <>
      {themes.length > 0 ? (
        themes.map((theme) => <ThemeCard key={theme.id} theme={theme} />)
      ) : (
        <p>Nenhum tema encontrado.</p>
      )}
    </>
  );
};

export default ThemeList;
