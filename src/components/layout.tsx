import { View, StyleSheet } from 'react-native';
import { TabBar } from '../pages/main/components/tab-bar';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  hide?: boolean;
}

export const Layout = ({ children, hide }: LayoutProps) => {
  return (
    <View style={styles.container}>
      {children}
      {!hide && <TabBar />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
