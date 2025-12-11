import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Animated as Animateds, StyleSheet } from 'react-native';
import { useRandomGift } from "../../../hooks/use-random-gift";
import { Gift } from "./gift";
import { CloseGift, OpenGift } from "../../../../assets/icons";
import { useAppStore } from "../../../hooks/store";
import { daysBetween } from "../../../hooks/use-day-betweens";


interface BalanceProps {
  isClick: boolean;
  setIsClick: (e: any) => void;
}

interface GiftProps {
  value: string;
  coll: number;
}
 
export const BalanceBlock = ({isClick, setIsClick}: BalanceProps) => {

  const [hasGift, setHasGift] = useState(true);
  
  const slideAnim = useRef(new Animateds.Value(hasGift ? 0 : -120)).current;
  useEffect(() => {
    Animateds.timing(slideAnim, {
      toValue: isClick ? 0 : -120,  // куда едет
      duration: 300,                // скорость
      useNativeDriver: true,        // обязательно
    }).start();
  }, [isClick]);

  const userData = useAppStore((s) => s.userData);
  const setUserData = useAppStore((s) => s.setUserData);

  const takeGift = (item: GiftProps) => {
    setHasGift(false);
    setIsClick(false);
    if (userData) {
      setUserData({...userData, [item.value]: userData[item.value] += item.coll})
    }
  }

  const prizes = useRandomGift();
  
  const currentDay = daysBetween(userData?.data ?? new Date().toLocaleDateString("ru-RU").toString())

  return (
    <View>
      <View style={styles.balanceBlockWrapper}>
        <TouchableOpacity onPress={() => { if (hasGift) { setIsClick((e: any) => !e) } } }>
          <View style={styles.balanceContent}>
            {hasGift && <View style={styles.redPoint} />}
            <View style={styles.giftBlock}>
              {hasGift ? <CloseGift /> : <OpenGift />}
            </View>
            
            <Text style={styles.balanceText}>{userData?.ball ?? 0}</Text>
            <Text style={styles.balanceMiniText}>{`${currentDay ?? 0} days / ${userData?.xp ?? 0} lvl`}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Animateds.View
        style={[
          styles.takeGiftBlock,
          { transform: [{ translateY: slideAnim }], height: isClick ? 75 : 0, marginBottom: isClick ? 12 : 0}
        ]}
      > 
      <Gift onTake={() => takeGift(prizes[0])} prize={prizes[0]}/>
      <Gift onTake={() => takeGift(prizes[1])} prize={prizes[1]}/>
      <Gift onTake={() => takeGift(prizes[2])} prize={prizes[2]}/>
      </Animateds.View>
    </View>
  );
};

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