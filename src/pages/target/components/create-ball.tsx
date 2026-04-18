import React, { useState, useRef, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ProjectColors } from "../../../../assets/colors";
import { InfoIcon } from "../../../../assets/icons";

interface Button {
  ind: number
}

export const TargetBallPicker = ({ onValueChange, currentValue }: { onValueChange: (value: any) => void, currentValue?: any, type?: 'target' | 'prize' }) => {
  const [value, setValue] = useState(currentValue || 1);
  const [infoVisible, setInfoVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const ITEM_HEIGHT = 150;
  const CONTAINER_HEIGHT = 450;
  const PADDING = (CONTAINER_HEIGHT - ITEM_HEIGHT) / 2;

  useEffect(() => {
    if (currentValue === undefined) {
      onValueChange(1);
    }
  }, [currentValue, onValueChange]);

  const numbers = Array.from({ length: 502 }, (_, i) => i);
  const snapOffsets = numbers.map((_, index) => index * ITEM_HEIGHT);

  const FastButton = ({ind}: Button) => {
    const handlePress = () => {
      onValueChange(ind);
      setValue(ind);
      flatListRef.current?.scrollToIndex({
        index: ind - 1,
        animated: true
      });
    };

    return (
      <TouchableOpacity style={{width: 50, height: 25, borderColor: ProjectColors.black,
        borderRadius: 25,
        borderWidth: 2, alignItems: 'center', justifyContent: 'center',
        backgroundColor: currentValue === ind ? ProjectColors.black : ProjectColors.white
        }} onPress={handlePress}>
        <Text style={{color: currentValue === ind ? ProjectColors.white : ProjectColors.black}}>{ind}</Text>
      </TouchableOpacity>
    )
  }

  const InfoButton = () => {
    return (
      <TouchableOpacity onPress={() => setInfoVisible((e) => !e)}>
        <InfoIcon color="#000"/>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={numbers}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        snapToOffsets={snapOffsets}
        decelerationRate="fast"
        // contentContainerStyle={{
        //   paddingVertical: PADDING
        // }}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise<void>(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
          });
        }}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
          const selectedValue = numbers[index + 1];
          setValue(selectedValue);
          onValueChange(selectedValue);
        }}
        renderItem={({ item }) => (
          <View style={[styles.item]}>
            <Text style={[styles.text, {color: item === value ? ProjectColors.black : ProjectColors.darkGrey}]}>{item}</Text>
            {infoVisible && <Text style={[styles.selected, {opacity: item === value ? 1 : 0.3} ]}>{Math.floor(item + (item / 2))}</Text>}
          </View>
        )}
      />
    </View>
    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: 12}}>
      <FastButton ind={10} />
      <FastButton ind={25} />
      <FastButton ind={50} />
      <FastButton ind={100} />
      <InfoButton />
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 450,
    width: '100%',
    alignSelf: "center",
    overflow: 'hidden'
  },
  item: {
    height: 150,
    justifyContent: 'space-around',
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
  },
  text: {
    fontSize: 64,
  },
  selected: {
    textAlign: "center",
    fontSize: 64,
    color: ProjectColors.purple
  }
});
