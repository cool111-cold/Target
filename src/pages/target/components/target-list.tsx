import { Animated, Dimensions, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, Vibration, View } from "react-native"
import { ProjectColors } from "../../../../assets/colors";
import { useEffect, useRef, useState } from "react";
import { EphirIcon, SaveIcon } from "../../../../assets/icons";
import { Modal } from "../../../feauters/modal";

const { width } = Dimensions.get('window');

interface Data {
    name: string;
    ball: number;
    ephir: number;
    data: string;
    type: 'Daily' | 'Disposable'
}

interface TargetProps {
    item: Data;
}

const Target = ({item}: TargetProps) => {

    const scrollViewRef = useRef<ScrollView>(null);
    const [ephirState, setEphirState] = useState(item.ephir);
    const [isModal, setIsModal] = useState(false);
    const shakeAnimation = useRef(new Animated.Value(0)).current;

    const handleScrollEnd = (event: any) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const scrollPosition = contentOffset.x;
        const maxScroll = contentSize.width - layoutMeasurement.width;

        if (scrollPosition >= maxScroll - 5) {
            console.log('Скролл достиг конца!');
            setEphirState(0);
            Vibration.vibrate(10);
            scrollViewRef.current?.scrollTo({ x: 0, animated: true });
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
                <Pressable style={[styles.targetContainer, {borderColor: ephirState > 90 ? ProjectColors.purple : ProjectColors.white}]} onLongPress={handleLongPress}>
                    <Text style={styles.textValue}>{item.name}</Text>
                    <Text style={styles.ephirText}>{item.ball}</Text>
                    <Text style={styles.text}>{item.data}</Text>
                    
                    <EphirButton />

                    {ephirState <= 90 && <View style={[styles.progressBarBottom, {width: `${ephirState}%`}]}/>}

                </Pressable>
                <View style={styles.saveContainer}>
                    <SaveIcon color={ProjectColors.black} />
                </View>
            </Animated.View>

            <Modal title="Change" message="Do you want change target?" buttonTitle="Yes, change" visible={isModal} onClose={() => setIsModal(false)}/>
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
                <Target key={index} item={item as any}/>
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
        backgroundColor: ProjectColors.lightGrey,
        borderRadius: 15,
        paddingHorizontal: 16,
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderWidth: 2,

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
        fontSize: 60,
        color: ProjectColors.black,
        marginTop: -12
    },
    text: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '600',
        fontSize: 14,
        color: ProjectColors.grey
    },
    textValue: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        fontSize: 24,
        color: ProjectColors.black
    },
    progressBarBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: ProjectColors.purple
    }
});