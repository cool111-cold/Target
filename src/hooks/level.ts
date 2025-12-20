import { useRandomGift } from "./use-random-gift"

interface XpNextLevelProps {
    lvl: number
}

export const getXpNextLevel = ({lvl}: XpNextLevelProps) => {
    return 100 + ((lvl-1) * 10)
}

export const getGiftForLvl = ({lvl}: XpNextLevelProps) => {
    if (lvl < 10) {
        return useRandomGift({type: 'daily', localRevards: [
            { name: "1", chance: 89 },
            { name: "2", chance: 10 },
            { name: "3", chance: 1 },
        ]})[0]
    }
    if (lvl < 50) {
        return useRandomGift({type: 'daily', localRevards: [
            { name: "1", chance: 50 },
            { name: "2", chance: 40 },
            { name: "3", chance: 10 },
        ]})[0]
    }
    if (lvl < 100) {
        return useRandomGift({type: 'daily', localRevards: [
            { name: "1", chance: 50 },
            { name: "2", chance: 25 },
            { name: "3", chance: 25 },
        ]})[0]
    }
    if (lvl < 1000) {
        return useRandomGift({type: 'daily', localRevards: [
            { name: "1", chance: 25 },
            { name: "2", chance: 25 },
            { name: "3", chance: 50 },
        ]})[0]
    }
    if (lvl >= 1000) {
        return useRandomGift({type: 'daily', localRevards: [
            { name: "1", chance: 0 },
            { name: "2", chance: 0 },
            { name: "3", chance: 100 },
        ]})[0]
    }
}

