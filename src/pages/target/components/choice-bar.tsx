import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ProjectColors } from "../../../../assets/colors"

interface ChoiceProps {
    name: string
    active: string
    setActive: (e: string) => void;
}

const Choice = ({name, active, setActive}: ChoiceProps) => {

    const isActive = active === name;

    const handlePress = () => {
        setActive(name);
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={[styles.choiceContainer, {backgroundColor: isActive ? ProjectColors.black : ProjectColors.white}]}>
                <Text style={[styles.text, {color: isActive ? ProjectColors.white : ProjectColors.black}]}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

interface ChoiceBarProps {
    active: string;
    setActive: (value: string) => void;
}

export const ChoiceBar = ({active, setActive}: ChoiceBarProps) => {
    const barValue = ['Daily', 'Disposable', 'All'];
    return (
        <View style={styles.choiceList}>
            {barValue.map((item, index) => (
                <Choice key={index} name={item} active={active} setActive={setActive}/>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    choiceList: {
        width: '100%',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    choiceContainer: {
        width: 'auto',
        height: 30,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: ProjectColors.black,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        marginRight: 12
    },
    text: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '600',
        fontSize: 18,
    }
});