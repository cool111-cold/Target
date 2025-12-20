import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ArrowRight } from "../../../../assets/icons";
import { ProjectColors } from "../../../../assets/colors";
import { useTranslate as t } from "../../../feauters/text/use-translate";

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
type dateType = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export const CalendarBlock = () => {
  const date = new Date();

  return (
    <TouchableOpacity>
      <View style={styles.calendarBlock}>
        <Text style={styles.text}>{`${t(DAYS[date.getDay()] as dateType)}, ${date.getDate()}`}</Text>
        <Text style={styles.miniText}>{`${date.getDay() === 0 ? '7' : date.getDay()}/7`}</Text>
        <View style={styles.iconBlock}>
          <ArrowRight />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'StackSansTextVariableFont',
    fontWeight: '700',
    color: ProjectColors.black,
    fontSize: 36,
  },
  miniText: {
    fontFamily: 'StackSansTextVariableFont',
    fontWeight: '500',
    color: ProjectColors.grey,
    fontSize: 14,
    marginTop: 8,
    marginLeft: 6,
  },
  calendarBlock: {
    marginTop: 18,
    marginBottom: 0,
    flexDirection: 'row',
    position: 'relative',
  },
  iconBlock: {
    position: 'absolute',
    right: -10,
    top: 8,
  },
});