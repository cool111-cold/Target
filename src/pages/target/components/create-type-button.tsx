import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ProjectColors } from "../../../../assets/colors"
import React from "react"

export const TargenCreateTypeButton = ({ onValueChange, currentValue }: { onValueChange: (value: any) => void, currentValue?: any }) => {
    const data = ['Disposable', 'Daily']
    return (
        <View style={styles.container}>
            {data.map((item, index) => (
                <TouchableOpacity style={[styles.buttonContainer2, {backgroundColor: currentValue === item ? ProjectColors.black : ProjectColors.white}]} onPress={() => onValueChange(item)} key={index}>
                    <Text style={[styles.buttonText, {color: currentValue === item ? ProjectColors.white : ProjectColors.black}]}>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )

}

const styles = StyleSheet.create({
        container: {
            width: '100%',
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
        },
})