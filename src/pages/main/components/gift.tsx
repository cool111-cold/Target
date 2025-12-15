import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import { CloseGift } from "../../../../assets/icons";
import { ProjectColors } from "../../../../assets/colors";
import { Modal } from "../../../feauters/modal";


interface Prize {
  value: string;
  coll: number
}
interface GiftProps {
  onTake: () => void;
  prize: Prize;
}

const GiftMap = {
  'xp': 'xp for you level',
  'ephir': 'ephir for update your targets',
  'coin': 'coins to purchase coupons',
  'ball': 'balls to purchase prizes',
  'defCupon': 'a regular coupon for a free purchase of any daily prize',
  'cupon': 'coupon for free purchase of any prize'
}

export const Gift = ({ onTake, prize }: GiftProps) => {
  const rotation = useSharedValue(0); 

  useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(-3, { duration: 80 }),
        withTiming(3, { duration: 130 }),
        withTiming(-3, { duration: 130 }),
        withTiming(0, { duration: 80 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const [modalVisible, setModalVisible] = useState(false);

  const handleTakeGift = () => {
    onTake();
    setModalVisible(false);
  }

  const isCupon = prize.value === 'defCupon';

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Animated.View style={[styles.gift, animatedStyle]}>
          <CloseGift color='#DFDEDA'/>
        </Animated.View>
      </TouchableOpacity>
      <Modal title={'Great! you got'} message={`${isCupon ? '1' : prize.coll} ${GiftMap[prize.value]}`} buttonTitle={'Get'} visible={modalVisible} onClose={handleTakeGift}/>
    </>
  )
}

const styles = StyleSheet.create({
  gift: {
    width: 75,
    height: 75,
    backgroundColor: ProjectColors.black,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
