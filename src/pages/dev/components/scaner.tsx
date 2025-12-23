import React from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { ProjectColors } from '../../../../assets/colors';

interface QrCodeProps {
  userData: any;
}

export const QrCode = ({ userData }: QrCodeProps) => {
  const userDataString = JSON.stringify({});
  const qrValue = `targets://open?data=${encodeURIComponent(userDataString)}`;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 52 }}>
      <QRCode
        value={qrValue}
        size={200}
        color="black"
        backgroundColor={ProjectColors.white}
        />
    </View>
  );
}
