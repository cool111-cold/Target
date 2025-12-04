import { StyleSheet, TouchableOpacity, View } from "react-native"
import { ProjectColors } from "../../assets/colors"
import { PlusIcon } from "../../assets/icons/plus"
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../pages/main/components/links-block";

interface Props {
    type: 'target' | 'prize'
}

export const AddButton = ({type}: Props) => {

    const navigation = useNavigation<NavigationProp>();

    const handleNavigate = () => {
        return navigation.navigate('Create', {type: type});
    }
    
    return (
        <TouchableOpacity style={style.container} onPress={handleNavigate}>
            <PlusIcon size={15} color={ProjectColors.white} />
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 55,
        height: 55,
        borderRadius: 50,
        backgroundColor: ProjectColors.black,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})