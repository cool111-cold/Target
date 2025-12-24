import { ScrollView, StyleSheet, View, Alert, Platform } from "react-native"
import { Button } from "../../feauters/button";
import { useAppStore } from "../../hooks/store";
import { QrCode } from "./components/scaner";
import { useLanguageStore } from "../../feauters/text/use-translate";
import { Text } from "../../feauters/text";
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useState } from "react";
import { Modal } from "../../feauters/modal";

export const DevPage = () => {
    const [modalMessage, setModalMessage] = useState('');
    const userData = useAppStore((s) => s.userData);
    const setUserData = useAppStore((s) => s.setUserData);
    const updateUserData = useAppStore((s) => s.updateUserData);
    const clearData = useAppStore((s) => s.clearUserData);
    const exportUserData = useAppStore((s) => s.exportUserData);
    const importUserData = useAppStore((s) => s.importUserData);

    const currentLanguage = useLanguageStore((s) => s.currentLanguage);
    const setLanguage = useLanguageStore((s) => s.setLanguage);

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

    const handleExport = async () => {
        try {
            const hasPermission = await requestStoragePermission();
            if (!hasPermission) {
                setModalMessage('Storage permission is required to export data');
                // Alert.alert('Permission Denied', 'Storage permission is required to export data');
                return;
            }

            const filePath = await exportUserData();
            setModalMessage(`Data exported to: ${filePath}`);
            // Alert.alert('Success', `Data exported to: ${filePath}`);
        } catch (error) {
            setModalMessage('Failed to export data');
            // Alert.alert('Error', 'Failed to export data');
            console.error(error);
        }
    };

    const handleImport = async () => {
        try {
            const hasPermission = await requestStoragePermission();
            if (!hasPermission) {
                setModalMessage('Storage permission is required to import data');
                // Alert.alert('Permission Denied', 'Storage permission is required to import data');
                return;
            }

            await importUserData();
            setModalMessage('Data imported successfully');
            // Alert.alert('Success', 'Data imported successfully');
        } catch (error) {
            if (error instanceof Error && error.message !== 'User cancelled file picker') {
              setModalMessage('Failed to import data');
                // Alert.alert('Error', 'Failed to import data');
                console.error(error);
            }
        }
    };

    // if (!__DEV__) {
    //   return <View style={styles.container} />
    // }

    return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <QrCode userData={userData} />

        <Text style={styles.sectionTitle}>{'one'}</Text>
        <View style={styles.languageContainer}>
          <Button
            title="Русский"
            onClick={() => setLanguage('ru')}
            containerStyle={[
              styles.languageButton,
              currentLanguage === 'ru' && styles.activeLanguageButton
            ]}
          />
          <Button
            title="English"
            onClick={() => setLanguage('eng')}
            containerStyle={[
              styles.languageButton,
              currentLanguage === 'eng' && styles.activeLanguageButton
            ]}
          />
        </View>

        <Text style={styles.sectionTitle}>Dev Tools {userData?.name}</Text>
        <Button title="get 100 ephir" onClick={() => setUserData({...userData, ephir: 100})} containerStyle={{marginTop: 12}}/>
        <Button title="reset test" onClick={() => updateUserData({lastTestDate: '2025-01-01'})} containerStyle={{marginTop: 12}}/>
        <Button title="reset gift" onClick={() => setUserData({...userData, lastGiftDate: '2025-01-01'})} containerStyle={{marginTop: 12}}/>
        <Button title="5000 coin" onClick={() => setUserData({...userData, coin: 5000})} containerStyle={{marginTop: 12}}/>
        <Button title="1000 exp" onClick={() => setUserData({...userData, xp: 1000})} containerStyle={{marginTop: 12}}/>
        <Button title="DEL ALL" onClick={() => clearData()} containerStyle={{marginTop: 12}}/>

        <Text style={styles.sectionTitle}>Data Management</Text>
        <Button title="Export Data" onClick={handleExport} containerStyle={{marginTop: 12}}/>
        <Button title="Import Data" onClick={handleImport} containerStyle={{marginTop: 12, marginBottom: 100}}/>
      </ScrollView>
      <Modal
        visible={modalMessage !== ''}
        title="And"
        message={modalMessage}
        buttonTitle={'ok'}
        onClose={() => setModalMessage('')}
      />
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
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 24,
      marginBottom: 12,
      color: '#333',
    },
    languageContainer: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 12,
    },
    languageButton: {
      flex: 1,
      marginTop: 0,
    },
    activeLanguageButton: {
      backgroundColor: '#4CAF50',
    },
});