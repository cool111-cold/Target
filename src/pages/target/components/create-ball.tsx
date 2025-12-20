import React, { useState, useRef, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { ProjectColors } from "../../../../assets/colors";

export const TargetBallPicker = ({ onValueChange, currentValue }: { onValueChange: (value: any) => void, currentValue?: any }) => {
  const [value, setValue] = useState(currentValue || 1);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (currentValue === undefined) {
      onValueChange(1);
    }
  }, [currentValue, onValueChange]);

  const numbers = Array.from({ length: 502 }, (_, i) => i);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={numbers}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        snapToInterval={100}                // высота одного элемента
        decelerationRate="fast"
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.y / 100);
          setValue(numbers[index+1]);
          onValueChange(numbers[index+1]);
        }}
        renderItem={({ item }) => (
          <View style={[styles.item, {backgroundColor: item === value ? ProjectColors.black : ProjectColors.white}]}>
            <Text style={[styles.text, {color: item === value ? ProjectColors.white : ProjectColors.darkGrey}]}>{item}</Text>
          </View>
        )}
      />
      <Text style={styles.selected}>Ephir: {Math.floor(value + (value / 2))}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    alignSelf: "center",
    borderColor: ProjectColors.black,
    borderRadius: 25,
    borderWidth: 2,
    overflow: 'hidden'
  },
  item: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
  selected: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 18,
    color: ProjectColors.purple
  }
});
