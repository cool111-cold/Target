import { Animated, Dimensions, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, Vibration, View } from "react-native"
import { ProjectColors } from "../../../../assets/colors";
import { useEffect, useRef, useState } from "react";
import { EphirIcon, SaveIcon } from "../../../../assets/icons";
import { Modal } from "../../../feauters/modal";
import { useAppStore } from "../../../hooks/store";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../main/components/links-block";

const { width } = Dimensions.get('window');

interface Data {
    name: string;
    ball: number;
    ephir: number;
    data: string;
    type: 'Daily' | 'Disposable'
    color: number;
}

interface TargetProps {
    item: Data;
    index: number;
}

const colors = ['#885053', '#d5583c', '#787da7', '#393939', '#9ca2dc', '#9ec687', '#358ca3', '#ccc73b', '#1a2f3a']

const Target = ({item, index}: TargetProps) => {

    const scrollViewRef = useRef<ScrollView>(null);
    const [ephirState, setEphirState] = useState(item.ephir);
    const [isModal, setIsModal] = useState(false);
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    const incrementRewards = useAppStore((s) => s.incrementRewards);
    const addHistoryItem = useAppStore((s) => s.addHistoryItem);
    const navigation = useNavigation<NavigationProp>();

    const handleScrollEnd = (event: any) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const scrollPosition = contentOffset.x;
        const maxScroll = contentSize.width - layoutMeasurement.width;

        if (scrollPosition >= maxScroll - 5) {
            Vibration.vibrate(10);
            scrollViewRef.current?.scrollTo({ x: 0, animated: true });
            setEphirState(0);

            incrementRewards(10, item.ball);
            addHistoryItem({
                name: item.name,
                date: new Date().toLocaleDateString("ru-RU").toString(),
                price: item.ball,
                type: 'target'
            });
        } else {
            scrollViewRef.current?.scrollTo({ x: 0, animated: true });
        }
    };

    useEffect(() => {
        if (ephirState >= 100) {
            Animated.sequence([
                Animated.timing(shakeAnimation, {
                    toValue: 1,
                    duration: 20,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnimation, {
                    toValue: -1,
                    duration: 20,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnimation, {
                    toValue: 1,
                    duration: 20,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnimation, {
                    toValue: -1,
                    duration: 20,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnimation, {
                    toValue: 1,
                    duration: 20,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnimation, {
                    toValue: -1,
                    duration: 20,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnimation, {
                    toValue: 1,
                    duration: 20,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnimation, {
                    toValue: -1,
                    duration: 20,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnimation, {
                    toValue: 0,
                    duration: 20,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [ephirState]);

    const handlePressEphir = () => {
        if (ephirState < 90) {
            Vibration.vibrate(10);
        }else{
            Vibration.vibrate(100);
        }

        setEphirState((e) => e+=10)
    }

    const handleLongPress = () => {
        Vibration.vibrate(10);
        setIsModal(true);
    }

    const EphirButton = () => {

        if (ephirState > 90) return;

        return (
            <TouchableOpacity 
                onPress={handlePressEphir}
                style={{position: 'absolute', bottom: 12, right: 12}}>
                <EphirIcon size={45} color={ProjectColors.purple} />
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            onScrollEndDrag={handleScrollEnd}
            onMomentumScrollEnd={handleScrollEnd}
        >
            <Animated.View style={[styles.scroll, {
                transform: [{ translateX: shakeAnimation }]
            }]}>
                <Pressable style={[styles.targetContainer, {borderColor: ephirState > 90 ? ProjectColors.purple : ProjectColors.white, backgroundColor: ProjectColors.black}]} onLongPress={handleLongPress}>
                    <Text style={styles.textValue}>{item.name}</Text>
                    <Text style={styles.ephirText}>{item.ball}</Text>
                    
                    <EphirButton />

                    {ephirState <= 90 && <View style={[styles.progressBarBottom, {width: `${ephirState}%`}]}/>}

                </Pressable>
                <View style={styles.saveContainer}>
                    <SaveIcon color={ProjectColors.black} />
                </View>
            </Animated.View>

            <Modal
                title="Change"
                message="Do you want change target?"
                buttonTitle="Yes, change"
                visible={isModal}
                onClose={() => setIsModal(false)}
                onConfirm={() => {
                    setIsModal(false);
                    navigation.navigate('Create', { targetIndex: index, targetData: item });
                }}
            />
        </ScrollView>

    )
}

interface TargetListProps {
    Data: Data[]
}

export const TargetList = ({Data}: TargetListProps) => {
    return (
        <View style={styles.container}>
            {Data.map((item, index) => (
                <Target key={index} item={item as any} index={index}/>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        marginTop: 24

    },
    saveContainer: {
        width: 80,
        height: 130,
        backgroundColor: ProjectColors.lightGrey,
        borderRadius: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    targetContainer: {
        width: width - 48,
        height: 130,
        backgroundColor: '#1a2f3a',
        borderRadius: 15,
        paddingHorizontal: 16,
        paddingVertical: 8,
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        borderWidth: 3,

    },
    scroll: {
        width: width+48, 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginBottom: 12
    },
    valueContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 16
    },
    ephirText: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        fontSize: 50,
        color: ProjectColors.white,
        marginTop: -12
    },
    text: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '600',
        fontSize: 14,
        color: ProjectColors.lightGrey
    },
    textValue: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '600',
        fontSize: 20,
        color: ProjectColors.white
    },
    progressBarBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: ProjectColors.purple
    }
});