import { ScrollView, StyleSheet, Text, View } from "react-native"
import { Button } from "../../feauters/button";
import { useAppStore } from "../../hooks/store";

export const CuponPage = () => {
    const userData = useAppStore((s) => s.userData);
    const setUserData = useAppStore((s) => s.setUserData);
    const updateUserData = useAppStore((s) => s.updateUserData);
    const clearData = useAppStore((s) => s.clearUserData)

    return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{marginTop: 42}}>{`coin: ${userData?.coin} | def cupon: ${userData?.defCupon} | cupon: ${userData?.cupon}`}</Text>
        <Button title="get 100 ephir" onClick={() => setUserData({...userData, ephir: 100})} containerStyle={{marginTop: 42}}/>
        <Button title="reset test" onClick={() => updateUserData({lastTestDate: '2025-01-01'})} containerStyle={{marginTop: 42}}/>
        <Button title="reset gift" onClick={() => setUserData({...userData, lastGiftDate: '2025-01-01'})} containerStyle={{marginTop: 42}}/>
        <Button title="DEL ALL" onClick={() => clearData()} containerStyle={{marginTop: 42}}/>
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
});