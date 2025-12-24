import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View } from "react-native"
import { Text } from "../../feauters/text";
import { ProjectColors } from "../../../assets/colors";
import { Button } from "../../feauters/button";
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useAppStore } from "../../hooks/store";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../main/components/links-block";
import { useState } from "react";


export const RegistrationPage = () => {
    const importUserData = useAppStore((s) => s.importUserData);
    const userData = useAppStore((s) => s.userData);
    const setUserData = useAppStore((s) => s.setUserData);

    const navigation = useNavigation<NavigationProp>();
    const [inputData, setInputData] = useState('');

    const requestStoragePermission = async () => {
        if (Platform.OS === 'android') {
            const permission = Platform.Version >= 33
                ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
                : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;

            const result = await request(permission);
            return result === RESULTS.GRANTED || result === RESULTS.LIMITED;
        }
        return true;
    };


    const handleImport = async () => {
        if (inputData !== '') {
            await setUserData({
                name: inputData,
                xp: 0,
                ball: 0,
                data: new Date().toLocaleDateString("ru-RU"),
                history: [],
                ephir: 0,
                targets: undefined,
                prizes: undefined,
                coin: 0,
                defCupon: 0,
                cupon: 0
            });
            navigation.navigate('Home')
        }else {
            try {
                const hasPermission = await requestStoragePermission();
                if (!hasPermission) {
                    // setModalMessage('Storage permission is required to import data');
                    // Alert.alert('Permission Denied', 'Storage permission is required to import data');
                    return;
                }

                await importUserData().then(() => navigation.navigate('Home'));
                // setModalMessage('Data imported successfully');
                // Alert.alert('Success', 'Data imported successfully');
            } catch (error) {
                if (error instanceof Error && error.message !== 'User cancelled file picker') {
                    // setModalMessage('Failed to import data');
                    // Alert.alert('Error', 'Failed to import data');
                    console.error(error);
                }
            }
        }
    };
    return (
    <View style={styles.container}>
        <View style={styles.wrapper}>
            <Text style={styles.title}>{'Register or import data'}</Text>
            <KeyboardAvoidingView
                style={{ width: '100%'}}
                behavior={Platform.OS === "ios" ? "padding" : "padding"}
                keyboardVerticalOffset={0}
            >
                <View style={{ width: '100%', justifyContent: "center" }}>
                    <TextInput
                        style={styles.input}
                        // value={currentValue}
                        onChangeText={(text) => setInputData(text)}
                        placeholder={'Name...'}
                        placeholderTextColor={ProjectColors.darkGrey}
                        cursorColor={ProjectColors.black}
                    />
                </View>
                <Button title={inputData === '' ? 'import' : 'create'} onClick={handleImport} containerStyle={{marginTop: 12}}/>
            </KeyboardAvoidingView>
        </View>
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
    wrapper: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 52
    },
    title: {
        fontFamily: 'StackSansTextVariableFont',
        fontSize: 42,
        fontWeight: 600,
        marginBottom: 24
    },
    input: {
        width: '100%',
        height: 75,
        borderWidth: 2,
        borderColor: ProjectColors.black,
        borderRadius: 25,
        paddingHorizontal: 12,
        color: ProjectColors.black
    }
});