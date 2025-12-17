import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ProjectColors } from "../../../../assets/colors"
import { HomeIcon, CuponIcon, ProfileIcon } from "../../../../assets/icons"
import { JSX } from "react";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "./links-block";

interface TabProps {
    name: string;
    icon: JSX.Element;
    iconActive: JSX.Element;
    setActive: (e: string) => void;
    active: string;

}

const Tab = ({name, icon, setActive, active, iconActive}: TabProps) => {
    const isActive = active === name;
    const navigation = useNavigation<NavigationProp>();
    return (
        // @ts-ignore
        <TouchableOpacity onPress={() => {setActive(name); navigation.navigate(name)}} style={{marginRight: 8}}>
        <View style={isActive ? styles.tabActiveContainer : styles.tabContainer}>
            {isActive ? iconActive : icon}
            {isActive && <Text style={styles.tabText}>{name}</Text>}
        </View>
        </TouchableOpacity>
    )
}

interface TabBarProps {
    currentRoute: string;
}

export const TabBar = ({ currentRoute }: TabBarProps) => {
    const active = currentRoute;

    const setActive = (name: string) => {
        // Навигация будет происходить в компоненте Tab
    };

    return (
        <View style={styles.container}>
            <Tab
                name="Home"
                iconActive={<HomeIcon color={ProjectColors.black} width={30} height={30}/>}
                icon={<HomeIcon color={ProjectColors.white} width={30} height={30}/>}
                setActive={setActive}
                active={active}
            />
            <Tab
                name="Cupons"
                iconActive={<CuponIcon color={ProjectColors.black} width={30} height={30}/>}
                icon={<CuponIcon color={ProjectColors.white} width={30} height={30}/>}
                setActive={setActive}
                active={active}
            />
            <Tab
                name="Profile"
                iconActive={<ProfileIcon color={ProjectColors.black} width={30} height={30}/>}
                icon={<ProfileIcon color={ProjectColors.white} width={30} height={30}/>}
                setActive={setActive}
                active={active}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 'auto',
        height: 55,
        backgroundColor: ProjectColors.black,
        position: 'absolute',
        bottom: 24,
        left: 24,
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    tabContainer: {
        width: 40,
        height: 40,
        backgroundColor: ProjectColors.black,
        borderRadius: 30,
        padding: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    tabActiveContainer: {
        width: 'auto',
        height: 40,
        backgroundColor: ProjectColors.white,
        borderRadius: 30,
        padding: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingRight: 12,

    },
    tabText: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '600',
        color: ProjectColors.black,
        fontSize: 14,
        marginLeft: 6

    }
})
