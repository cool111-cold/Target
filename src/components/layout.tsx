import { View, StyleSheet } from 'react-native';
import { TabBar } from '../pages/main/components/tab-bar';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <View style={styles.container}>
      {children}
      <TabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
