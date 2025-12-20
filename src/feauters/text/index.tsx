import { Text as DefaultText, TextStyle } from "react-native"
import { Language } from "./language-type";
import { useTranslate } from "./use-translate";
import { RU } from "./ru";

interface TextProps {
    children: React.ReactNode;
    style?: TextStyle;
}

const LANGUAGE_KEYS = Object.keys(RU);

export const Text = ({children, style}: TextProps) => {
    const isLanguageKey = (key: any): key is keyof Language => {
        return typeof key === 'string' && LANGUAGE_KEYS.includes(key);
    };

    const text = isLanguageKey(children) ? useTranslate(children) : children;

    return (
        <DefaultText style={style}>{text}</DefaultText>
    )
}