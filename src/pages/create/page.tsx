import { Button, StyleSheet, Text, View } from "react-native"
import { ProgressBar } from "./сomponents/progress-bar";
import { Question } from "./сomponents/question";
import { useState, useEffect } from "react";
import { TargenCreateTypeButton } from "../target/components/create-type-button";
import { TargetCreateNameInput } from "../target/components/create-name-input";
import { TargetBallPicker } from "../target/components/create-ball";
import { useAppStore } from "../../hooks/store";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NavigationProp } from "../main/components/links-block";

type RootStackParamList = {
    Create: { targetIndex?: number; targetData?: any, type?: 'target' | 'prize' } | undefined;
};

type CreatePageRouteProp = RouteProp<RootStackParamList, 'Create'>;

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
    const route = useRoute<CreatePageRouteProp>();
    const [currentLabel, setCurrentLabel] = useState(0);
    const [answers, setAnswers] = useState<Array<{ questionId: number, value: any }>>([]);

    const targetIndex = route.params?.targetIndex;
    const targetData = route.params?.targetData;
    const type = route.params?.type;
    const isEditMode = targetIndex !== undefined && targetData !== undefined;

    useEffect(() => {
        if (isEditMode && targetData) {
            setAnswers([
                { questionId: 0, value: targetData.type },
                { questionId: 1, value: targetData.name },
                { questionId: 2, value: targetData.ball },
            ]);
        }
    }, []);

    const handleSelectAnswer = (questionId: number, value: any) => {
        setAnswers(prev => {
            const existingIndex = prev.findIndex(a => a.questionId === questionId);
            if (existingIndex >= 0) {
                const updated = [...prev];
                updated[existingIndex] = { questionId, value };
                return updated;
            } else {
                return [...prev, { questionId, value }];
            }
        });
    };

    const addTarget = useAppStore((s) => s.addTarget);
    const updateTarget = useAppStore((s) => s.updateTarget);
    const removeTarget = useAppStore((s) => s.removeTarget);

    const addPrize = useAppStore((s) => s.addPrize);
    const updatePrize = useAppStore((s) => s.updatePrize);
    const removePrize = useAppStore((s) => s.removePrize);

    const navigation = useNavigation<NavigationProp>();

    const handleNext = () => {
        if (TestData[currentLabel].id === TestData.length - 1) {
            // Это был последний вопрос - выводим все ответы
            console.log('Все ответы:', answers);
            // Можно также вывести в более читаемом виде:
            answers.forEach(answer => {
                console.log(`Вопрос ${answer.questionId}: выбран вариант ${answer.value}`);
            });

            const targetPayload = {
                name: answers[1].value,
                data: new Date().toLocaleDateString("ru-RU").toString(),
                ball: answers[2].value,
                type: answers[0].value,
                color: targetData?.color || 0,
                ephir: targetData?.ephir || 0
            };

            if (isEditMode) {
                type === 'target' ? 
                updateTarget(targetIndex, targetPayload) 
                :
                updatePrize(targetIndex, targetPayload)
                
            } else {
                type === 'target' ? 
                addTarget(targetPayload) 
                :
                addPrize(targetPayload)
            }

            type === 'target' ? 
            navigation.replace('Target')
            :
            navigation.replace('Prize')

        } else {
            setCurrentLabel((e) => e + 1);
        }
    };

    const handleDelete = () => {
        if (isEditMode && targetIndex !== undefined) {
            type === 'target' ?
            removeTarget(targetIndex) :
            removePrize(targetIndex)

            type === 'target' ?
            navigation.replace('Target') :
            navigation.replace('Prize')
        }
    };

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
        isEditMode={isEditMode}
        onDelete={handleDelete}
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