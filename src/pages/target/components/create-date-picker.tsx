import { ScrollView, StyleSheet, Text, View } from "react-native"
import { ProjectColors } from "../../../../assets/colors"
import { useRef, useEffect, useState, useCallback } from "react"

const ITEM_HEIGHT = 56
const MONTHS = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']

const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate()

type DrumColumnProps = {
    items: string[]
    selectedIndex: number
    onSelect: (index: number) => void
}

const DrumColumn = ({ items, selectedIndex, onSelect }: DrumColumnProps) => {
    const ref = useRef<ScrollView>(null)
    const initialIndex = useRef(selectedIndex)
    const mounted = useRef(false)

    const handleLayout = useCallback(() => {
        if (!mounted.current) {
            ref.current?.scrollTo({ y: initialIndex.current * ITEM_HEIGHT, animated: false })
            mounted.current = true
        }
    }, [])

    useEffect(() => {
        if (mounted.current) {
            const safeIndex = Math.min(selectedIndex, items.length - 1)
            ref.current?.scrollTo({ y: safeIndex * ITEM_HEIGHT, animated: true })
        }
    }, [items.length, selectedIndex])

    const handleScrollEnd = (e: any) => {
        const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT)
        const clamped = Math.max(0, Math.min(index, items.length - 1))
        onSelect(clamped)
    }

    return (
        <View style={styles.column}>
            <ScrollView
                ref={ref}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onLayout={handleLayout}
                onMomentumScrollEnd={handleScrollEnd}
                scrollEventThrottle={16}
            >
                <View style={{ height: ITEM_HEIGHT }} />
                {items.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <Text style={[styles.itemText, index === selectedIndex && styles.selectedText]}>
                            {item}
                        </Text>
                    </View>
                ))}
                <View style={{ height: ITEM_HEIGHT }} />
            </ScrollView>
        </View>
    )
}

export const TargetCreateDatePicker = ({ onValueChange, currentValue }: { onValueChange: (value: any) => void; currentValue?: any }) => {
    const now = new Date()
    const initial = currentValue ? new Date(currentValue.split('.').reverse().join('-')) : now

    const currentYear = now.getFullYear()
    const years = Array.from({ length: 6 }, (_, i) => String(currentYear + i))

    const [dayIndex, setDayIndex] = useState(initial.getDate() - 1)
    const [monthIndex, setMonthIndex] = useState(initial.getMonth())
    const [yearIndex, setYearIndex] = useState(Math.max(0, initial.getFullYear() - currentYear))

    const daysInMonth = getDaysInMonth(monthIndex, currentYear + yearIndex)
    const days = Array.from({ length: daysInMonth }, (_, i) => String(i + 1).padStart(2, '0'))

    const notify = (d: number, m: number, y: number) => {
        const dMax = getDaysInMonth(m, currentYear + y) - 1
        const safeD = Math.min(d, dMax)
        const date = new Date(currentYear + y, m, safeD + 1)
        onValueChange(date.toLocaleDateString('ru-RU'))
    }

    const handleDay = (i: number) => { setDayIndex(i); notify(i, monthIndex, yearIndex) }

    const handleMonth = (i: number) => {
        setMonthIndex(i)
        const dMax = getDaysInMonth(i, currentYear + yearIndex) - 1
        const safeDay = Math.min(dayIndex, dMax)
        if (safeDay !== dayIndex) setDayIndex(safeDay)
        notify(safeDay, i, yearIndex)
    }

    const handleYear = (i: number) => {
        setYearIndex(i)
        const dMax = getDaysInMonth(monthIndex, currentYear + i) - 1
        const safeDay = Math.min(dayIndex, dMax)
        if (safeDay !== dayIndex) setDayIndex(safeDay)
        notify(safeDay, monthIndex, i)
    }

    useEffect(() => {
        notify(dayIndex, monthIndex, yearIndex)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.selectionOverlay} pointerEvents="none" />
            <DrumColumn items={days} selectedIndex={dayIndex} onSelect={handleDay} />
            <DrumColumn items={MONTHS} selectedIndex={monthIndex} onSelect={handleMonth} />
            <DrumColumn items={years} selectedIndex={yearIndex} onSelect={handleYear} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: ITEM_HEIGHT * 3,
        gap: 4,
        position: 'relative',
    },
    selectionOverlay: {
        position: 'absolute',
        top: ITEM_HEIGHT,
        left: 0,
        right: 0,
        height: ITEM_HEIGHT,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: ProjectColors.black,
        zIndex: 10,
    },
    column: {
        flex: 1,
        height: ITEM_HEIGHT * 3,
        overflow: 'hidden',
    },
    item: {
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemText: {
        fontFamily: 'StackSansTextVariableFont',
        fontSize: 18,
        color: ProjectColors.black,
        opacity: 0.3,
    },
    selectedText: {
        opacity: 1,
        fontSize: 26,
        fontWeight: '700',
    },
})
