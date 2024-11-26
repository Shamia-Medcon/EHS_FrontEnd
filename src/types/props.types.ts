export type AuthValuesType = {
  loading: boolean;
  logout: () => void;
  user: UserType | null;
  setLoading: (value: boolean) => void;
  setUser: (value: UserType | null) => void;
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void;
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void;
};

export type RegisterParams = {
  email: string;
  username: string;
  password: string;
};

export type LoginParams = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type SponsorType = {
  id: number;
  url: string;
};

export type UserType = {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  memberType?: string;
  speciality?: string;
  jobTitle?: string;
  department?: string;
  hospital?: string;
  bayanati_number?: string;
  code?: string;
  token: string;
};

export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type EventType = {
  id: number;
  name: string;
  date: string;
  days: string;
  start_date: string;
  end_date: string;
  hotel: string;
  address: string;
  map: string;
  logo: string;
  banner: string;
  messages: EventMessage[];
};

export type FacultyType = {
  id: number;
  name: string;
  subtitle: string;
  brief: string;
  biography: string;
  profile: string;
};

export type AgendaType = {
  id: number;
  agenda_date: string;
  details: any[];
};

export type AgendaConferenceType = {
  id: number;
  agenda_date: string;
  details: any[];
};

export type AgendaDetailsType = {
  id: number;
  agenda_time: string;
  type: string;
  title: string;
  subtitle: string;
  colored: boolean;
};

export type AccountType = {
  id: number;
  name: string;
  email: string;
  memberType: string;
  phone: string;
  hospital: string;
  bayanati_number: string;
  speciality: string;
  jobTitle: string;
  department: string;
  code: string | null;
  code_id: number;
};

export type EventMessage = {
  id: number;
  title: string;
  image: string;
  subtitle: string;
  message_header: string;
  message_content: string;
};

export type GalleryType = {
  id: number;
  url: string;
  event: EventType;
};
