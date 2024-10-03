// src/components/ThemeCard.tsx
import React from "react";
import { Theme } from "../../pages/Dashboard";

interface ThemeCardProps {
  theme: Theme;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme }) => {
  return (
    <div>
      <h3>{theme.title}</h3>
      <p>Keywords: {theme.keywords}</p>
      <p>Status: {theme.status}</p>
    </div>
  );
};

export default ThemeCard;
