import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from "react-native"
import { ProjectColors } from "../../../../assets/colors"

export const TargetCreateNameInput = ({ onValueChange, currentValue }: { onValueChange: (value: any) => void, currentValue?: any }) => {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "padding"}
            keyboardVerticalOffset={0}
        >
            <View style={{ flex: 1, justifyContent: "center" }}>
                <TextInput
                    style={styles.container}
                    value={currentValue}
                    onChangeText={onValueChange}
                    placeholder={'Name...'}
                    placeholderTextColor={ProjectColors.darkGrey}
                    cursorColor={ProjectColors.black}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 75,
        borderWidth: 2,
        borderColor: ProjectColors.black,
        borderRadius: 25,
        paddingHorizontal: 12
    }
})