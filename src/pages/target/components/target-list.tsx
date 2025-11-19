import { Dimensions, ScrollView, StyleSheet, Text, Vibration, View } from "react-native"
import { ProjectColors } from "../../../../assets/colors";
import { useRef } from "react";

const { width } = Dimensions.get('window');

const Target = () => {
    const scrollViewRef = useRef<ScrollView>(null);

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

    return (
        <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            onScrollEndDrag={handleScrollEnd}
            onMomentumScrollEnd={handleScrollEnd}
        >
            <View style={styles.scroll}>
                <View style={styles.targetContainer}>
                    <Text style={styles.textValue}>Зал</Text>
                    <Text style={styles.ephirText}>3</Text>
                    <Text style={styles.text}>12.12.1212</Text>

                    <View style={[styles.progressBarBottom, {width: '80%'}]}/>

                </View>
                <View style={styles.saveContainer}>

                </View>
            </View>
        </ScrollView>

    )
}

export const TargetList = () => {
    return (
        <View style={styles.container}>
            <Target />
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
        height: '100%',
        backgroundColor: ProjectColors.lightGrey,
        borderRadius: 15,
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
        overflow: 'hidden'

    },
    scroll: {
        width: width+48, 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between'
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