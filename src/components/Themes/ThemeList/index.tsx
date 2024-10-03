import React from "react";
import ThemeCard from "../ThemeCard";
import { Theme } from "../../../pages/Dashboard";

interface ThemeListProps {
  themes: Theme[];
  onThemeUpdate: (updatedTheme: Theme) => void
  onThemeDelete: (deletedTheme: Theme) => void
}

const ThemeList: React.FC<ThemeListProps> = ({ themes, onThemeUpdate, onThemeDelete }) => {
  return (
    <>
      {themes.length > 0 ? (
        themes.map((theme) => <ThemeCard key={theme.id} theme={theme} onThemeUpdate={onThemeUpdate} onThemeDelete={onThemeDelete}/>)
      ) : (
        <p>Nenhum tema encontrado.</p>
      )}
    </>
  );
};

export default ThemeList;
