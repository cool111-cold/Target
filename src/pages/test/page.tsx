import { StyleSheet, View, Animated, PanResponder, Text, Vibration } from "react-native"
import { ProjectColors } from "../../../assets/colors"
import { useRef, useState, useEffect } from "react"
import { useAppStore } from "../../hooks/store"
import { FaceSmile } from "../../../assets/icons"
import { Button } from "../../feauters/button"

interface TestItemProps {
    color: string
    rotation?: number
    translateY?: number
    translateX?: number
    draggable?: boolean
    setVisible?: (e: number) => void;
    title?: string;
    ball?: string | number;
    setItem?: () => void;
    setCount?: (e: number) => void;
}

interface targetData {
    name: string;
    ball: number;
    ephir: number;
    data: string;
    type: 'Daily' | 'Disposable'
    color: number;
}

const TestItem = ({color, rotation = 0, translateY = 0, translateX = 0, draggable = false, setVisible, title, ball, setItem, setCount}: TestItemProps) => {
    const pan = useRef(new Animated.Value(0)).current

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => draggable,
            onPanResponderGrant: () => {
                // Показываем текст при начале перетаскивания
                if (setVisible) setVisible(1)
            },
            onPanResponderMove: Animated.event([null, { dx: pan }], {
                useNativeDriver: false,
            }),
            onPanResponderRelease: (_, gestureState) => {
                // Скрываем текст при отпускании
                if (setVisible) setVisible(0)

                // Проверяем, достиг ли элемент края
                const threshold = 100 // Порог для определения края (можно настроить)

                if (gestureState.dx < -threshold) {
                    console.log(0) // Сдвинут влево
                    Vibration.vibrate(10);
                    if (setCount) setCount(-1)
                    if (setItem) setItem();
                } else if (gestureState.dx > threshold) {
                    console.log(1) // Сдвинут вправо
                    Vibration.vibrate(10);
                    if (setCount) setCount(1)
                    if (setItem) setItem();
                }

                // Возвращаем на исходную позицию с анимацией
                // if (setItem) setItem();
                Animated.spring(pan, {
                    toValue: 0,
                    useNativeDriver: false,
                    friction: 7,
                    tension: 40,
                }).start()
            },
        })
    ).current

    if (draggable) {
        return (
            <Animated.View
                style={[
                    styles.testItemContainer,
                    {
                        backgroundColor: color,
                        transform: [
                            { rotate: `${rotation}deg` },
                            { translateX: Animated.add(translateX, pan) },
                            { translateY },
                        ],
                    },
                ]}
                {...panResponder.panHandlers}
            >
                <Text style={styles.itemTitle}>{title}</Text>
                <Text style={styles.itemBall}>{ball}</Text>
            </Animated.View>
        )
    }

    return (
        <View style={[styles.testItemContainer, {backgroundColor: color, transform: [{rotate: `${rotation}deg`}, {translateY}, {translateX}]}]}>
            <Text style={[styles.itemTitle, {color: ProjectColors.white}]}>{title}</Text>
            <Text style={[styles.itemBall, {color: ProjectColors.white}]}>{ball}</Text>
        </View>
    )
}

interface FaceProps {
    count: number;
}

const Face = ({count}: FaceProps) => {
    const types = {
        'happy': {
            width: 150,
            height: 150,
            rotate: 0,
        },
        'sad': {
            width: 120,
            height: 120,
            rotate: 180,
        },
        'medium': {
            width: 150,
            height: 50,
            rotate: 180,
        }
    }

    const [type, setType] = useState<'happy' | 'sad' | 'medium'>('medium');

    useEffect(()=>{
        if (count < 0) {
            setType('sad')
        }
        if (count > 0) {
            setType('happy')
        }
        if (count === 0) {
            setType('medium')
        }
    },[count])

    const animatedWidth = useRef(new Animated.Value(types.medium.width)).current;
    const animatedHeight = useRef(new Animated.Value(types.medium.height)).current;
    const animatedRotate = useRef(new Animated.Value(types.medium.rotate)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(animatedWidth, {
                toValue: types[type].width,
                duration: 250,
                useNativeDriver: false,
            }),
            Animated.timing(animatedHeight, {
                toValue: types[type].height,
                duration: 250,
                useNativeDriver: false,
            }),
            Animated.timing(animatedRotate, {
                toValue: types[type].rotate,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start();
    }, [type]);

    const rotate = animatedRotate.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
    });

    return(
        <View style={styles.faceContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 16}}>
                <Animated.View style={{backgroundColor: ProjectColors.black, width: animatedWidth, height: animatedHeight, borderRadius: 75 }} />
                <Animated.View style={{backgroundColor: ProjectColors.black, width: animatedWidth, height: animatedHeight, borderRadius: 75 }} />
            </View>
            <Animated.View style={{transform: [{rotate}]}}>
                <FaceSmile />
            </Animated.View>
        </View>
    )
}

export const TestPage = () => {
    const userData = useAppStore((s) => s.userData);
    const data = userData?.targets?.filter((e) => e.type === 'Daily');

    const [finalBall, setFinalBall] = useState(0);
    const [visibleText, setVisibleText] = useState(0);
    const [currentItem, setCurrentItem] = useState(0);
    const [finalCount, setFinalCount] = useState(0);

    const handleSetItem = (item: targetData | undefined) => {
        setCurrentItem((prev) => prev + 1 < (data?.length || 0) ? prev + 1 : prev);
        // setFinalBall((prev) => prev += item?.ball ?? 0);
    }

    return (
    <View style={styles.container}>
        <Face count={finalCount}/>
        <Text style={styles.title}>{'Did you do this today?'}</Text>
        <View style={styles.block}>
            <TestItem color={ProjectColors.orange} rotation={-20} translateY={-35} translateX={-25}/>
            <TestItem
                color={ProjectColors.black}
                rotation={-10}
                translateY={-15}
                translateX={-15}
                title={currentItem + 1 < (data?.length || 0) ? data?.[currentItem + 1].name : ''}
                ball={currentItem + 1 < (data?.length || 0) ? data?.[currentItem + 1].ball : ''}
            />
            <TestItem
                color={ProjectColors.lightGrey}
                rotation={0} translateY={0}
                translateX={0} draggable={true}
                setVisible={setVisibleText}
                setCount={setFinalCount}
                title={currentItem < (data?.length || 0) ? data?.[currentItem].name : ''}
                ball={currentItem < (data?.length || 0) ? data?.[currentItem].ball : ''}
                setItem={() => handleSetItem(data?.[currentItem])}
            />
        </View>
        <Text style={[styles.yesText, {opacity: visibleText}]}>{'YES'}</Text>
        <Text style={[styles.noText, {opacity: visibleText}]}>{'NO'}</Text>
        <View style={{position: 'absolute', bottom: 24, width: '100%'}}>
        <Button title={`Get ${finalBall} balls`} onClick={() => null} disabled={currentItem + 1 < (data?.length ?? 0)} />
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#DFDEDA',
    //   backgroundColor: '#aec96b',
    //   backgroundColor: '#fd8b6d',
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
        fontFamily: 'StackSansTextVariableFont',
        fontSize: 28,
        fontWeight: '700',
    },
    itemTitle: {
        fontFamily: 'StackSansTextVariableFont',
        fontSize: 24,
        fontWeight: '700',
        position: 'absolute',
        top: 24,
        left: 24,
        color: ProjectColors.black
    },
    itemBall: {
        fontFamily: 'StackSansTextVariableFont',
        fontSize: 56,
        fontWeight: '700',
    },
    block: {
        width: 200,
        height: 200,
        position: 'relative',
        marginTop: 48
    },
    testItemContainer: {
        width: 200,
        height: 200,
        borderRadius: 16,
        padding: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    yesText: {
        fontFamily: 'StackSansTextVariableFont',
        position: 'absolute',
        right: 24,
        fontSize: 18,
        fontWeight: '700',
        color: ProjectColors.purple
    },
    noText: {
        fontFamily: 'StackSansTextVariableFont',
        position: 'absolute',
        left: 24,
        fontSize: 18,
        fontWeight: '700',
        color: ProjectColors.orange
    },

    faceContainer: {
        width: '100%',
        marginBottom: 42,
        alignItems: 'center'
    }
});