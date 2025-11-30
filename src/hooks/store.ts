import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface historyItem {
    name: string;
    date: string;
    type: 'target' | 'prize';
    price: string | number;
}

export interface UserData {
    xp: number;
    ball: number;
    data: string;
    history: historyItem[];
    ephir: number;
  }

interface AppState {
    userData: UserData | null;
  
    loadUserData: () => Promise<void>;
    setUserData: (data: UserData) => Promise<void>;
    clearUserData: () => Promise<void>;
  }
  
  
export const useAppStore = create<AppState>((set) => ({
    userData: null,

    loadUserData: async () => {
        const saved = await AsyncStorage.getItem("userData");
        if (saved) {
        set({ userData: JSON.parse(saved) as UserData });
        }
    },

    setUserData: async (data: UserData) => {
        set({ userData: data });
        await AsyncStorage.setItem("userData", JSON.stringify(data));
    },

    clearUserData: async () => {
        set({ userData: null });
        await AsyncStorage.removeItem("userData");
    },
}));

