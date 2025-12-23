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
import { DevPage } from './src/pages/dev/page';
import { ProfilePage } from './src/pages/profile/page';
import { Linking } from 'react-native';
import { useLanguageStore } from './src/feauters/text/use-translate';
import { notificationService } from './src/feauters/notifications/notification-service';

const Stack = createNativeStackNavigator();

export default function App() {
  const [hideTabBar, setHideTabBar] = React.useState(false);
  const [currentRoute, setCurrentRoute] = React.useState('Home');
  const navigationRef = React.useRef(null);
  const hideBarPages = ['Create', 'Test'];
  const loadLanguage = useLanguageStore((s) => s.loadLanguage);

  React.useEffect(() => {
    loadLanguage();
  }, []);

  React.useEffect(() => {
    const initNotifications = async () => {
      await notificationService.initialize();
      await notificationService.scheduleDailyTestReminder();
    };
    initNotifications();
  }, []);

  React.useEffect(() => {
    const handleUrl = (url: string) => {
      console.log('Full URL:', url);

      // Парсим URL и извлекаем параметр data
      const match = url.match(/[?&]data=([^&]+)/);
      const userData = match ? match[1] : null;

      if (userData) {
        try {
          const parsedUserData = JSON.parse(decodeURIComponent(userData));
          console.log('userData:', parsedUserData);
        } catch (error) {
          console.log('userData (raw):', userData);
        }
      }
    };

    const subscription = Linking.addEventListener('url', ({ url }) => {
      console.log('Opened via QR link:', url);
      handleUrl(url);
    });

    Linking.getInitialURL().then(url => {
      if (url) {
        console.log('Initial URL:', url);
        handleUrl(url);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);


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
          <Stack.Screen name="Dev" component={DevPage} />
        </Stack.Navigator>
      </Layout>
    </NavigationContainer>
  );
}
