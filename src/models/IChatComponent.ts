export interface ChatComponentProps {
  serverUrl: IServerURLS;
  userId?: string;
  entityId?: string;
  userName?: string;
  headers?: Record<string, string>;
}

export interface IServerURLS {
  chatURL: string;
  audioURL?: string;
  webSocketURL: string;
}

export interface CreateAxiosInstanceProps {
  serverUrl: string;
  headers?: Record<string, string>;
}
