import { ScrollView, StyleSheet, View } from "react-native"
import { CalendarBlock } from "../main/components/calendar";
import { ChoiceBar } from "../target/components/choice-bar";
import { useState } from "react";
import { Balance } from "./components/balance";
import { PrizeList } from "./components/prize-list";
import { AddButton } from "../../components/add-button";
import { useAppStore } from "../../hooks/store";

export const PrizePage = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const userData = useAppStore((s) => s.userData);
    const prizeData = userData?.prizes

    const filteredData = activeFilter === 'All'
        ? prizeData
        : prizeData?.filter(item => item.type === activeFilter);

    return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CalendarBlock />
        <ChoiceBar active={activeFilter} setActive={setActiveFilter} />
        <Balance />
        {filteredData && filteredData.length > 0 && <PrizeList Data={filteredData}/>}
      </ScrollView>
      <AddButton type='prize' />
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