import React, { useState } from "react";
import {
    Dimensions, Modal as RNModal, ScrollView, StyleSheet,
    Text, TextInput, TouchableOpacity, Vibration, View,
} from "react-native";
import { ProjectColors } from "../../../../assets/colors";
import { BigGoalIcon } from "../../../../assets/icons/big-goal-icon";
import { ProgressiveIcon } from "../../../../assets/icons/progressive-icon";
import { CheckIcon } from "../../../../assets/icons/check-icon";
import { Modal } from "../../../feauters/modal";
import { useAppStore } from "../../../hooks/store";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../main/components/links-block";
import { TARGET_TYPE_IDS } from "./create-type-button";
import { useTargetBalls } from "../../../hooks/use-target-balls";

const { width } = Dimensions.get('window');
const PAGE_PADDING = 24;
const CARD_GAP = 12;
const CARD_WIDTH = width - PAGE_PADDING * 2 - CARD_GAP * 2;

interface Data {
    name: string;
    description?: string;
    ball: number;
    ephir: number;
    data: string;
    type: number;
    color: number;
    difficulty?: string | number;
    goalValue?: number;
    dueDate?: string;
}

interface GoalCardProps {
    item: Data;
    storeIndex: number;
}

const BigGoalCard = ({ item, storeIndex }: GoalCardProps) => {
    const [isEditModal, setIsEditModal] = useState(false);
    const [isCompleteModal, setIsCompleteModal] = useState(false);
    const removeTarget = useAppStore(s => s.removeTarget);
    const incrementRewards = useAppStore(s => s.incrementRewards);
    const addHistoryItem = useAppStore(s => s.addHistoryItem);
    const navigation = useNavigation<NavigationProp>();

    const balls = useTargetBalls(item.type, item.difficulty, item.data);

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
            <View
                style={[styles.card, { backgroundColor: ProjectColors.black }]}
            >
                <TouchableOpacity
                    style={styles.editHit}
                    onLongPress={() => { Vibration.vibrate(10); setIsEditModal(true); }}
                    activeOpacity={1}
                >
                    <View style={styles.cardTop}>
                        <BigGoalIcon size={28} color={ProjectColors.white} />
                        <View style={styles.typeLabel}>
                            <Text style={styles.typeLabelText}>Большая цель</Text>
                        </View>
                    </View>

                    <Text style={styles.cardName} numberOfLines={2}>{item.name}</Text>

                    {item.description ? (
                        <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
                    ) : null}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.completeBtn}
                    onPress={() => setIsCompleteModal(true)}
                    activeOpacity={0.75}
                >
                    <CheckIcon size={20} color={ProjectColors.white} />
                    <Text style={styles.completeBtnText}>Достичь!</Text>
                </TouchableOpacity>
            </View>

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
                title="Достигнуто!"
                message={`Засчитать «${item.name}»? Получишь ${balls} баллов.`}
                buttonTitle="Да, достиг!"
                visible={isCompleteModal}
                onClose={() => setIsCompleteModal(false)}
                onConfirm={confirmComplete}
            />
        </>
    );
};

const ProgressiveCard = ({ item, storeIndex }: GoalCardProps) => {
    const [isEditModal, setIsEditModal] = useState(false);
    const [isProgressModal, setIsProgressModal] = useState(false);
    const [isCompleteModal, setIsCompleteModal] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const updateTarget = useAppStore(s => s.updateTarget);
    const removeTarget = useAppStore(s => s.removeTarget);
    const incrementRewards = useAppStore(s => s.incrementRewards);
    const addHistoryItem = useAppStore(s => s.addHistoryItem);
    const navigation = useNavigation<NavigationProp>();

    const balls = useTargetBalls(item.type, item.difficulty, item.data);
    const current = item.ephir ?? 0;
    const goal = item.goalValue ?? 0;
    const progress = goal > 0 ? Math.min(current / goal, 1) : 0;
    const isCompleted = progress >= 1;

    const handleAddProgress = () => {
        const delta = parseInt(inputValue);
        if (isNaN(delta) || delta <= 0) return;
        const newValue = Math.min(current + delta, goal);
        updateTarget(storeIndex, { ...item, ephir: newValue } as any);
        setInputValue('');
        setIsProgressModal(false);
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
            <View style={[styles.card, { backgroundColor: '#1a1a2e' }]}>
                <TouchableOpacity
                    style={styles.editHit}
                    onLongPress={() => { Vibration.vibrate(10); setIsEditModal(true); }}
                    activeOpacity={1}
                >
                    <View style={styles.cardTop}>
                        <ProgressiveIcon size={28} color={ProjectColors.white} />
                        <View style={[styles.typeLabel, { backgroundColor: ProjectColors.purple }]}>
                            <Text style={styles.typeLabelText}>Прогресс</Text>
                        </View>
                    </View>

                    <Text style={styles.cardName} numberOfLines={2}>{item.name}</Text>

                    <View style={styles.progressRow}>
                        <Text style={styles.progressCurrent}>{current.toLocaleString('ru-RU')}</Text>
                        <Text style={styles.progressSeparator}> / </Text>
                        <Text style={styles.progressGoal}>{goal.toLocaleString('ru-RU')}</Text>
                    </View>

                    <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                    </View>

                    <Text style={styles.progressPercent}>{Math.round(progress * 100)}%</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.completeBtn, { backgroundColor: isCompleted ? 'rgba(255,255,255,0.1)' : ProjectColors.purple }]}
                    onPress={() => isCompleted ? setIsCompleteModal(true) : (setInputValue(''), setIsProgressModal(true))}
                    activeOpacity={0.75}
                >
                    {isCompleted
                        ? <><CheckIcon size={20} color={ProjectColors.white} /><Text style={styles.completeBtnText}>Выполнить!</Text></>
                        : <Text style={styles.completeBtnText}>+ Добавить</Text>
                    }
                </TouchableOpacity>
            </View>

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

            <RNModal
                visible={isProgressModal}
                transparent
                animationType="fade"
                onRequestClose={() => setIsProgressModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Добавить прогресс</Text>
                        <Text style={styles.modalSub}>{current.toLocaleString('ru-RU')} / {goal.toLocaleString('ru-RU')}</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={inputValue}
                            onChangeText={v => setInputValue(v.replace(/[^0-9]/g, ''))}
                            keyboardType="numeric"
                            placeholder="сколько добавить?"
                            placeholderTextColor={ProjectColors.darkGrey}
                            autoFocus
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalCancel} onPress={() => setIsProgressModal(false)}>
                                <Text style={styles.modalCancelText}>Отмена</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalConfirm} onPress={handleAddProgress}>
                                <Text style={styles.modalConfirmText}>Добавить</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </RNModal>

            <Modal
                title="Достигнуто!"
                message={`Засчитать «${item.name}»? Получишь ${balls} баллов.`}
                buttonTitle="Да, достиг!"
                visible={isCompleteModal}
                onClose={() => setIsCompleteModal(false)}
                onConfirm={confirmComplete}
            />
        </>
    );
};

interface GoalListProps {
    Data: { item: Data; storeIndex: number }[];
}

export const GoalTargetList = ({ Data }: GoalListProps) => {
    if (!Data.length) return null;

    return (
        <View style={styles.container}>
            {/* <Text style={styles.sectionTitle}>Цели</Text> */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToOffsets={Data.map((_, i) => i === 0 ? 0 : i * (CARD_WIDTH + CARD_GAP) - PAGE_PADDING)}
                decelerationRate="fast"
                contentContainerStyle={styles.scrollContent}
            >
                {Data.map(({ item, storeIndex }) =>
                    item.type === TARGET_TYPE_IDS.BIG_GOAL
                        ? <BigGoalCard key={storeIndex} item={item} storeIndex={storeIndex} />
                        : <ProgressiveCard key={storeIndex} item={item} storeIndex={storeIndex} />
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
    },
    sectionTitle: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        fontSize: 20,
        color: ProjectColors.black,
        marginBottom: 10,
    },
    scrollContent: {
        gap: CARD_GAP,
        paddingRight: PAGE_PADDING,
    },
    card: {
        width: CARD_WIDTH,
        borderRadius: 24,
        padding: 20,
        minHeight: 200,
        justifyContent: 'space-between',
    },
    editHit: {
        flex: 1,
    },
    cardTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    typeLabel: {
        backgroundColor: 'rgba(255,255,255,0.12)',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    typeLabelText: {
        fontFamily: 'StackSansTextVariableFont',
        fontSize: 11,
        fontWeight: '600',
        color: ProjectColors.white,
    },
    cardName: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        fontSize: 22,
        color: ProjectColors.white,
        lineHeight: 22,
        marginBottom: 8,
    },
    cardDesc: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '400',
        fontSize: 13,
        color: ProjectColors.white,
        opacity: 0.55,
        lineHeight: 18,
    },
    progressRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 10,
    },
    progressCurrent: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        fontSize: 28,
        color: ProjectColors.white,
    },
    progressSeparator: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '400',
        fontSize: 18,
        color: ProjectColors.white,
        opacity: 0.4,
    },
    progressGoal: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '400',
        fontSize: 18,
        color: ProjectColors.white,
        opacity: 0.55,
    },
    progressTrack: {
        height: 4,
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.12)',
        marginBottom: 6,
        overflow: 'hidden',
    },
    progressFill: {
        height: 4,
        borderRadius: 2,
        backgroundColor: ProjectColors.purple,
    },
    progressPercent: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '600',
        fontSize: 12,
        color: ProjectColors.white,
        opacity: 0.45,
    },
    completeBtn: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 14,
        paddingVertical: 11,
    },
    completeBtnText: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        fontSize: 14,
        color: ProjectColors.white,
    },

    // Progress input modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    modalBox: {
        width: '100%',
        backgroundColor: ProjectColors.white,
        borderRadius: 24,
        padding: 24,
    },
    modalTitle: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        fontSize: 18,
        color: ProjectColors.black,
        marginBottom: 4,
    },
    modalSub: {
        fontFamily: 'StackSansTextVariableFont',
        fontSize: 13,
        color: ProjectColors.darkGrey,
        marginBottom: 16,
    },
    modalInput: {
        borderWidth: 2,
        borderColor: ProjectColors.black,
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontFamily: 'StackSansTextVariableFont',
        fontSize: 22,
        fontWeight: '700',
        color: ProjectColors.black,
        marginBottom: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 10,
    },
    modalCancel: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 14,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.07)',
    },
    modalCancelText: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '600',
        fontSize: 14,
        color: ProjectColors.black,
    },
    modalConfirm: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 14,
        alignItems: 'center',
        backgroundColor: ProjectColors.black,
    },
    modalConfirmText: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        fontSize: 14,
        color: ProjectColors.white,
    },
});
