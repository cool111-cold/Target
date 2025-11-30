import { StyleSheet, Text, View } from "react-native"
import { ProjectColors } from "../../../../assets/colors";
import { useAppStore } from "../../../hooks/store";

export const Balance = () => {

    const userData = useAppStore((s) => s.userData);
    const currentBalance = userData?.ball || 0;
    

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Balance</Text>
            <Text style={styles.textValue}>{currentBalance}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 120,
        borderBottomColor: ProjectColors.grey,
        borderBottomWidth: 2,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center'

    },
    text: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '600',
        fontSize: 18,
        color: ProjectColors.black
    },
    textValue: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        fontSize: 55,
        textAlign: 'center',
        color: ProjectColors.orange
    }
});