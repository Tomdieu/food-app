import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DISCUSSIONS } from "../constants";

export interface User {
  id?: number;
  name: string;
}

export interface Discussion {
  id?: number;
  users: User[];
  messages: Messages[];
}

export interface Messages {
  id?: number;
  sender: User;
  content?: string;
  file?: string;
  fileType?: string;
  timestamp: number;
}

interface ChatState {
  chats: Discussion[];
  addMessage: (discussionId: number, message: Messages) => void;
  createDiscussion: (discussion: Discussion) => void;
  clearChats: () => void;
  loadChats: () => void;
}

const useChats = create<ChatState>((set) => ({
  chats: [],
  addMessage: (discussionId: number, message: Messages) =>
    set((state) => ({
      chats: state.chats.map((discussion) =>
        discussion.id === discussionId
          ? {
              ...discussion,
              messages: [...discussion.messages, message],
            }
          : discussion
      ),
    })),
  createDiscussion: (discussion: Discussion) =>
    set((state) => ({
      chats: [...state.chats, discussion],
    })),
  clearChats: () =>
    set((state) => ({
      chats: [],
    })),
  loadChats: () => {
    set({ chats: DISCUSSIONS });
  },
}));

export default useChats;
