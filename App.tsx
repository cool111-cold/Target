import { MainPage } from './src/pages/main/page';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TargetPage } from './src/pages/target/page';
import { Layout } from './src/components/layout';
import { CuponPage } from './src/pages/cupon/page';
import { PrizePage } from './src/pages/prize/page';
import { CreatePage } from './src/pages/create/page';
import { TestPage } from './src/pages/test/page';
import { ProfilePage } from './src/pages/profile/page';

const Stack = createNativeStackNavigator();

export default function App() {
  const [hideTabBar, setHideTabBar] = React.useState(false);
  const [currentRoute, setCurrentRoute] = React.useState('Home');
  const navigationRef = React.useRef(null);
  const hideBarPages = ['Create', 'Test']
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => {
        // @ts-ignore
        const route = navigationRef.current?.getCurrentRoute();
        setHideTabBar(hideBarPages.includes(route?.name))
        setCurrentRoute(route?.name || 'Home')
      }}
    >
      <Layout hide={hideTabBar} currentRoute={currentRoute}>
        <Stack.Navigator screenOptions={{
          headerShown: false,
          animation: 'fade'
        }}>
          <Stack.Screen name="Home" component={MainPage} />
          <Stack.Screen name="Target" component={TargetPage} />
          <Stack.Screen name="Cupons" component={CuponPage} />
          <Stack.Screen name="Prize" component={PrizePage} />
          <Stack.Screen name="Create" component={CreatePage} />
          <Stack.Screen name="Test" component={TestPage} />
          <Stack.Screen name="Profile" component={ProfilePage} />
        </Stack.Navigator>
      </Layout>
    </NavigationContainer>
  );
}
