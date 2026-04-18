import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from "react-native"
import { ProjectColors } from "../../../../assets/colors"
import { useTranslate as t } from "../../../feauters/text/use-translate"

export const TargetCreateNameDescriptionInput = ({ onValueChange, currentValue }: { onValueChange: (value: any) => void, currentValue?: any }) => {
    const name = currentValue?.name ?? ''
    const description = currentValue?.description ?? ''

    const handleNameChange = (text: string) => {
        onValueChange({ name: text, description })
    }

    const handleDescriptionChange = (text: string) => {
        onValueChange({ name, description: text })
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "padding"}
            keyboardVerticalOffset={0}
        >
            <View style={{ flex: 1, justifyContent: "center", gap: 12 }}>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={handleNameChange}
                    placeholder={t('namePlaceholder')}
                    placeholderTextColor={ProjectColors.darkGrey}
                    cursorColor={ProjectColors.black}
                />
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    value={description}
                    onChangeText={handleDescriptionChange}
                    placeholder={t('descriptionPlaceholder')}
                    placeholderTextColor={ProjectColors.darkGrey}
                    cursorColor={ProjectColors.black}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 75,
        borderWidth: 2,
        borderColor: ProjectColors.black,
        borderRadius: 25,
        paddingHorizontal: 16,
    },
    descriptionInput: {
        height: 120,
        paddingVertical: 16,
    }
})
