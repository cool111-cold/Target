import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { ProjectColors } from "../../../../assets/colors"
import { useState } from "react"

export const TargetCreateProgressiveGoalInput = ({ onValueChange, currentValue }: { onValueChange: (value: any) => void; currentValue?: any }) => {
    const [text, setText] = useState(currentValue != null ? String(currentValue) : '')

    const handleChange = (raw: string) => {
        const cleaned = raw.replace(/[^0-9]/g, '')
        setText(cleaned)
        const n = parseInt(cleaned)
        onValueChange(!isNaN(n) && n > 0 ? n : null)
    }


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        >
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={handleChange}
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor={ProjectColors.darkGrey}
                    cursorColor={ProjectColors.black}
                    textAlign="center"
                />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        height: 75,
        borderWidth: 2,
        borderColor: ProjectColors.black,
        borderRadius: 25,
        paddingHorizontal: 16,
        fontFamily: 'StackSansTextVariableFont',
        fontSize: 32,
        fontWeight: '700',
        color: ProjectColors.black,
    },
    adjButton: {
        width: 52,
        height: 75,
        borderWidth: 2,
        borderColor: ProjectColors.black,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ProjectColors.white,
    },
    adjText: {
        fontFamily: 'StackSansTextVariableFont',
        fontSize: 15,
        fontWeight: '600',
        color: ProjectColors.black,
    },
})
