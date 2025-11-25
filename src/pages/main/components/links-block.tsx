import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ProjectColors } from "../../../../assets/colors";
import { Target, Pizza } from "../../../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
type RootStackParamList = {
    Home: undefined;
    Target: undefined;
    Prize: undefined;
};


interface BLockProps {
    type: 'target' | 'prize';
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BLock = ({type}: BLockProps) => {
    // const COLORS = ['#ff6fd8', '#2575fc', '#6a11cb'];
    const COLORS = ['#e53b3b', '#a774c3', '#444245'];
    const isType = type === 'target';

    const navigation = useNavigation<NavigationProp>();
    return (
        // <TouchableOpacity style={[styles.block, {backgroundColor: isType ? COLORS[2] : COLORS[0]}]}>
        <TouchableOpacity  onPress={() => navigation.navigate(isType ? 'Target' : 'Prize')} style={[styles.block, {backgroundColor: isType ? ProjectColors.black : ProjectColors.white}]}>
            {isType ? <Target color={COLORS[1]} /> : <Pizza color={COLORS[0]}/>}
            <Text style={[styles.text, {color: isType ? COLORS[1] : COLORS[0]}]}>{isType ? "Target" : "Prize"}</Text>
            <Text style={[styles.miniText, {color: isType ? COLORS[1] : COLORS[0]}]}>12 points</Text>           
        </TouchableOpacity>
    )
}

export const LinksBlock = () => {
    return (
        <View style={styles.contsiner}>
            <BLock type='target'/>
            <BLock type='prize' />
        </View>
    )
}

const styles = StyleSheet.create({
    contsiner: {
        width: '100%',
        height: 150,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12
    },
    block: {
        width: '49%',
        height: 150,
        borderRadius: 20,
        padding: 18,
        borderWidth: 2,
        borderColor: ProjectColors.black
    },
    text: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        color: ProjectColors.white,
        fontSize: 24,
        marginTop: 6
    },
    miniText: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '500',
        color: ProjectColors.grey,
        fontSize: 14,
        marginTop: 0
    }
})