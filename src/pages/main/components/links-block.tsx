import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ProjectColors } from "../../../../assets/colors";
import { Target, Pizza } from "../../../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppStore } from "../../../hooks/store";
type RootStackParamList = {
    Home: undefined;
    Target: undefined;
    Prize: undefined;
    Create: { targetIndex?: number; targetData?: any } | undefined;
};


interface BLockProps {
    type: 'target' | 'prize';
    points?: number;
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BLock = ({type, points = 0}: BLockProps) => {
    // const COLORS = ['#ff6fd8', '#2575fc', '#6a11cb'];
    const COLORS = ['#e53b3b', '#a774c3', '#444245'];
    const isType = type === 'target';

    const navigation = useNavigation<NavigationProp>();
    return (
        // <TouchableOpacity style={[styles.block, {backgroundColor: isType ? COLORS[2] : COLORS[0]}]}>
        <TouchableOpacity  onPress={() => navigation.navigate(isType ? 'Target' : 'Prize')} style={[styles.block, {backgroundColor: isType ? ProjectColors.black : ProjectColors.white}]}>
            {isType ? <Target color={COLORS[1]} /> : <Pizza color={COLORS[0]}/>}
            <Text style={[styles.text, {color: isType ? COLORS[1] : COLORS[0]}]}>{isType ? "Target" : "Prize"}</Text>
            <Text style={[styles.miniText, {color: isType ? COLORS[1] : COLORS[0]}]}>{`${points} points`}</Text>           
        </TouchableOpacity>
    )
}

export const LinksBlock = () => {
    const userData = useAppStore((e) => e.userData);
    return (
        <View style={styles.contsiner}>
            <BLock type='target' points={userData?.targets?.length}/>
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