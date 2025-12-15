import { ScrollView, StyleSheet, View } from "react-native"


export const CuponPage = () => {
    return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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