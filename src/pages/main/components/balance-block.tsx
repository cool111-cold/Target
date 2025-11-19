import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Animated as Animateds } from 'react-native';


export const BalanceBlock = ({isClick, setIsClick}: BalanceProps) => {

//   const [hasGift, setHasGift] = useState(true);
//   // const [isClick, setIsClick] = useState(false);
  
//   const slideAnim = useRef(new Animateds.Value(hasGift ? 0 : -120)).current;
//   useEffect(() => {
//     Animateds.timing(slideAnim, {
//       toValue: isClick ? 0 : -120,  // куда едет
//       duration: 300,                // скорость
//       useNativeDriver: true,        // обязательно
//     }).start();
//   }, [isClick]);
  


//   return (
//     <View>
//       <View style={styles.balanceBlockWrapper}>
//         <TouchableOpacity onPress={() => { if (hasGift) { setIsClick((e: any) => !e) } } }>
//           <View style={styles.balanceContent}>
//             {hasGift && <View style={styles.redPoint} />}
//             <View style={styles.giftBlock}>
//               {hasGift ? <CloseGift /> : <OpenGift />}
//             </View>
            
//             <Text style={styles.balanceText}>32</Text>
//             <Text style={styles.balanceMiniText}>4 days / 1 lvl</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//       <Animateds.View
//         style={[
//           styles.takeGiftBlock,
//           { transform: [{ translateY: slideAnim }], height: isClick ? 75 : 0, marginBottom: isClick ? 12 : 0}
//         ]}
//       > 
//       <Gift />
//       <Gift />
//       <Gift />
//       </Animateds.View>
//     </View>
  );
};