import notifee, { AuthorizationStatus, TimestampTrigger, TriggerType, RepeatFrequency } from '@notifee/react-native';
import { translate as t } from '../text/use-translate';

class NotificationService {
  private channelId = 'test-reminder-channel';

  async initialize() {
    await this.createChannel();
    await this.requestPermissions();
  }

  private async createChannel() {
    await notifee.createChannel({
      id: this.channelId,
      name: 'Напоминания о тесте',
      sound: 'default',
      importance: 4, 
    });
  }

  async requestPermissions(): Promise<boolean> {
    const settings = await notifee.requestPermission();
    return settings.authorizationStatus === AuthorizationStatus.AUTHORIZED;
  }

  async scheduleDailyTestReminder() {
    await this.cancelAllNotifications();

    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(21, 0, 0, 0);

    if (now.getTime() >= scheduledTime.getTime()) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: scheduledTime.getTime(),
      repeatFrequency: RepeatFrequency.DAILY,
    };

    await notifee.createTriggerNotification(
      {
        id: 'daily-test-reminder',
        title: t('timeToTest'),
        body: t('timeToTestMessage'),
        android: {
          channelId: this.channelId,
          pressAction: {
            id: 'default',
            launchActivity: 'default',
          },
        },
        ios: {
          sound: 'default',
        },
      },
      trigger
    );
  }

  async cancelAllNotifications() {
    await notifee.cancelAllNotifications();
  }

  async getTriggerNotifications() {
    return await notifee.getTriggerNotifications();
  }
}

export const notificationService = new NotificationService();
