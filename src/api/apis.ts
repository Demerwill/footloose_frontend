import axios from "axios";
import {
  ICheckParticipantResponse,
  IRegisterParticipantData,
  IRegisterParticipantResponse,
  IStoresByLocationsResponse,
  IRegisterParticipationData,
  IRegisterParticipationResponse,
  IDocumentResponse,
} from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Función para verificar el participante
export const verifyParticipant = async (
  doi: string
): Promise<ICheckParticipantResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify-participant/`, {
      doi,
    });

    return response.data as ICheckParticipantResponse;
  } catch (error) {
    console.error("Error al verificar el participante:", error);
    throw error;
  }
};

// Función para registrar al participante
export const registerParticipant = async (
  participantData: IRegisterParticipantData
): Promise<IRegisterParticipantResponse> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/register-participant/`,
      participantData
    );

    return response.data as IRegisterParticipantResponse;
  } catch (error) {
    console.error("Error al registrar el participante:", error);
    throw error;
  }
};

// Función para obtener el listado de tiendas por sede
export const getStoresByLocation =
  async (): Promise<IStoresByLocationsResponse> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stores-by-location/`);

      return response.data as IStoresByLocationsResponse;
    } catch (error) {
      console.error("Error al obtener las tiendas por sede:", error);
      throw error;
    }
  };

// Función para registrar la participación
export const registerParticipation = async (
  participationData: IRegisterParticipationData
): Promise<IRegisterParticipationResponse> => {
  try {
    const formData = new FormData();
    formData.append("doi", participationData.doi);
    formData.append("location", participationData.location.toString());
    formData.append("store", participationData.store.toString());
    formData.append("purchase_amount", participationData.amount.toString());

    if (participationData.photo) {
      formData.append("purchase_photo", participationData.photo);
    }

    const response = await axios.post(
      `${API_BASE_URL}/register-participation/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data as IRegisterParticipationResponse;
  } catch (error) {
    console.error("Error al registrar la participación:", error);
    throw error;
  }
};

// Función para obtener los documentos de políticas
export const getDocuments = async (): Promise<IDocumentResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/policy-documents/`);
    return response.data as IDocumentResponse;
  } catch (error) {
    console.error("Error al obtener los documentos:", error);
    throw error;
  }
};