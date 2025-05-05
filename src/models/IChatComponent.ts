export interface ChatComponentProps {
  languageCode?: LanguageProps;
  formatSelected?: string;
  serverUrl: IServerURLS;
  userId: string;
  entityId: string;
  userName: string;
  headers?: Record<string, string>;
  showLanguageSelector?: boolean;
  format?: string;
}

export interface IServerURLS {
  chatURL: string;
  audioURL?: string;
  audioOutputURL?: string;
  webSocketURL: string;
}

export interface CreateAxiosInstanceProps {
  serverUrl: string;
  headers?: Record<string, string>;
}

export interface LanguageProps {
  label: string;
  value: string;
}
