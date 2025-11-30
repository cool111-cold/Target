import { useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { BalanceBlock } from "./balance-block";
import { ExpBlock } from "./exp-block";

const { width } = Dimensions.get('window');

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
