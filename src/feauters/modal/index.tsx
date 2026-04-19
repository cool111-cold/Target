import React from "react";
import { Modal as ModalBase, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ProjectColors } from "../../../assets/colors";
import { Button } from "../button";
import { ShowHuman } from "../../../assets/icons";

interface ModalProps {
    visible: boolean;
    onClose: () => void,
    onConfirm?: () => void,
    onReset?: () => void,
    title: string,
    message: string,
    buttonTitle: string
}

export const Modal = ({visible, onClose, title, message, buttonTitle, onConfirm, onReset}: ModalProps) => {
    return (
        <ModalBase
            visible={visible}
            transparent={true}
            statusBarTranslucent
            animationType='fade'
        >
            <Pressable onPress={onClose} style={styles.background}>
                <Pressable
                    style={styles.container}
                    onPress={(e) => e.stopPropagation()}
                >
                    <ShowHuman />
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    <Button title={buttonTitle} containerStyle={styles.button} onClick={onConfirm ? onConfirm : onClose}/>
                    {onReset && (
                        <Button title="Reset progress" containerStyle={styles.resetButton} textStyle={styles.resetText} onClick={onReset}/>
                    )}
                </Pressable>
            </Pressable>
        </ModalBase>
    )
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#252525b3',
        paddingHorizontal: 24,
        paddingVertical: 24
    },
    container: {
        width: '100%',
        backgroundColor: ProjectColors.white,
        borderRadius: 25,
        paddingHorizontal: 24,
        paddingVertical: 16,
        gap: 8,
    },
    button: {
        width: '100%',
        height: 40,
        alignSelf: 'center',
        borderRadius: 10
    },
    resetButton: {
        width: '100%',
        height: 40,
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: ProjectColors.black,
    },
    resetText: {
        color: ProjectColors.black,
    },
    title: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        color: ProjectColors.black,
        fontSize: 24,
        marginBottom: 6
    },
    message: {
        flex: 1,
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '500',
        color: ProjectColors.black,
        fontSize: 16,
    }
})