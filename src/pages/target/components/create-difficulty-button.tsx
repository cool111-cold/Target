import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native"
import { ProjectColors } from "../../../../assets/colors"
import React from "react"
import { EphirIcon } from "../../../../assets/icons/ephir"

const DIFFICULTIES = ['Лёгкая', 'Средняя', 'Сложная', 'Эпическая']
const ICON_SIZES = [64, 64, 64, 64]
const COLORS = ['#3be368', '#d2e33b', '#ab3be3', '#e33b54']

const CARD_GAP = 12
const SCREEN_WIDTH = Dimensions.get('window').width
const CARD_SIZE = (SCREEN_WIDTH - 48 - CARD_GAP)

const IconLayout = ({ count, size, color }: { count: number; size: number; color: string }) => {
    const icon = (key: number) => <EphirIcon key={key} size={size} color={color} />
    const row = (keys: number[]) => (
        <View style={styles.iconRow}>
            {keys.map(k => icon(k))}
        </View>
    )

    if (count === 1) return <View style={styles.iconContainer}>{row([0])}</View>
    if (count === 2) return <View style={styles.iconContainer}>{row([0, 1])}</View>
    if (count === 3) return <View style={styles.iconContainer}>{row([0, 1, 2])}</View>
    return <View style={styles.iconContainer}>{row([0, 1, 2, 3])}</View>
}

export const TargetCreateDifficultyButton = ({ onValueChange, currentValue }: { onValueChange: (value: any) => void, currentValue?: any }) => {
    return (
        <View style={styles.container}>
            {DIFFICULTIES.map((item, index) => {
                const isSelected = currentValue === item
                const iconColor = ProjectColors.black
                return (
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: isSelected ? COLORS[index] : ProjectColors.white }]}
                        onPress={() => onValueChange(item)}
                        key={index}
                    >
                        <IconLayout count={index + 1} size={ICON_SIZES[index]} color={iconColor} />
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: CARD_GAP,
    },
    button: {
        width: CARD_SIZE,
        height: CARD_SIZE / 4,
        borderWidth: 2,
        borderColor: ProjectColors.black,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
})
