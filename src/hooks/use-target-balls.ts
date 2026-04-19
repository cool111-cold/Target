import { useMemo } from 'react';
import { DIFFICULTY_IDS } from '../pages/target/components/create-difficulty-button';
import { TARGET_TYPE_IDS } from '../pages/target/components/create-type-button';

const RULES = {
    [TARGET_TYPE_IDS.DAILY]: {
        balls: [1,2,3,4],
        streak: 100,
        bonus: 1.5,
        bonusChance: 0.05
    },
    [TARGET_TYPE_IDS.REMINDER]: {
        balls: [1,2,4,5],
        streak: 7,
        bonus: 1.5,
        bonusChance: 0.2
    },
    [TARGET_TYPE_IDS.ONE_TIME]: {
        balls: [2,4,6,8],
        streak: 7,
        bonus: 1.5,
        bonusChance: 0.5
    },
    [TARGET_TYPE_IDS.PROGRESSIVE]: {
        balls: [2,4,8,10],
        streak: 7,
        bonus: 2,
        bonusChance: 0.5
    },
    [TARGET_TYPE_IDS.DURATION]: {
        balls: [3,6,10,15],
        streak: 7,
        bonus: 2,
        bonusChance: 0.05
    },
    [TARGET_TYPE_IDS.BIG_GOAL]: {
        balls: [10, 25, 50, 100],
        streak: 1,
        bonus: 1.5,
        bonusChance: 0.05
    }
}

function parseDateRu(dateStr: string): Date | null {
    const parts = dateStr?.split('.');
    if (!parts || parts.length !== 3) return null;
    const [d, m, y] = parts.map(Number);
    if (isNaN(d) || isNaN(m) || isNaN(y)) return null;
    return new Date(y, m - 1, d);
}

export const useTargetBalls = (
    type: number,
    difficulty: number | string | undefined,
    createdAt: string
): number => {
    return useMemo(() => {
        const rule = RULES[type as keyof typeof RULES];
        if (!rule) return 0;

        const diffNum = typeof difficulty === 'string' ? parseInt(difficulty) : (difficulty ?? DIFFICULTY_IDS.EASY);
        const base = rule.balls[diffNum] ?? rule.balls[0];

        const created = parseDateRu(createdAt);
        const daysSince = created
            ? Math.max(0, Math.floor((Date.now() - created.getTime()) / 86_400_000))
            : 0;
        const streakBonus = Math.floor(daysSince / rule.streak);

        const total = base + streakBonus;

        return Math.random() < rule.bonusChance
            ? Math.round(total * rule.bonus)
            : total;
    }, [type, difficulty, createdAt]);
};
