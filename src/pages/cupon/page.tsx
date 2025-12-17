import { FlatList, StyleSheet, View, Dimensions, Text } from "react-native"
import { CalendarBlock } from "../main/components/calendar";
import { ProjectColors } from "../../../assets/colors";
import { CuponIcon } from "../../../assets/icons";
import React, { useState, useRef, use } from "react";
import { Button } from "../../feauters/button";
import { useAppStore } from "../../hooks/store";
import { Modal } from "../../feauters/modal";

const { width } = Dimensions.get('window');
const SLIDE_WIDTH = width - 48;

interface slides {
  id: string,
  title: string,
  coll: number,
  message: string,
  prize: number,
  color: string,
  name?: string
}

interface Prop {
  item: slides;
}

const slides: slides[] = [
  { 
    id: '0',
    title: 'Default Cupon',
    coll: 0,
    message: 'With it you can buy any daily prize without losing balls',
    prize: 500,
    name: 'defCupon',
    color: ProjectColors.black
  },
  {
    id: '1',
    title: 'Cupon',
    coll: 0,
    message: 'With it you can buy ANY prize without losing points',
    prize: 1000,
    name: 'cupon',
    color: ProjectColors.purple
  },
  {
    id: '2',
    title: 'Randommm',
    coll: 0,
    message: 'You get one of the coupons, but you might not get anything',
    prize: 300,
    color: ProjectColors.orange
  }
];

const ShopContainer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [prizeResult, setPrizeResult] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);

  const userData = useAppStore((s) => s.userData);
  const addHistoryItem = useAppStore((s) => s.addHistoryItem);
  const setUserData = useAppStore((s) => s.setUserData);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;


  const renderSlide = ({item}: Prop) => {

    const handleUseCupon = () => {
      if (userData[item.name] > 0 && userData) {
        // console.log(userData[item.name])
        setUserData({
          ...userData,
          [item.name]: userData[item.name] - 1
        })
        addHistoryItem({
          name: item.title,
          date: new Date().toLocaleDateString("ru-RU").toString(),
          price: 1,
          type: 'cupon'
        });
      }
    }

    const handleBuyCupon = () => {
      if (userData?.coin >= item.prize && userData) {
        if (item.name) {
          setUserData({
            ...userData,
            [item.name]: userData[item.name] + 1,
            coin: userData.coin - item.prize
          })
        } else {
          // Случайный купон: массив возможных призов + null (ничего)
          const prizes = ['defCupon', 'cupon', null, null, null, null, null, null];
          const randomIndex = Math.floor(Math.random() * prizes.length);
          const prize = prizes[randomIndex];

          if (prize) {
            setUserData({
              ...userData,
              [prize]: userData[prize] + 1,
              coin: userData.coin - item.prize
            })
            setPrizeResult(`You got: ${prize === 'defCupon' ? 'Default Cupon' : 'Cupon'}!`);
          } else {
            setUserData({
              ...userData,
              coin: userData.coin - item.prize
            })
            setPrizeResult('Unfortunately, you didn get anything.');
          }

          setModalOpen(true);
        }

      }
    }

    return (
    <View style={{width: SLIDE_WIDTH, height: 500, backgroundColor: ProjectColors.lightGrey, borderRadius: 16, marginHorizontal: 0, overflow: 'hidden', borderWidth: 3, borderColor: item.color}}>
      <View style={{flex: 1, padding: 24}}>
        <Text style={[styles.title, {color: item.color}]}>{`${item.title} ${userData[item.name] ? `x${userData[item.name]}` : ''}`}</Text>
        <View style={{flex: 1, marginTop: 16, justifyContent: 'space-between'}}>
          <Text style={styles.message}>{item.message}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12}}>
            <Text style={[styles.prize, {color: item.color}]}>{`${userData?.coin ?? 0} / ${item.prize}`}</Text>
            <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
              <Button title="BUY" onClick={handleBuyCupon} containerStyle={{width: 65, backgroundColor: ProjectColors.lightGrey, borderWidth: 2, borderColor: ProjectColors.black}} textStyle={{color: ProjectColors.black}}/>
              {item.name && <Button title="USE" onClick={handleUseCupon} containerStyle={{width: 65}} />}
            </View>
          </View>
        </View>
      </View>
    </View>
    )
  };

  return(
  <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: '25%'}}>
    <FlatList
      ref={flatListRef}
      data={slides}
      renderItem={renderSlide}
      keyExtractor={(item) => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      snapToAlignment="center"
      decelerationRate="fast"
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      contentContainerStyle={{gap: 16}}
    />
    <View style={{marginTop: 0, gap: 6, flexDirection: 'row'}}>
      {slides.map((_, index) => (
        <View key={index} style={{
          width: 10,
          height: 10,
          backgroundColor: currentIndex === index ? ProjectColors.black : ProjectColors.darkGrey,
          borderRadius: 50,
          opacity: currentIndex === index ? 1 : 0.5
        }} />
      ))}
    </View>
    <Modal
        visible={modalOpen}
        title="Result"
        message={prizeResult || "Confirm the use of the coupon"}
        buttonTitle="OK"
        onClose={() => {
          setModalOpen(false);
          setPrizeResult(null);
        }}
      />
  </View>
  )
}

export const CuponPage = () => {
    return (
    <View style={styles.container}>
        <CalendarBlock />
        <View style={{width: '100%', height: '80%', alignItems: 'center', justifyContent: 'center'}}>
          <ShopContainer />
        </View>
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
    title: {
      fontFamily: 'StackSansTextVariableFont',
      fontSize: 35,
      fontWeight: '700',
    },
    message: {
      fontFamily: 'StackSansTextVariableFont',
      fontSize: 18,
      fontWeight: '500',
    },
    prize: {
      fontFamily: 'StackSansTextVariableFont',
      fontSize: 28,
      fontWeight: '700',
    }
});