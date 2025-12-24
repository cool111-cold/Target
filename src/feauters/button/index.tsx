import { TouchableOpacity, StyleSheet, View, TextStyle, ViewStyle } from "react-native"
import { ProjectColors } from "../../../assets/colors"
import { Text } from "../text";

interface ButtonProps {
    title: string,
    containerStyle?: ViewStyle,
    onClick: () => void,
    disabled?: boolean;
    textStyle?: TextStyle;
}

export const Button = ({title, containerStyle, onClick, disabled, textStyle}: ButtonProps) => {
    const handlePress = () => {
        if (!disabled) {
            onClick();
        }
    }
    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={[{backgroundColor: disabled ? ProjectColors.lightGrey : ProjectColors.black}, styles.container, containerStyle]}>
                <Text style={[styles.text, textStyle]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 5
        
    },
    text: {
        fontSize: 14,
        fontFamily: 'StackSansTextVariableFont',
        color: ProjectColors.grey
    }
})