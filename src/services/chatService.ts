import { CreateAxiosInstanceProps } from "../models/IChatComponent";
import { createAxiosInstance } from "./axiosInstance";

class ChatService {
  getChatHistory = async (
    user_id: string,
    page: string,
    page_size: string,
    order: string,
    options: CreateAxiosInstanceProps
  ) => {
    const axiosClient = createAxiosInstance(options);
    try {
      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("page", page);
      formData.append("page_size", page_size);
      formData.append("order", order);

      const data = await axiosClient.post(options.serverUrl, formData, {
        headers: {
          ...options.headers,
        },
      });

      if (data.status === 200) {
        return {
          ...data.data,
        };
      }
      return {};
    } catch (error) {
      console.log("ERROR", error);
      return {
        error,
      };
    }
  };

  // CHAT CONVERSION
  audio_transcribe = async (
    audioFile: any,
    user_id: string,
    options: CreateAxiosInstanceProps
  ) => {
    const axiosClient = createAxiosInstance(options);
    try {
      let formdata = new FormData();

      formdata.append("audio", audioFile?.blob, "recording.webm");
      formdata.append("user_id", user_id);
      formdata.append("provider", "openai");
      // 'provider': 'openai',

      const data = await axiosClient.post(options.serverUrl, formdata, {
        ...options.headers,
      });

      if (data.status === 200) {
        return {
          ...data.data,
        };
      }
      return {};
    } catch (error) {
      console.log("ERROR", error);
      return {
        error,
      };
    }
  };
}

const chatService = new ChatService();

export default chatService;
