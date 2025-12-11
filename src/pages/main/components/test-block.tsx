import { useEffect } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { ProjectColors } from "../../../../assets/colors";
import { NavigationProp } from "./links-block";
import { useNavigation } from "@react-navigation/native";
import { useAppStore } from "../../../hooks/store";

const { width } = Dimensions.get('window');
const COLORS = ['#ff6fd8', '#2575fc', '#6a11cb'];

const date = new Date();
const hours = date.getHours();
const isTimeToTest = hours >= 21 || hours <= 2;


export const TestBlock = () => {
    const progress = useSharedValue(0);
    const navigation = useNavigation<NavigationProp>();
    const userData = useAppStore((s) => s.userData);
    
      useEffect(() => {
        progress.value = withRepeat(
          withTiming(1, { duration: 6000 }),
          -1,
          true
        );
      }, []);
    
      const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: -width + progress.value * width }],
      }));

      const handlePress = () => {
        navigation.navigate('Test')
      }

      // Проверяем был ли тест пройден сегодня
      const today = new Date().toLocaleDateString("ru-RU");
      const testCompletedToday = userData?.lastTestDate === today;

      if (!isTimeToTest || testCompletedToday) {
        return null
      }
    
      return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.balanceBlockGradientWrapper}>
            <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
                <LinearGradient
                colors={COLORS}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
                />
            </Animated.View>
                <Text style={styles.balanceText}>Do you just want to take the test?</Text>
            </View>
        </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
    balanceBlockGradientWrapper: {
      width: '100%',
      height: 75,
      borderRadius: 25,
      overflow: 'hidden',
      marginTop: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    gradient: {
      width: width * 2,
      height: 150,
    },
    balanceText: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        color: ProjectColors.white,
        fontSize: 18,
    },
  });
  