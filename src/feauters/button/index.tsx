import { TouchableOpacity, StyleSheet, View, Text } from "react-native"
import { ProjectColors } from "../../../assets/colors"

interface ButtonProps {
    title: string,
    containerStyle?: any,
    onClick: () => void,
    disabled?: boolean;
}

export const Button = ({title, containerStyle, onClick, disabled}: ButtonProps) => {
    const handlePress = () => {
        if (!disabled) {
            onClick();
        }
    }
    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={[styles.container, containerStyle, {backgroundColor: disabled ? ProjectColors.lightGrey : ProjectColors.black}]}>
                <Text style={styles.text}>{title}</Text>
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