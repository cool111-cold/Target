import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { CalendarBlock } from "./components/calendar";
import { MainTasks } from "./components/main-tasks";
import { LinksBlock } from "./components/links-block";
import { TestBlock } from "./components/test-block";
import { useEffect } from "react";
import { useAppStore } from '../../hooks/store';
import { BalanceSlider } from './components/balance-slider';

const { width } = Dimensions.get('window');

export const MainPage = () => {
    const loadUserData = useAppStore((s) => s.loadUserData);
    const userData = useAppStore((s) => s.userData);

    useEffect(() => {
      loadUserData()
    }, []);

    return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CalendarBlock />
        <BalanceSlider />
        <TestBlock />
        <LinksBlock />
        <MainTasks />
      </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#DFDEDA',
      paddingVertical: 12,
      paddingHorizontal: 24,
    },
    text: {
      fontFamily: 'StackSansTextVariableFont',
      fontWeight: '700',
      color: '#121212',
      fontSize: 36,
    },
    miniText: {
      fontFamily: 'StackSansTextVariableFont',
      fontWeight: '500',
      color: '#b4afb8',
      fontSize: 14,
      marginTop: 8,
      marginLeft: 6,
    },
    calendarBlock: {
      marginTop: 18,
      marginBottom: 0,
      flexDirection: 'row',
      position: 'relative',
    },
    iconBlock: {
      position: 'absolute',
      right: -10,
      top: 8,
    },
    balanceBlockGradientWrapper: {
      width: '100%',
      height: 75,
      borderRadius: 25,
      overflow: 'hidden',
      marginTop: 0,
    },
    balanceBlockWrapper: {
      width: '100%',
      height: 150,
      borderRadius: 25,
      overflow: 'hidden',
      marginTop: 12,
      backgroundColor: '#121212',
    },
    balanceEXPBlockWrapper: {
      width: '100%',
      height: 150,
      borderRadius: 25,
      overflow: 'hidden',
      marginTop: 12,
      backgroundColor: '#DFDEDA',
      borderColor: '#121212',
      borderWidth: 2
    },
    gradient: {
      width: width * 2,
      height: 150,
    },
    balanceContent: {
      // ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      paddingHorizontal: 12
      // alignItems: 'center',
    },
    balanceText: {
      fontFamily: 'StackSansTextVariableFont',
      fontWeight: '700',
      color: '#DFDEDA',
      fontSize: 80,
    },
    balanceMiniText: {
      fontFamily: 'StackSansTextVariableFont',
      fontWeight: '500',
      color: '#b4afb8',
      fontSize: 14,
      marginLeft: 8,
    },
    balanceEXPText: {
      fontFamily: 'StackSansTextVariableFont',
      fontWeight: '700',
      color: '#121212',
      fontSize: 50,
      marginTop: 4
    },
    giftBlock: {
      width: 35,
      height: 35,
      backgroundColor: '#DFDEDA',
      position: 'absolute',
      right: 20,
      top: 20,
      borderRadius: 6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    giftEXPBlock: {
      width: 35,
      height: 35,
      backgroundColor: '#121212',
      position: 'absolute',
      right: 20,
      top: 20,
      borderRadius: 6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    redPoint: {
      width: 10,
      height: 10,
      backgroundColor: '#e53b3b',
      borderRadius: 20,
      position: 'absolute',
      right: 18,
      top: 18,
      zIndex: 1
    },
    takeGiftBlock: {
      width: '100%',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      zIndex: -1,
      marginTop: 12
      // backgroundColor: '#121212',
    },
    gift: {
      width: 75,
      height: 75,
      backgroundColor: '#121212',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });