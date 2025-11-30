import React, { JSX } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ProjectColors } from "../../../../assets/colors";

interface Variants {
    title: string;
    id: number;
}

interface buttonProps {
    onPress: () => void;
    title: string;
    id: number;
    isLast?: boolean;
    isSelected?: boolean;
}

interface Question {
    title: string;
    message: string;
    id: number;
    Component: (props: { onValueChange: (value: any) => void, currentValue?: any }) => JSX.Element;
}

interface QuestionProps {
    item: Question;
    isLast?: boolean;
    nextLabel: () => void;
    prevLabel: () => void;
    onValueChange: (questionId: number, value: any) => void;
    currentValue?: any;
}

// const Button = ({title, id, nextLabel, isLast}: buttonProps) => {
//     return (
//         <TouchableOpacity style={styles.buttonContainer2} onPress={isLast ? undefined : nextLabel} disabled={isLast}>
//             <Text style={styles.buttonText}>{title}</Text>
//         </TouchableOpacity>
//     )
// }

export const Question = ({item, isLast, nextLabel, prevLabel, onValueChange, currentValue}: QuestionProps) => {
    const handleValueChange = (value: any) => {
        onValueChange(item.id, value);
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.message}>{item.message}</Text>
            </View>
            <View style={styles.buttonContainer}>
                {item.Component({ onValueChange: handleValueChange, currentValue })}
            </View>
            <View style={styles.navigationContainer}>
                <TouchableOpacity style={styles.backButton} onPress={prevLabel}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.createButton, {backgroundColor: ProjectColors.black}]} onPress={nextLabel} disabled={!currentValue}>
                    <Text style={styles.createButtonText}>{isLast ? 'Finish' : 'Next'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        paddingVertical: 42
    },
    textContainer: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    title: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        fontSize: 42,
        color: ProjectColors.black
    },
    message: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '600',
        fontSize: 18,
        color: ProjectColors.grey
    },
    buttonContainer2: {
        width: '100%',
        height: 75,
        borderWidth: 2,
        borderColor: ProjectColors.black,
        borderRadius: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8
    },
    buttonText: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '600',
        fontSize: 16,
        color: ProjectColors.black
    },
    navigationContainer: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    backButton: {
        width: 100,
        height: 45,
        borderColor: ProjectColors.black,
        borderWidth: 2,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    createButton: {
        width: 150,
        height: 45,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    createButtonText: {
        color: ProjectColors.white
    }
})