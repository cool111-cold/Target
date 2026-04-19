import React, { useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, Vibration, View } from "react-native"
import { ProjectColors } from "../../../../assets/colors";
import { Modal } from "../../../feauters/modal";
import { useAppStore } from "../../../hooks/store";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../main/components/links-block";
import { TARGET_TYPE_IDS } from "./create-type-button";
import { DailyIcon } from "../../../../assets/icons/daily-icon";
import { OneTimeIcon } from "../../../../assets/icons/one-time-icon";
import { ReminderIcon } from "../../../../assets/icons/reminder-icon";
import { BigGoalIcon } from "../../../../assets/icons/big-goal-icon";
import { DurationIcon } from "../../../../assets/icons/duration-icon";
import { ProgressiveIcon } from "../../../../assets/icons/progressive-icon";
import { CheckIcon } from "../../../../assets/icons/check-icon";
import { useTargetBalls } from "../../../hooks/use-target-balls";

const { width } = Dimensions.get('window');

const COLUMN_GAP = 12;
const PAGE_PADDING = 24;
const CARD_WIDTH = (width - PAGE_PADDING * 2 - COLUMN_GAP) / 2;

const CARD_HEIGHTS = [180, 140, 120, 170, 200, 130, 160, 150, 190, 135];

const DIFFICULTY_COLORS = ['#afe3bd', '#dce39a', '#d2afe3', '#e0bac0'];

const TYPE_THEMES: Record<number, { bg: string; textColor: string; completeBg: string }> = {
    [TARGET_TYPE_IDS.ONE_TIME]: {
        bg: '#f0ece4',
        textColor: ProjectColors.black,
        completeBg: ProjectColors.black,
    },
    [TARGET_TYPE_IDS.REMINDER]: {
        bg: '#e8e8e8',
        textColor: ProjectColors.black,
        completeBg: ProjectColors.black,
    },
    [TARGET_TYPE_IDS.DURATION]: {
        bg: '#1e1a2e',
        textColor: ProjectColors.white,
        completeBg: ProjectColors.purple,
    },
};
const DEFAULT_THEME = {
    bg: ProjectColors.black,
    textColor: ProjectColors.white,
    completeBg: 'rgba(255,255,255,0.15)',
};

const TYPE_ICONS: Record<number, (color: string) => React.JSX.Element> = {
    [TARGET_TYPE_IDS.DAILY]:       (c) => <DailyIcon size={22} color={c} />,
    [TARGET_TYPE_IDS.ONE_TIME]:    (c) => <OneTimeIcon size={22} color={c} />,
    [TARGET_TYPE_IDS.REMINDER]:    (c) => <ReminderIcon size={22} color={c} />,
    [TARGET_TYPE_IDS.BIG_GOAL]:    (c) => <BigGoalIcon size={22} color={c} />,
    [TARGET_TYPE_IDS.DURATION]:    (c) => <DurationIcon size={22} color={c} />,
    [TARGET_TYPE_IDS.PROGRESSIVE]: (c) => <ProgressiveIcon size={22} color={c} />,
};

const getDifficultyColor = (difficulty?: string | number): string | null => {
    if (difficulty === undefined || difficulty === null) return null;
    const d = typeof difficulty === 'string' ? parseInt(difficulty) : difficulty;
    return DIFFICULTY_COLORS[d] ?? null;
};

interface Data {
    name: string;
    ball: number;
    ephir: number;
    data: string;
    type: number;
    color: number;
    difficulty?: string | number;
    dueDate?: string;
    description?: string;
}

interface TargetProps {
    item: Data;
    index: number;
    storeIndex: number;
}

const Target = ({ item, index, storeIndex }: TargetProps) => {
    const [isEditModal, setIsEditModal] = useState(false);
    const [isCompleteModal, setIsCompleteModal] = useState(false);
    const navigation = useNavigation<NavigationProp>();
    const removeTarget = useAppStore(s => s.removeTarget);
    const incrementRewards = useAppStore(s => s.incrementRewards);
    const addHistoryItem = useAppStore(s => s.addHistoryItem);

    const balls = useTargetBalls(item.type, item.difficulty, item.data);
    const cardHeight = CARD_HEIGHTS[index % CARD_HEIGHTS.length];
    const theme = TYPE_THEMES[item.type] ?? DEFAULT_THEME;
    const difficultyColor = getDifficultyColor(item.difficulty);
    const renderIcon = TYPE_ICONS[item.type];
    const showDueDate = (item.type === TARGET_TYPE_IDS.REMINDER || item.type === TARGET_TYPE_IDS.DURATION) && item.dueDate;

    const handleLongPress = () => {
        Vibration.vibrate(10);
        setIsEditModal(true);
    };

    const confirmComplete = async () => {
        setIsCompleteModal(false);
        await incrementRewards(10, balls);
        await addHistoryItem({
            name: item.name,
            date: new Date().toLocaleDateString('ru-RU'),
            type: 'target',
            price: balls,
        });
        await removeTarget(storeIndex);
    };

    return (
        <>
            <Pressable
                style={[styles.targetContainer, {
                    height: cardHeight,
                    marginBottom: COLUMN_GAP,
                    backgroundColor: theme.bg,
                }]}
                onLongPress={handleLongPress}
            >
                {renderIcon && (
                    <View style={styles.iconWrapper}>
                        {renderIcon(theme.textColor)}
                    </View>
                )}

                {difficultyColor && (
                    <View style={[styles.difficultyDot, { backgroundColor: difficultyColor }]} />
                )}

                <Text
                    style={[styles.cardName, { color: theme.textColor }]}
                    numberOfLines={3}
                >
                    {item.name}
                </Text>
                <Text
                    style={styles.cardDescription}
                    numberOfLines={3}
                >
                    {item.description}
                </Text>

                {showDueDate && (
                    <Text
                        style={[styles.dueDate, { color: theme.textColor }]}
                        numberOfLines={1}
                    >
                        {item.dueDate}
                    </Text>
                )}

                <TouchableOpacity
                    style={[styles.completeButton, { backgroundColor: theme.completeBg }]}
                    onPress={() => setIsCompleteModal(true)}
                    activeOpacity={0.7}
                >
                    {/* <Text style={styles.completeButtonText}>✓</Text> */}
                    <CheckIcon size={24} color={ProjectColors.white} />
                </TouchableOpacity>
            </Pressable>

            <Modal
                title="Change"
                message="Do you want change target?"
                buttonTitle="Yes, change"
                visible={isEditModal}
                onClose={() => setIsEditModal(false)}
                onConfirm={() => {
                    setIsEditModal(false);
                    navigation.navigate('Create', { targetIndex: storeIndex, targetData: item, type: 'target' });
                }}
            />
            <Modal
                title="Выполнено!"
                message={`Засчитать «${item.name}»?`}
                buttonTitle="Да, готово!"
                visible={isCompleteModal}
                onClose={() => setIsCompleteModal(false)}
                onConfirm={confirmComplete}
            />
        </>
    );
};

interface TargetListProps {
    Data: { item: Data; storeIndex: number }[];
}

export const TargetList = ({ Data }: TargetListProps) => {
    const leftItems: { item: Data; index: number; storeIndex: number }[] = [];
    const rightItems: { item: Data; index: number; storeIndex: number }[] = [];
    let leftHeight = 0;
    let rightHeight = 0;

    Data.forEach(({ item, storeIndex }, index) => {
        const h = CARD_HEIGHTS[index % CARD_HEIGHTS.length] + COLUMN_GAP;
        if (leftHeight <= rightHeight) {
            leftItems.push({ item, index, storeIndex });
            leftHeight += h;
        } else {
            rightItems.push({ item, index, storeIndex });
            rightHeight += h;
        }
    });

    return (
        <>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Цели</Text>
            <Text style={styles.subTitle}>{`${Data.length} активных`}</Text>
        </View>
        <View style={styles.container}>
            <View style={styles.column}>
                {leftItems.map(({ item, index, storeIndex }) => (
                    <Target key={storeIndex} item={item} index={index} storeIndex={storeIndex} />
                ))}
            </View>
            <View style={styles.column}>
                {rightItems.map(({ item, index, storeIndex }) => (
                    <Target key={storeIndex} item={item} index={index} storeIndex={storeIndex} />
                ))}
            </View>
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: COLUMN_GAP,
        marginTop: 12
    },
    column: {
        flex: 1,
    },
    targetContainer: {
        width: CARD_WIDTH,
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 56,
        position: 'relative',
    },
    iconWrapper: {
        marginBottom: 10,
    },
    difficultyDot: {
        position: 'absolute',
        top: 14,
        right: 14,
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    cardName: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        fontSize: 19,
        lineHeight: 17,
    },
    dueDate: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '400',
        fontSize: 11,
        opacity: 0.55,
    },
    completeButton: {
        position: 'absolute',
        bottom: 14,
        right: 14,
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 17,
        color: ProjectColors.black
    },
    subTitle: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 17,
        color: ProjectColors.darkGrey
    },
    titleContainer: {
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        marginTop: 12,
        paddingHorizontal: 0
    },
    cardDescription: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '400',
        marginTop: 6,
        fontSize: 13,
        color: ProjectColors.darkGrey,
        opacity: 0.55,
        lineHeight: 18,
    }
});
