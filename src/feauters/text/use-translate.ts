import { RU } from "./ru";
import { ENG } from "./eng";
import { Language } from "./language-type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const Map = {
    'ru': RU,
    'eng': ENG
}

export type LanguageType = 'ru' | 'eng';

interface LanguageState {
    currentLanguage: LanguageType;
    loadLanguage: () => Promise<void>;
    setLanguage: (lang: LanguageType) => Promise<void>;
}

export const useLanguageStore = create<LanguageState>((set) => ({
    currentLanguage: 'ru',

    loadLanguage: async () => {
        try {
            const saved = await AsyncStorage.getItem("language");
            if (saved && (saved === 'ru' || saved === 'eng')) {
                set({ currentLanguage: saved as LanguageType });
            }
        } catch (error) {
            console.error('Error loading language:', error);
        }
    },

    setLanguage: async (lang: LanguageType) => {
        try {
            set({ currentLanguage: lang });
            await AsyncStorage.setItem("language", lang);
        } catch (error) {
            console.error('Error saving language:', error);
        }
    },
}));

export const useTranslate = (value: keyof Language): string => {
    const currentLanguage = useLanguageStore((s) => s.currentLanguage);
    return Map[currentLanguage][value];
}