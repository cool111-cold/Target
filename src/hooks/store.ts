import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface historyItem {
    name: string;
    date: string;
    type: 'target' | 'prize';
    price: string | number;
}

interface targetData {
    name: string;
    ball: number;
    ephir: number;
    data: string;
    type: 'Daily' | 'Disposable'
    color: number;
}

export interface UserData {
    xp: number;
    ball: number;
    data: string;
    history: historyItem[];
    ephir: number;
    targets: targetData[] | undefined;
  }

interface AppState {
    userData: UserData | null;

    loadUserData: () => Promise<void>;
    setUserData: (data: UserData) => Promise<void>;
    clearUserData: () => Promise<void>;
    updateUserData: (partial: Partial<UserData>) => Promise<void>;
    addHistoryItem: (item: historyItem) => Promise<void>;
    incrementRewards: (xp: number, ball: number) => Promise<void>;
    addTarget: (target: targetData) => Promise<void>;
    removeHistoryItem: (index: number) => Promise<void>;
  }
  
  
export const useAppStore = create<AppState>((set, get) => ({
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

    updateUserData: async (partial: Partial<UserData>) => {
        const currentData = get().userData;
        if (!currentData) return;

        const newData = { ...currentData, ...partial };
        set({ userData: newData });
        await AsyncStorage.setItem("userData", JSON.stringify(newData));
    },

    addHistoryItem: async (item: historyItem) => {
        const currentData = get().userData;
        if (!currentData) return;

        const newData = {
            ...currentData,
            history: [...currentData.history, item]
        };
        set({ userData: newData });
        await AsyncStorage.setItem("userData", JSON.stringify(newData));
    },

    incrementRewards: async (xp: number, ball: number) => {
        const currentData = get().userData;
        if (!currentData) return;

        const newData = {
            ...currentData,
            xp: currentData.xp + xp,
            ball: currentData.ball + ball
        };
        set({ userData: newData });
        await AsyncStorage.setItem("userData", JSON.stringify(newData));
    },

    addTarget: async (target: targetData) => {
        const currentData = get().userData;
        if (!currentData) {
            console.warn('addTarget: userData is null, initializing default data');
            const defaultData: UserData = {
                xp: 0,
                ball: 0,
                data: new Date().toLocaleDateString("ru-RU"),
                history: [],
                ephir: 0,
                targets: [target]
            };
            set({ userData: defaultData });
            await AsyncStorage.setItem("userData", JSON.stringify(defaultData));
            return;
        }

        const newData = {
            ...currentData,
            targets: [...(currentData.targets ?? []), target]
        };
        set({ userData: newData });
        await AsyncStorage.setItem("userData", JSON.stringify(newData));
    },

    removeHistoryItem: async (index: number) => {
        const currentData = get().userData;
        if (!currentData) return;

        const itemToRemove = currentData.history[index];
        if (!itemToRemove) return;

        const newHistory = currentData.history.filter((_, i) => i !== index);

        // Если это была цель (target), отнимаем баллы и XP
        // Если это был приз (prize), возвращаем баллы
        const isTarget = itemToRemove.type === 'target';
        const priceValue = typeof itemToRemove.price === 'string'
            ? parseInt(itemToRemove.price)
            : itemToRemove.price;

        const newData = {
            ...currentData,
            history: newHistory,
            xp: isTarget ? Math.max(0, currentData.xp - 10) : currentData.xp,
            ball: isTarget
                ? Math.max(0, currentData.ball - priceValue)
                : currentData.ball + priceValue
        };
        set({ userData: newData });
        await AsyncStorage.setItem("userData", JSON.stringify(newData));
    },
}));

