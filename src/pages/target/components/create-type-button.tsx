import {
    Animated,
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View,
} from "react-native"
import { ProjectColors } from "../../../../assets/colors"
import React, { useEffect, useRef } from "react"
import { useLanguageStore, translate as tr } from "../../../feauters/text/use-translate"
import { Language } from "../../../feauters/text/language-type"
import { DailyIcon } from "../../../../assets/icons/daily-icon"
import { OneTimeIcon } from "../../../../assets/icons/one-time-icon"
import { ReminderIcon } from "../../../../assets/icons/reminder-icon"
import { BigGoalIcon } from "../../../../assets/icons/big-goal-icon"
import { DurationIcon } from "../../../../assets/icons/duration-icon"
import { ProgressiveIcon } from "../../../../assets/icons/progressive-icon"

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true)
}

const ICON_SIZE = 32

export const TARGET_TYPE_IDS = {
    DAILY: 0,
    ONE_TIME: 1,
    REMINDER: 2,
    BIG_GOAL: 3,
    DURATION: 4,
    PROGRESSIVE: 5,
} as const

const TARGET_TYPES: {
    id: number
    nameKey: keyof Language
    descriptionKey: keyof Language
    renderIcon: (color: string) => React.JSX.Element
    example: string[]
}[] = [
    {
        id: TARGET_TYPE_IDS.DAILY,
        nameKey: 'typeDailyName',
        descriptionKey: 'typeDailyDesc',
        renderIcon: (color: string) => <DailyIcon size={ICON_SIZE} color={color} />,
        example: ['Почистить зубы', 'Приготовить ужин', 'Вовремя лечь', 'Погладить кошку']
    },
    {
        id: TARGET_TYPE_IDS.ONE_TIME,
        nameKey: 'typeOneTimeName',
        descriptionKey: 'typeOneTimeDesc',
        renderIcon: (color: string) => <OneTimeIcon size={ICON_SIZE} color={color} />,
        example: ['Сходить к врачу', 'Купить молоко', 'Подстричься', 'Убраться в квартире']
    },
    {
        id: TARGET_TYPE_IDS.REMINDER,
        nameKey: 'typeReminderName',
        descriptionKey: 'typeReminderDesc',
        renderIcon: (color: string) => <ReminderIcon size={ICON_SIZE} color={color} />,
        example: ['Поздравить маму с днем рождения', 'Забрать вещи с хичистки', 'Забрать посылку с пункта выдачи', 'Купить корм кошке после работы']
    },
    {
        id: TARGET_TYPE_IDS.BIG_GOAL,
        nameKey: 'typeBigGoalName',
        descriptionKey: 'typeBigGoalDesc',
        renderIcon: (color: string) => <BigGoalIcon size={ICON_SIZE} color={color} />,
        example: ['Защитить диплом', 'Основать стартап', 'Получить внж в стране мечты', 'Выйти замуж']
    },
    {
        id: TARGET_TYPE_IDS.DURATION,
        nameKey: 'typeDurationName',
        descriptionKey: 'typeDurationDesc',
        renderIcon: (color: string) => <DurationIcon size={ICON_SIZE} color={color} />,
        example: ['Месяц не пропускать пары', 'Неделя без сладкого', 'Месяц экономии', 'Неделя изучения языков']
    },
    {
        id: TARGET_TYPE_IDS.PROGRESSIVE,
        nameKey: 'typeProgressiveName',
        descriptionKey: 'typeProgressiveDesc',
        renderIcon: (color: string) => <ProgressiveIcon size={ICON_SIZE} color={color} />,
        example: ['Накопить на машину', 'Прочитать серию книг', 'Закрыть долги по учебе', 'Выучить 10 новых слов']
    },
]

const CARD_GAP = 12
const SCREEN_WIDTH = Dimensions.get('window').width
const CARD_SIZE = (SCREEN_WIDTH - 48 - CARD_GAP) / 2
const FULL_WIDTH = CARD_SIZE * 2 + CARD_GAP

type LocalizedItem = {
    id: number
    displayName: string
    displayDescription: string
    renderIcon: (color: string) => React.JSX.Element
    example: string[]
}

type RowPairProps = {
    pair: [LocalizedItem, LocalizedItem | undefined]
    currentValue: any
    onValueChange: (value: any) => void
    examplePrefix: string
}

const RowPair = ({ pair, currentValue, onValueChange, examplePrefix }: RowPairProps) => {
    const [cardA, cardB] = pair
    const selectedA = currentValue === cardA.id
    const selectedB = cardB ? currentValue === cardB.id : false
    const noneSelected = !selectedA && !selectedB

    const widthA = useRef(new Animated.Value(CARD_SIZE)).current
    const widthB = useRef(new Animated.Value(CARD_SIZE)).current
    const opacityA = useRef(new Animated.Value(0)).current
    const opacityB = useRef(new Animated.Value(0)).current

    useEffect(() => {
        const targetWA = selectedA ? FULL_WIDTH : noneSelected ? CARD_SIZE : 0
        const targetWB = selectedB ? FULL_WIDTH : noneSelected ? CARD_SIZE : 0

        Animated.parallel([
            Animated.timing(widthA, { toValue: targetWA, duration: 320, useNativeDriver: false }),
            Animated.timing(widthB, { toValue: targetWB, duration: 320, useNativeDriver: false }),
            Animated.timing(opacityA, {
                toValue: selectedA ? 1 : 0,
                duration: selectedA ? 260 : 100,
                delay: selectedA ? 150 : 0,
                useNativeDriver: false,
            }),
            Animated.timing(opacityB, {
                toValue: selectedB ? 1 : 0,
                duration: selectedB ? 260 : 100,
                delay: selectedB ? 150 : 0,
                useNativeDriver: false,
            }),
        ]).start()
    }, [currentValue])

    const handlePress = (id: number) => {
        onValueChange(currentValue === id ? null : id)
    }

    const renderCard = (
        card: LocalizedItem,
        selected: boolean,
        animWidth: Animated.Value,
        descOpacity: Animated.Value,
        anchor: 'left' | 'right'
    ) => (
        <TouchableOpacity
            key={card.id}
            activeOpacity={0.85}
            onPress={() => handlePress(card.id)}
            style={[styles.cardAnchor, { [anchor]: 0, zIndex: selected ? 2 : 1 }]}
        >
            <Animated.View style={[styles.card, { width: animWidth }, selected && styles.cardSelected]}>
                <View style={styles.cardLeft}>
                    {card.renderIcon(selected ? ProjectColors.white : ProjectColors.black)}
                    <Text style={[styles.cardTitle, selected && styles.cardTitleSelected]}>
                        {card.displayName}
                    </Text>
                </View>
                <Animated.View style={[styles.cardRight, { opacity: descOpacity }]}>
                    <Text style={styles.cardDescription}>{card.displayDescription}</Text>
                    {card.example.length > 0 && (
                        <Text style={styles.cardExample}>
                            {`${examplePrefix}${card.example[Math.floor(Math.random() * card.example.length)]}`}
                        </Text>
                    )}
                </Animated.View>
            </Animated.View>
        </TouchableOpacity>
    )

    return (
        <View style={styles.row}>
            {renderCard(cardA, selectedA, widthA, opacityA, 'left')}
            {cardB && renderCard(cardB, selectedB, widthB, opacityB, 'right')}
        </View>
    )
}

export const TargenCreateTypeButton = ({
    onValueChange,
    currentValue,
}: {
    onValueChange: (value: any) => void
    currentValue?: any
}) => {
    useLanguageStore((s) => s.currentLanguage)

    const localizedTypes: LocalizedItem[] = TARGET_TYPES.map(type => ({
        id: type.id,
        displayName: tr(type.nameKey),
        displayDescription: tr(type.descriptionKey),
        renderIcon: type.renderIcon,
        example: type.example,
    }))

    const examplePrefix = tr('typeExamplePrefix')

    const rows: [LocalizedItem, LocalizedItem | undefined][] = []
    for (let i = 0; i < localizedTypes.length; i += 2) {
        rows.push([localizedTypes[i], localizedTypes[i + 1]])
    }

    return (
        <View style={styles.container}>
            {rows.map((pair, i) => (
                <RowPair key={i} pair={pair} currentValue={currentValue} onValueChange={onValueChange} examplePrefix={examplePrefix} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: CARD_GAP,
    },
    row: {
        width: FULL_WIDTH,
        height: CARD_SIZE,
        position: 'relative',
    },
    cardAnchor: {
        position: 'absolute',
        top: 0,
    },
    card: {
        height: CARD_SIZE,
        borderWidth: 2,
        borderColor: ProjectColors.black,
        borderRadius: 18,
        padding: 14,
        backgroundColor: ProjectColors.white,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
    },
    cardSelected: {
        backgroundColor: ProjectColors.black,
    },
    cardLeft: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: CARD_SIZE - 28,
        flexShrink: 0,
    },
    cardRight: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 12,
    },
    cardTitle: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '600',
        fontSize: 13,
        color: ProjectColors.black,
        textAlign: 'center',
    },
    cardTitleSelected: {
        color: ProjectColors.white,
    },
    cardDescription: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '400',
        fontSize: 12,
        color: ProjectColors.white,
        lineHeight: 17,
    },
    cardExample: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '400',
        fontSize: 11,
        color: ProjectColors.white,
        opacity: 0.6,
        marginTop: 4,
    },
})
