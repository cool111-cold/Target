import React, { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, Vibration, View } from "react-native";
import { ProjectColors } from "../../../../assets/colors";
import { DailyIcon } from "../../../../assets/icons/daily-icon";
import { CheckIcon } from "../../../../assets/icons/check-icon";
import { Modal } from "../../../feauters/modal";
import { useAppStore } from "../../../hooks/store";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../main/components/links-block";

interface Data {
    name: string;
    ball: number;
    ephir: number;
    data: string;
    type: string;
    color: number;
    difficulty: number;
    lastCompleted?: string;
}

interface TargetProps {
    item: Data;
    index: number;
}

const DIFFICULTY_COLORS = ['#afe3bd', '#dce39a', '#d2afe3', '#e0bac0'];

const today = new Date().toLocaleDateString("ru-RU");

const Target = ({ item, index }: TargetProps) => {
    const [ephirState, setEphirState] = useState(item.ephir);
    const [isModal, setIsModal] = useState(false);
    const [markedToday, setMarkedToday] = useState(item.lastCompleted === today);
    const addHistoryItem = useAppStore(s => s.addHistoryItem);
    const updateTarget = useAppStore(s => s.updateTarget);
    const removeTarget = useAppStore(s => s.removeTarget);
    const navigation = useNavigation<NavigationProp>();
    const isProcessingRef = useRef(false);

    const accentColor = DIFFICULTY_COLORS[item.difficulty] ?? ProjectColors.lightGrey;

    const handlePlusPress = () => {
        if (isProcessingRef.current || markedToday) return;
        isProcessingRef.current = true;
        Vibration.vibrate(10);

        addHistoryItem({ name: item.name, date: today, price: item.ball, type: 'target' });

        if (item.type === 'Disposable') {
            removeTarget(index);
        } else {
            updateTarget(index, { ...item, ephir: 0, lastCompleted: today } as any);
            setEphirState(0);
            setMarkedToday(true);
        }

        setTimeout(() => { isProcessingRef.current = false; }, 500);
    };

    return (
        <>
            <Pressable
                style={[styles.row, { opacity: markedToday ? 0.45 : 1 }]}
                onLongPress={() => { Vibration.vibrate(10); setIsModal(true); }}
            >
                <View style={[styles.accentBar, { backgroundColor: accentColor }]} />

                <View style={styles.rowContent}>
                    <View style={styles.rowLeft}>
                        <DailyIcon size={18} color={ProjectColors.black} />
                        <Text style={styles.rowName} numberOfLines={1}>{item.name}</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.checkButton, { backgroundColor: markedToday ? accentColor : ProjectColors.black }]}
                        onPress={handlePlusPress}
                        activeOpacity={0.7}
                    >
                        {markedToday
                            ? <CheckIcon size={18} color={ProjectColors.black} />
                            : <Text style={styles.plusText}>+</Text>
                        }
                    </TouchableOpacity>
                </View>

                {ephirState > 0 && (
                    <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `${ephirState}%`, backgroundColor: accentColor }]} />
                    </View>
                )}
            </Pressable>

            <Modal
                title="Change"
                message="Do you want change target?"
                buttonTitle="Yes, change"
                visible={isModal}
                onClose={() => setIsModal(false)}
                onConfirm={() => {
                    setIsModal(false);
                    navigation.navigate('Create', { targetIndex: index, targetData: item, type: 'target' });
                }}
            />
        </>
    );
};

interface TargetListProps {
    Data: Data[];
}

export const TargetList = ({ Data }: TargetListProps) => {
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.title}>Прогресс дня</Text>
                <Text style={styles.subTitle}>{`${Data.filter(item => item.lastCompleted === today).length}/${Data.length}`}</Text>
            </View>
            
            {Data.map((item, index) => (
                <Target key={index} item={item as any} index={index} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 12,
    },
    title: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        fontSize: 18,
        color: ProjectColors.black,
        marginBottom: 10,
    },
    subTitle: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        fontSize: 14,
        color: ProjectColors.darkGrey,
        marginBottom: 10,
    },
    row: {
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 16,
        marginBottom: 8,
        backgroundColor: ProjectColors.black,
    },
    accentBar: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 5,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
    rowContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingLeft: 20,
        paddingRight: 14,
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flex: 1,
        marginRight: 8,
    },
    rowName: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        fontSize: 16,
        color: ProjectColors.white,
        flex: 1,
    },
    checkButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    plusText: {
        color: ProjectColors.white,
        fontSize: 22,
        fontWeight: '600',
        lineHeight: 28,
    },
    progressTrack: {
        height: 3,
        backgroundColor: 'rgba(255,255,255,0.07)',
    },
    progressFill: {
        height: 3,
    },
});
