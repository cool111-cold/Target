import { Animated, Dimensions, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, Vibration, View } from "react-native"
import { ProjectColors } from "../../../../assets/colors";
import { useRef, useState } from "react";
import { Modal } from "../../../feauters/modal";

const { width } = Dimensions.get('window');

interface Data {
    name: string;
    ball: number;
    type: 'Daily' | 'Disposable'
    color: number;
}

interface PrizeProps {
    item: Data;
}


const Prize = ({item}: PrizeProps) => {

    const scrollViewRef = useRef<ScrollView>(null);
    
    const [isModal, setIsModal] = useState(false);
    const shakeAnimation = useRef(new Animated.Value(0)).current;

    const handleScrollEnd = (event: any) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const scrollPosition = contentOffset.x;
        const maxScroll = contentSize.width - layoutMeasurement.width;

        if (scrollPosition >= maxScroll - 5) {
            console.log('Скролл достиг конца!');
            Vibration.vibrate(10);
            scrollViewRef.current?.scrollTo({ x: 0, animated: true });
        } else {
            scrollViewRef.current?.scrollTo({ x: 0, animated: true });
        }
    };

    const handleLongPress = () => {
        Vibration.vibrate(10);
        setIsModal(true);
    }
    const BALANCE = 32;
    const blanceLine = (BALANCE / item.ball) * 100

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
                <Pressable style={[styles.targetContainer, {borderColor: blanceLine > 90 ? ProjectColors.orange : ProjectColors.white, backgroundColor: ProjectColors.black}]} onLongPress={handleLongPress}>
                    <Text style={styles.ephirText}>{item.ball}</Text>
                    <Text style={styles.textValue}>{item.name}</Text>

                    {blanceLine <= 90 && <View style={[styles.progressBarBottom, {width: `${blanceLine}%`}]}/>}

                </Pressable>
                <View style={styles.saveContainer}>
                    <Text>{'BUY'}</Text>
                </View>
            </Animated.View>

            <Modal title="Change" message="Do you want change target?" buttonTitle="Yes, change" visible={isModal} onClose={() => setIsModal(false)}/>
        </ScrollView>

    )
}

interface TargetListProps {
    Data: Data[]
}

export const PrizeList = ({Data}: TargetListProps) => {
    return (
        <View style={styles.container}>
            {Data.map((item, index) => (
                <Prize key={index} item={item}/>
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
        height: 75,
        backgroundColor: ProjectColors.lightGrey,
        borderRadius: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    targetContainer: {
        width: width - 48,
        height: 75,
        borderRadius: 15,
        paddingHorizontal: 16,
        paddingVertical: 16,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',
        overflow: 'hidden',
        borderWidth: 3,
        gap: 12

    },
    scroll: {
        width: width+48, 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginBottom: 6
    },
    valueContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 16
    },
    ephirText: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        fontSize: 40,
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
        backgroundColor: ProjectColors.orange
    }
})