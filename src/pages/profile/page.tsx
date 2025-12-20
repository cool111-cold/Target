import { ScrollView, StyleSheet, View } from "react-native"
import { Button } from "../../feauters/button";
import { useAppStore } from "../../hooks/store";
import { QrCode } from "./components/scaner";
import { useLanguageStore } from "../../feauters/text/use-translate";
import { Text } from "../../feauters/text";

export const ProfilePage = () => {
    const userData = useAppStore((s) => s.userData);
    const setUserData = useAppStore((s) => s.setUserData);
    const updateUserData = useAppStore((s) => s.updateUserData);
    const clearData = useAppStore((s) => s.clearUserData);

    const currentLanguage = useLanguageStore((s) => s.currentLanguage);
    const setLanguage = useLanguageStore((s) => s.setLanguage);

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

        <Text style={styles.sectionTitle}>Dev Tools</Text>
        <Button title="get 100 ephir" onClick={() => setUserData({...userData, ephir: 100})} containerStyle={{marginTop: 12}}/>
        <Button title="reset test" onClick={() => updateUserData({lastTestDate: '2025-01-01'})} containerStyle={{marginTop: 12}}/>
        <Button title="reset gift" onClick={() => setUserData({...userData, lastGiftDate: '2025-01-01'})} containerStyle={{marginTop: 12}}/>
        <Button title="5000 coin" onClick={() => setUserData({...userData, coin: 5000})} containerStyle={{marginTop: 12}}/>
        <Button title="1000 exp" onClick={() => setUserData({...userData, xp: 1000})} containerStyle={{marginTop: 12}}/>
        <Button title="DEL ALL" onClick={() => clearData()} containerStyle={{marginTop: 12}}/>
      </ScrollView>
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