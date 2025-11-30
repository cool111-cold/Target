const Prize = {
    "1": {
        value: ['exp', 'ephir', 'coin'],
        coll: [5, 10, 20, 30]
    },
    "2": {
        value: ['ball', 'def cupon'],
        coll: [5, 7, 10]
    },
    "3": {
        value: ['cupon'],
        coll: [1]
    }
}

export const useRandomGift = () => {
    const type = 'daily';
    const rewards = [
        { name: "1", chance: type === 'daily' ? 95 : 79 },
        { name: "2", chance: type === 'daily' ? 5 : 20 },
        { name: "3", chance: type === 'daily' ? 0 : 1 },
    ];

    const total = rewards.reduce((sum, r) => sum + r.chance, 0);

    const getRandomRarity = () => {
        let rand = Math.random() * total;
        for (const reward of rewards) {
            rand -= reward.chance;
            if (rand <= 0) return reward.name;
        }
        return rewards[rewards.length - 1].name;
    };

    const getRandomItem = (rarity: '1' | '2' | '3') => {
        const data = Prize[rarity];

        const value = data.value[Math.floor(Math.random() * data.value.length)];
        const coll = data.coll[Math.floor(Math.random() * data.coll.length)];

        return { value, coll };
    };

    const result = [];
    for (let i = 0; i < 3; i++) {
        const rarity = getRandomRarity();
        // @ts-ignore
        result.push(getRandomItem(rarity));
    }

    return result;
};
