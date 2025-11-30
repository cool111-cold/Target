import { ScrollView, StyleSheet, View } from "react-native"
import { CalendarBlock } from "../main/components/calendar";
import { ChoiceBar } from "./components/choice-bar";
import { Ephir } from "./components/ephir";
import { TargetList } from "./components/target-list";
import { useState } from "react";
import { AddButton } from "../../components/add-button";
import { useAppStore } from "../../hooks/store";

// const TestData: Array<{
//     name: string;
//     ball: number;
//     data: string;
//     ephir: number;
//     type: 'Daily' | 'Disposable';
//     color: number;
// }> = [
//   {
//       name: 'Зал',
//       ball: 3,
//       data: '12.12.2025',
//       ephir: 90,
//       type: 'Daily',
//       color: 0
//   },
//   {
//       name: 'Доделать бота',
//       ball: 10,
//       data: '12.12.2025',
//       ephir: 50,
//       type: 'Disposable',
//       color: 5
//   },
// ]

export const TargetPage = () => {
    const [activeFilter, setActiveFilter] = useState('Daily');

    const userData = useAppStore((s) => s.userData);
    const TestData = userData?.targets 

    const filteredData = activeFilter === 'All'
        ? TestData
        : TestData?.filter(item => item.type === activeFilter);

    return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CalendarBlock />
        <ChoiceBar active={activeFilter} setActive={setActiveFilter} />
        <Ephir />
        {filteredData?.length && <TargetList Data={filteredData} />}
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