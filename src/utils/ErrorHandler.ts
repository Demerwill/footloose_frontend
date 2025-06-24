import axios from "axios";

// Función para manejar errores
export const handleError = (error: any): string => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "Error de conexión. Por favor, intenta más tarde.";
    }

    if (error.response.status >= 500 && error.response.status < 600) {
      return "Hubo un problema con el servidor. Por favor, intenta más tarde.";
    }

    if (error.response.status >= 400 && error.response.status < 500) {
      return (
        error.response.data?.message ||
        "Error en la solicitud. Verifica los datos e intenta nuevamente."
      );
    }
  }

  return "Ocurrió un error inesperado. Por favor, intenta más tarde.";
};
