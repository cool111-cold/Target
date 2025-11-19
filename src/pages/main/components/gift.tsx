import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import { CloseGift } from "../../../../assets/icons";
import { ProjectColors } from "../../../../assets/colors";
import { Modal } from "../../../feauters/modal";

interface GiftProps {
  onTake: () => void;
}

export const Gift = ({ onTake }: GiftProps) => {
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

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Animated.View style={[styles.gift, animatedStyle]}>
          <CloseGift color='#DFDEDA'/>
        </Animated.View>
      </TouchableOpacity>
      <Modal title={'Great! you got'} message={'x'} buttonTitle={'Get'} visible={modalVisible} onClose={handleTakeGift}/>
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
