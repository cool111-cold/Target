import { StyleSheet, View } from "react-native"
import { ProjectColors } from "../../../../assets/colors";

interface BarProps {
    isActive: boolean;
}

interface ProgressBarProps {
    labels: any[];
    currentLabel: number;
}

const Bar = ({isActive}: BarProps) => {
    return(
        <View style={[styles.barContainer, {backgroundColor: isActive ? ProjectColors.black : ProjectColors.darkGrey}]}>

        </View>
    )
}
export const ProgressBar = ({labels, currentLabel}: ProgressBarProps) => {

    return (
        <View style={styles.container}>
            {labels.map((item, index) => (
                <Bar key={index} isActive={index === currentLabel} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 5,
        display: 'flex',
        flexDirection: 'row',
        gap: 6
    },
    barContainer: {
        flex: 1,
        borderRadius: 25,
    }
})