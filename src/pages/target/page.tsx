import { ScrollView, StyleSheet, View } from "react-native"
import { CalendarBlock } from "../main/components/calendar";
import { ChoiceBar } from "./components/choice-bar";
import { Ephir } from "./components/ephir";
import { TargetList } from "./components/target-list";

export const TargetPage = () => {
    return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CalendarBlock />
        <ChoiceBar />
        <Ephir />
        <TargetList />
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
});