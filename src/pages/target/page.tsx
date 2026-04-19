import { ScrollView, StyleSheet, View } from "react-native"
import { CalendarBlock } from "../main/components/calendar";
import { TargetList } from "./components/target-list-v2";
import { TargetList as TargetListV } from "./components/target-list-v3";
import { GoalTargetList } from "./components/target-list-goals";
import { AddButton } from "../../components/add-button";
import { useAppStore } from "../../hooks/store";
import { TARGET_TYPE_IDS } from "../target/components/create-type-button";


export const TargetPage = () => {
    // const [activeFilter, setActiveFilter] = useState('Все');

    const userData = useAppStore((s) => s.userData);
    const TestData = userData?.targets

    const DailyItems = TestData
        ?.map((item, storeIndex) => ({ item, storeIndex }))
        .filter(({ item }) => item.type === TARGET_TYPE_IDS.DAILY)
    const MainItems = TestData
        ?.map((item, storeIndex) => ({ item, storeIndex }))
        .filter(({ item }) => item.type === TARGET_TYPE_IDS.ONE_TIME || item.type === TARGET_TYPE_IDS.REMINDER || item.type === TARGET_TYPE_IDS.DURATION)

    const GoalItems = TestData
        ?.map((item, storeIndex) => ({ item, storeIndex }))
        .filter(({ item }) => item.type === TARGET_TYPE_IDS.BIG_GOAL || item.type === TARGET_TYPE_IDS.PROGRESSIVE)

    return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CalendarBlock />
        {GoalItems && GoalItems.length > 0 && <GoalTargetList Data={GoalItems as any} />}
        {DailyItems && DailyItems.length > 0 && <TargetList Data={DailyItems as any} />}
        {MainItems && MainItems.length > 0 && <TargetListV Data={MainItems as any} />}
      </ScrollView>
      <AddButton type='target' />
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