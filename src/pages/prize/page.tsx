import { ScrollView, StyleSheet, View } from "react-native"
import { CalendarBlock } from "../main/components/calendar";
import { ChoiceBar } from "../target/components/choice-bar";
import { useState } from "react";
import { Balance } from "./components/balance";
import { PrizeList } from "./components/prize-list";
import { AddButton } from "../../components/add-button";

const TestData: Array<{
    name: string;
    ball: number;
    type: 'Daily' | 'Disposable';
    color: number;
}> = [
  {
      name: 'Чипсы',
      ball: 50,
      type: 'Daily',
      color: 0
  },
  {
      name: 'Игра',
      ball: 200,
      type: 'Disposable',
      color: 5
  },
]

export const PrizePage = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    
    const filteredData = activeFilter === 'All'
        ? TestData
        : TestData.filter(item => item.type === activeFilter);
    return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CalendarBlock />
        <ChoiceBar active={activeFilter} setActive={setActiveFilter} />
        <Balance />
        <PrizeList Data={filteredData}/>
      </ScrollView>
      <AddButton />
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
});