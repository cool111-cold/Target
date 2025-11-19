import { Pressable, StyleSheet, Text, View } from "react-native"
import { ProjectColors } from "../../../../assets/colors";
import { InfoIcon } from "../../../../assets/icons";
import { useState } from "react";
import { Modal } from "../../../feauters/modal";

export const Ephir = () => {

    const [isModal, setIsModal] = useState(false);

    const handlePress = () => {
        setIsModal(true);
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={{position: 'absolute', right: 0, top: 8, zIndex: 10}}
                onPress={handlePress}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <View pointerEvents="none">
                    <InfoIcon width={25} height={25}/>
                </View>
            </Pressable>
            <Text style={styles.text}>Ethereum</Text>
            <Text style={styles.textValue}>0</Text>

            <Modal title="Ethereum" message="Ethereum is needed to increase the number of points received for completing goals." buttonTitle="Great!" onClose={() => setIsModal(false)} visible={isModal} />
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
        color: ProjectColors.purple
    }
});