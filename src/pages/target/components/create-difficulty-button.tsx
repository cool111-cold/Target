import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ProjectColors } from "../../../../assets/colors"
import React from "react"
import { EphirIcon } from "../../../../assets/icons/ephir"

export const DIFFICULTY_IDS = {
    EASY: 0,
    MEDIUM: 1,
    HARD: 2,
    EPIC: 3,
} as const

const DIFFICULTIES: {
    id: number;
    label: string;
    sublabel: string;
    color: string;
    count: number;
}[] = [
    { id: DIFFICULTY_IDS.EASY,   label: 'Легко',     sublabel: 'без усилий',   color: '#3be368', count: 1 },
    { id: DIFFICULTY_IDS.MEDIUM, label: 'Средне',    sublabel: 'немного сил',  color: '#d2e33b', count: 2 },
    { id: DIFFICULTY_IDS.HARD,   label: 'Сложно',    sublabel: 'нужен настрой',color: '#ab3be3', count: 3 },
    { id: DIFFICULTY_IDS.EPIC,   label: 'Эпично',    sublabel: 'максимум',     color: '#e33b54', count: 4 },
]

const CARD_GAP = 12
const SCREEN_WIDTH = Dimensions.get('window').width
const CARD_SIZE = (SCREEN_WIDTH - 48 - CARD_GAP) / 2

const Icons = ({ count, color }: { count: number; color: string }) => (
    <View style={styles.iconsRow}>
        {Array.from({ length: count }).map((_, i) => (
            <EphirIcon key={i} size={28} color={color} />
        ))}
    </View>
)

export const TargetCreateDifficultyButton = ({
    onValueChange,
    currentValue,
}: {
    onValueChange: (value: any) => void
    currentValue?: any
}) => {
    return (
        <View style={styles.grid}>
            {DIFFICULTIES.map((d) => {
                const selected = currentValue === d.id
                return (
                    <TouchableOpacity
                        key={d.id}
                        style={[
                            styles.card,
                            {
                                backgroundColor: selected ? ProjectColors.black : ProjectColors.white,
                            },
                        ]}
                        onPress={() => onValueChange(d.id)}
                        activeOpacity={0.8}
                    >
                        <Icons count={d.count} color={selected ? ProjectColors.white : ProjectColors.black} />

                        <View style={styles.labels}>
                            <Text style={[styles.label, { color: selected ? ProjectColors.white : ProjectColors.black }]}>
                                {d.label}
                            </Text>
                            <Text style={[styles.sublabel, {
                                color: selected ? ProjectColors.darkGrey : ProjectColors.darkGrey
                            }]}>
                                {d.sublabel}
                            </Text>
                        </View>

                        {/* {!selected && ( */}
                            <View style={[styles.colorDot, { backgroundColor: d.color }]} />
                        {/* )} */}
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: CARD_GAP,
    },
    card: {
        width: CARD_SIZE,
        height: CARD_SIZE,
        borderWidth: 2,
        borderRadius: 24,
        padding: 18,
        justifyContent: 'space-between',
    },
    iconsRow: {
        flexDirection: 'row',
        gap: 4,
        flexWrap: 'wrap',
    },
    labels: {
        gap: 2,
    },
    label: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        fontSize: 18,
    },
    sublabel: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '400',
        fontSize: 12,
    },
    colorDot: {
        position: 'absolute',
        top: 16,
        right: 16,
        width: 10,
        height: 10,
        borderRadius: 5,
    },
})
