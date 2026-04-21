import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { ProjectColors } from '../../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

const FRAME_COUNT = 10;
const DISPLAY_SIZE = 192;
const SHEET_WIDTH = FRAME_COUNT * DISPLAY_SIZE;
const VIEWPORT_SIZE = DISPLAY_SIZE - 2;

const STAT_MAX = 100;
const REFILL_AMOUNT = 20;

const IC = 18;
const IC_OPACITY = 0.75;

const HeartIcon = () => (
  <Svg width={IC} height={IC} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 21C12 21 3 14.5 3 8.5C3 5.9 5 4 7.5 4C9.2 4 10.7 5 12 6.5C13.3 5 14.8 4 16.5 4C19 4 21 5.9 21 8.5C21 14.5 12 21 12 21Z"
      fill={ProjectColors.black}
      opacity={IC_OPACITY}
    />
  </Svg>
);

const FoodIcon = () => (
  <Svg width={IC} height={IC} viewBox="0 0 24 24" fill="none">
    <Path d="M9 3V10C9 11.7 10.3 13 12 13C13.7 13 15 11.7 15 10V3" stroke={ProjectColors.black} strokeWidth={1.8} strokeLinecap="round" opacity={IC_OPACITY} />
    <Path d="M12 13V21" stroke={ProjectColors.black} strokeWidth={1.8} strokeLinecap="round" opacity={IC_OPACITY} />
  </Svg>
);

const DropIcon = () => (
  <Svg width={IC} height={IC} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3L5.5 12.5C5.5 16.6 8.4 20 12 20C15.6 20 18.5 16.6 18.5 12.5L12 3Z"
      fill={ProjectColors.black}
      opacity={IC_OPACITY}
    />
  </Svg>
);

const SmileIcon = () => (
  <Svg width={IC} height={IC} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={9} stroke={ProjectColors.black} strokeWidth={1.8} opacity={IC_OPACITY} />
    <Path d="M8 14.5C8.8 15.9 10.3 17 12 17C13.7 17 15.2 15.9 16 14.5" stroke={ProjectColors.black} strokeWidth={1.8} strokeLinecap="round" opacity={IC_OPACITY} />
    <Circle cx={9} cy={10.5} r={1.2} fill={ProjectColors.black} opacity={IC_OPACITY} />
    <Circle cx={15} cy={10.5} r={1.2} fill={ProjectColors.black} opacity={IC_OPACITY} />
  </Svg>
);

const STATS_CONFIG = [
  { key: 'health',    Icon: HeartIcon },
  { key: 'food',      Icon: FoodIcon  },
  { key: 'water',     Icon: DropIcon  },
  { key: 'happiness', Icon: SmileIcon },
] as const;

type StatKey = typeof STATS_CONFIG[number]['key'];

export const PixelCat = () => {
  const translateX = useRef(new Animated.Value(-1)).current;
  const [stats, setStats] = useState<Record<StatKey, number>>({
    health: 80,
    food: 60,
    water: 40,
    happiness: 70,
  });

  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame = (frame + 1) % FRAME_COUNT;
      translateX.setValue(-(frame * DISPLAY_SIZE) - 1);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const refill = (key: StatKey) => {
    setStats(prev => ({
      ...prev,
      [key]: Math.min(STAT_MAX, prev[key] + REFILL_AMOUNT),
    }));
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.catContainer}>
        <View style={styles.viewport}>
          <Animated.Image
            source={require('../../assets/img/Idle6x.png')}
            style={[styles.sheet, { transform: [{ translateX }] }]}
            resizeMode="stretch"
          />
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.statsGrid}>
          {STATS_CONFIG.map(({ key, Icon }) => {
            const pct = stats[key];
            return (
              <View key={key} style={styles.statCell}>
                <View style={styles.statCellTop}>
                  <Icon />
                  <Text style={styles.statPct}>{pct}%</Text>
                </View>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${pct}%` as any }]} />
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.actionsRow}>
          {STATS_CONFIG.map(({ key, Icon }) => (
            <TouchableOpacity
              key={key}
              style={styles.actionBtn}
              onPress={() => refill(key)}
              activeOpacity={0.7}
            >
              <Icon />
              <Text style={styles.plusText}>x5</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    // paddingTop: 12,
  },
  catContainer: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    paddingLeft: SCREEN_WIDTH / 6,
    alignSelf: 'center',
  },
  viewport: {
    width: VIEWPORT_SIZE,
    height: DISPLAY_SIZE,
    overflow: 'hidden',
  },
  sheet: {
    width: SHEET_WIDTH,
    height: DISPLAY_SIZE,
  },
  card: {
    // backgroundColor: ProjectColors.black,
    borderRadius: 24,
    // padding: 20,
    marginTop: 12,
    gap: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statCell: {
    flex: 1,
    minWidth: '40%',
    gap: 8,
  },
  statCellTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barTrack: {
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(106, 106, 106, 0.1)',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: 'rgba(30, 30, 30, 0.65)',
  },
  statPct: {
    fontFamily: 'StackSansTextVariableFont',
    fontWeight: '600',
    fontSize: 12,
    color: ProjectColors.black,
    opacity: 0.4,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    width: '23%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: 'rgba(106, 106, 106, 0.1)',
    gap: 2,
  },
  plusText: {
    fontFamily: 'StackSansTextVariableFont',
    fontWeight: '700',
    fontSize: 11,
    color: ProjectColors.black,
    opacity: 0.3,
  },
});
