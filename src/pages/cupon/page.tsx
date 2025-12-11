import { ScrollView, StyleSheet, View } from "react-native"
import { Button } from "../../feauters/button";
import { useAppStore } from "../../hooks/store";

export const CuponPage = () => {
    const userData = useAppStore((s) => s.userData);
    const setUserData = useAppStore((s) => s.setUserData);
    return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Button title="get 100 ephir" onClick={() => setUserData({...userData, ephir: 100})} containerStyle={{marginTop: 42}}/>
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