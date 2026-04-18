import React, { JSX } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ProjectColors } from "../../../../assets/colors";
import { ChevronLeftIcon } from "../../../../assets/icons/chevron-left";
import { ChevronRightIcon } from "../../../../assets/icons/chevron-right";
import { ChevronDoubleRightIcon } from "../../../../assets/icons/chevron-double-right";
import { TrashIcon } from "../../../../assets/icons/trash-icon";

interface Question {
    title: string;
    message: string;
    id: number;
    Component: (props: { onValueChange: (value: any) => void, currentValue?: any, type?: 'target' | 'prize' }) => JSX.Element;
}

interface QuestionProps {
    item: Question;
    isFirst?: boolean;
    isLast?: boolean;
    nextLabel: () => void;
    prevLabel: () => void;
    onValueChange: (questionId: number, value: any) => void;
    currentValue?: any;
    isEditMode?: boolean;
    onDelete?: () => void;
    type?: 'target' | 'prize';
    isCurrentValueValid?: boolean;
}

// const Button = ({title, id, nextLabel, isLast}: buttonProps) => {
//     return (
//         <TouchableOpacity style={styles.buttonContainer2} onPress={isLast ? undefined : nextLabel} disabled={isLast}>
//             <Text style={styles.buttonText}>{title}</Text>
//         </TouchableOpacity>
//     )
// }


const { width, height } = Dimensions.get('window')
const ICON_SIZE = Math.round(Math.min(width, height) * 0.15)

export const Question = ({item, isFirst, isLast, nextLabel, prevLabel, onValueChange, currentValue, isEditMode, onDelete, type, isCurrentValueValid}: QuestionProps) => {
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
                <item.Component onValueChange={handleValueChange} currentValue={currentValue} type={type} />
            </View>
            <View style={styles.navigationContainer}>
                <TouchableOpacity style={styles.backButton} onPress={prevLabel} disabled={isFirst}>
                    <ChevronLeftIcon size={ICON_SIZE} color={isFirst ? ProjectColors.grey : ProjectColors.black} />
                </TouchableOpacity>
                {isEditMode && <TouchableOpacity style={styles.delButton} onPress={onDelete}>
                    <TrashIcon size={ICON_SIZE * 0.6} color={ProjectColors.orange} />
                </TouchableOpacity>}
                <TouchableOpacity style={styles.createButton} onPress={nextLabel} disabled={isCurrentValueValid !== undefined ? !isCurrentValueValid : !currentValue}>
                    {(() => {
                        const disabled = isCurrentValueValid !== undefined ? !isCurrentValueValid : !currentValue
                        const color = disabled ? ProjectColors.grey : ProjectColors.black
                        return isLast
                            ? <ChevronDoubleRightIcon size={ICON_SIZE} color={color} />
                            : <ChevronRightIcon size={ICON_SIZE} color={color} />
                    })()}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        paddingTop: 42
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
        flexDirection: 'row',
    },
    backButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    delButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    createButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    }
})