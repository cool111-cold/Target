import { Button, StyleSheet, Text, View } from "react-native"
import { ProgressBar } from "./сomponents/progress-bar";
import { Question } from "./сomponents/question";
import { useState } from "react";
import { TargenCreateTypeButton } from "../target/components/create-type-button";
import { TargetCreateNameInput } from "../target/components/create-name-input";
import { TargetBallPicker } from "../target/components/create-ball";
import { useAppStore } from "../../hooks/store";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../main/components/links-block";

// Вместо готового компонента передаём функцию, которая принимает onValueChange
const TestData = [
    {
        title: 'Type',
        message: 'Select the target type',
        id: 0,
        Component: TargenCreateTypeButton
    },
    {
        title: 'Name',
        message: 'Write the name of your target',
        id: 1,
        Component: TargetCreateNameInput,
    },
    {
        title: 'Price',
        message: 'Specify the target price',
        id: 2,
        Component: TargetBallPicker,
    },
]

export const CreatePage = () => {
    const [currentLabel, setCurrentLabel] = useState(0);
    // Сохраняем ответы: { questionId: number, value: any }[]
    const [answers, setAnswers] = useState<Array<{ questionId: number, value: any }>>([]);

    const handleSelectAnswer = (questionId: number, value: any) => {
        // Обновляем или добавляем ответ для данного вопроса
        setAnswers(prev => {
            const existingIndex = prev.findIndex(a => a.questionId === questionId);
            if (existingIndex >= 0) {
                // Если ответ уже есть, обновляем его
                const updated = [...prev];
                updated[existingIndex] = { questionId, value };
                return updated;
            } else {
                // Добавляем новый ответ
                return [...prev, { questionId, value }];
            }
        });
    };

    const userData = useAppStore((s) => s.userData);

    const setUserData = useAppStore((s) => s.setUserData);

    const navigation = useNavigation<NavigationProp>();

    const handleNext = () => {
        if (TestData[currentLabel].id === TestData.length - 1) {
            // Это был последний вопрос - выводим все ответы
            console.log('Все ответы:', answers);
            // Можно также вывести в более читаемом виде:
            answers.forEach(answer => {
                console.log(`Вопрос ${answer.questionId}: выбран вариант ${answer.value}`);
            });
            // @ts-ignore
            // setUserData({
            //     ...userData,
            //     // @ts-ignore
            //     targets: [...userData?.targets, {
            //         name: answers[1].value,
            //         ball: answers[2].value,
            //         ephir: 0,
            //         data: '12.10.2025',
            //         type: answers[0].value,
            //         color: 0
            //     }]
            // })
            setUserData({
                xp: (userData?.xp ?? 0),
                ball: (userData?.ball ?? 0),
                ephir: (userData?.ephir ?? 0),
                data: userData?.data ?? new Date().toLocaleDateString("ru-RU").toString(),
                history: userData?.history ?? [],
                targets: [
                    ...(userData?.targets ?? []),
                    {
                      name: answers[1].value,
                      data: new Date().toLocaleDateString("ru-RU").toString(),
                      ball: answers[2].value,
                      type: answers[0].value,
                      color: 0,
                      ephir: 0
                    }
                  ]
            });

            navigation.navigate('Target')
        } else {
            setCurrentLabel((e) => e + 1);
        }
    };

    // name: string;
    // ball: number;
    // ephir: number;
    // data: string;
    // type: 'Daily' | 'Disposable'
    // color: number;

    return (
    <View style={styles.container}>
      <ProgressBar labels={TestData} currentLabel={currentLabel}/>
      <Question
        item={TestData[currentLabel]}
        isLast={TestData[currentLabel].id === TestData.length - 1}
        nextLabel={handleNext}
        prevLabel={() => setCurrentLabel((e) => e-=1)}
        onValueChange={handleSelectAnswer}
        currentValue={answers.find(a => a.questionId === TestData[currentLabel].id)?.value}
        
    />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#DFDEDA',
      paddingTop: 42,
      paddingBottom: 12,
      paddingHorizontal: 24,
    },
});