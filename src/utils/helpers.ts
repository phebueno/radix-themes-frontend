import { ThemeStatus } from "../types/theme.types";

export const translateThemeStatus = (status: ThemeStatus): string => {
  switch (status) {
    case ThemeStatus.PENDING:
      return "Pendente";
    case ThemeStatus.IN_PROGRESS:
      return "Em Progresso";
    case ThemeStatus.COMPLETED:
      return "Completado";
    default:
      return status;
  }
};

export const statusColorMap: { [key in ThemeStatus]: string } = {
  [ThemeStatus.PENDING]: "text-yellow-500", // Amarelo para Pendente
  [ThemeStatus.IN_PROGRESS]: "text-blue-500", // Azul para Em Progresso
  [ThemeStatus.COMPLETED]: "text-green-500", // Verde para Completado
};
