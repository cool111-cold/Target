import { TouchableOpacity, StyleSheet, View, Text } from "react-native"
import { ProjectColors } from "../../../assets/colors"

interface ButtonProps {
    title: string,
    containerStyle?: any,
    onClick: () => void,
}

export const Button = ({title, containerStyle, onClick}: ButtonProps) => {
    return (
        <TouchableOpacity onPress={onClick}>
            <View style={[styles.container, containerStyle]}>
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
        backgroundColor: ProjectColors.black,
        borderRadius: 5
        
    },
    text: {
        fontSize: 14,
        fontFamily: 'StackSansTextVariableFont',
        color: ProjectColors.grey
    }
})