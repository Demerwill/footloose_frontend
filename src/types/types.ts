export interface ILoginData {
  doi: string;
}
export interface ICheckParticipantResponse {
  status: string;
  data: {
    isRegistered: boolean;
  };
  message: string;
}

export interface IRegisterParticipantData {
  doi: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  acceptPolicy: boolean;
  acceptTerms: boolean;
  acceptMarketing: boolean;
}

export interface IRegisterParticipantResponse {
  status: string;
  data: {
    participant_id: string;
    doi: string;
  };
  message: string;
}

export interface IStoreData {
  id: string;
  name: string;
}

export interface IStoresByLocationsData {
  id: string;
  name: string;
  stores: IStoreData[] | [];
}

export interface IStoresByLocationsResponse {
  status: string;
  data: IStoresByLocationsData[] | [];
  message: string;
}

export interface IRegisterParticipationData {
  doi: string;
  location: string;
  store: string;
  amount: number;
  photo: File | null;
}

export interface IRegisterParticipationResponse {
  status: string;
  data: {
    register_id: string;
  };
  message: string;
}

export interface IDocumentResponse {
  status: string;
  data: {
    policy_file: string;
    terms_file: string;
    marketing_file: string;
  };
  message: string;
}
