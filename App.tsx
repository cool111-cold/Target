import { MainPage } from './src/pages/main/page';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TargetPage } from './src/pages/target/page';
import { Layout } from './src/components/layout';
import { CuponPage } from './src/pages/cupon/page';
import { PrizePage } from './src/pages/prize/page';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Layout>
        <Stack.Navigator screenOptions={{ 
          headerShown: false,
          animation: 'fade'
        }}>
          <Stack.Screen name="Home" component={MainPage} />
          <Stack.Screen name="Target" component={TargetPage} />
          <Stack.Screen name="Cupons" component={CuponPage} />
          <Stack.Screen name="Prize" component={PrizePage} />
        </Stack.Navigator>
      </Layout>
    </NavigationContainer>
  );
}
