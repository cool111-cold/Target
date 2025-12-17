import { View, StyleSheet } from 'react-native';
import { TabBar } from '../pages/main/components/tab-bar';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  hide?: boolean;
  currentRoute?: string;
}

export const Layout = ({ children, hide, currentRoute = 'Home' }: LayoutProps) => {
  return (
    <View style={styles.container}>
      {children}
      {!hide && <TabBar currentRoute={currentRoute} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
