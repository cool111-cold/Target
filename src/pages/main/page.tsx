import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Animated as Animateds } from 'react-native';
import { CalendarBlock } from "./components/calendar";
import { MainTasks } from "./components/main-tasks";
import { LinksBlock } from "./components/links-block";
import { TestBlock } from "./components/test-block";
import { useEffect, useRef, useState } from "react";
import { CloseGift, OpenGift } from '../../../assets/icons';
import { Gift } from './components/gift';
import { useRandomGift } from '../../hooks/use-random-gift';

const { width } = Dimensions.get('window');

interface BalanceProps {
  isClick: boolean;
  setIsClick: (e: any) => void;
}
 
const BalanceBlock = ({isClick, setIsClick}: BalanceProps) => {

  const [hasGift, setHasGift] = useState(true);
  // const [isClick, setIsClick] = useState(false);
  
  const slideAnim = useRef(new Animateds.Value(hasGift ? 0 : -120)).current;
  useEffect(() => {
    Animateds.timing(slideAnim, {
      toValue: isClick ? 0 : -120,  // куда едет
      duration: 300,                // скорость
      useNativeDriver: true,        // обязательно
    }).start();
  }, [isClick]);

  const takeGift = () => {
    setHasGift(false);
    setIsClick(false);
  }

  const prizes = useRandomGift();
  


  return (
    <View>
      <View style={styles.balanceBlockWrapper}>
        <TouchableOpacity onPress={() => { if (hasGift) { setIsClick((e: any) => !e) } } }>
          <View style={styles.balanceContent}>
            {hasGift && <View style={styles.redPoint} />}
            <View style={styles.giftBlock}>
              {hasGift ? <CloseGift /> : <OpenGift />}
            </View>
            
            <Text style={styles.balanceText}>32</Text>
            <Text style={styles.balanceMiniText}>4 days / 1 lvl</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Animateds.View
        style={[
          styles.takeGiftBlock,
          { transform: [{ translateY: slideAnim }], height: isClick ? 75 : 0, marginBottom: isClick ? 12 : 0}
        ]}
      > 
      <Gift onTake={takeGift} prize={prizes[0]}/>
      <Gift onTake={takeGift} prize={prizes[1]}/>
      <Gift onTake={takeGift} prize={prizes[2]}/>
      </Animateds.View>
    </View>
  );
};

const ExpBlock = () => {
  const hasGift = false;
  const COLORS = ['#e53b3b', '#a774c3', '#444245'];
  const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];

  const exp = 0;
  const targetExp = 1000;
  return (
    <View style={styles.balanceEXPBlockWrapper}>
      <TouchableOpacity onPress={() => console.log('///')}>
        <View style={styles.balanceContent}>
          {hasGift && <View style={styles.redPoint} />}
          <View style={styles.giftEXPBlock}>
              {hasGift ? <CloseGift color='#DFDEDA'/> : <OpenGift />}
          </View>
          
          <Text style={styles.balanceEXPText}>{`${exp}/${targetExp}`}</Text>
          <View style={{width: '100%', height: 24, marginTop: 24, borderRadius: 10, borderColor: '#121212', borderWidth: 2, overflow: 'hidden'}}>
            <View style={{height: 24, backgroundColor: randomColor, width: `${exp / (targetExp / 100)}%`}} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const BalanceSlider = () => {
  const [isClick, setIsClick] = useState(false);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} snapToInterval={width} onScroll={()=>setIsClick(false)}>
      <View style={{ width: width - 48 }}>
        <BalanceBlock isClick={isClick} setIsClick={setIsClick}/>
      </View>
      <View style={{ width: width - 48, marginLeft: 24 }}>
        <ExpBlock />
      </View>
    </ScrollView>
  );
};


export const MainPage = () => {
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