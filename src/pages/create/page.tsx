import { StyleSheet, View } from "react-native"
import { ProgressBar } from "./сomponents/progress-bar";
import { Question } from "./сomponents/question";
import { useState, useEffect } from "react";
import { TargenCreateTypeButton } from "../target/components/create-type-button";
import { TargetCreateNameInput } from "../target/components/create-name-input";
import { TargetBallPicker } from "../target/components/create-ball";
import { TargetCreateNameDescriptionInput } from "../target/components/create-name-description-input";
import { TargetCreateDifficultyButton, DIFFICULTY_IDS } from "../target/components/create-difficulty-button";
import { TARGET_TYPE_IDS } from "../target/components/create-type-button";
import { TargetCreateDatePicker } from "../target/components/create-date-picker";
import { TargetCreateProgressiveGoalInput } from "../target/components/create-progressive-goal-input";
import { useAppStore } from "../../hooks/store";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NavigationProp } from "../main/components/links-block";
import { useTranslate as t } from "../../feauters/text/use-translate";
import { TargetCreateDateTimePicker } from "../target/components/create-date-time-picker";

type RootStackParamList = {
    Create: { targetIndex?: number; targetData?: any, type?: 'target' | 'prize' } | undefined;
};

type CreatePageRouteProp = RouteProp<RootStackParamList, 'Create'>;

export const CreatePage = () => {
    const route = useRoute<CreatePageRouteProp>();
    const [currentLabel, setCurrentLabel] = useState(0);
    const [answers, setAnswers] = useState<Array<{ questionId: number, value: any }>>([]);

    const targetIndex = route.params?.targetIndex;
    const targetData = route.params?.targetData;
    const type = route.params?.type;
    const isEditMode = targetIndex !== undefined && targetData !== undefined;

    const labelStepName = t('stepNameTitle');
    const labelStepNameMsg = t('stepTargetNameMessage');
    const labelStepType = t('stepTypeTitle');
    const labelStepTypeMsg = t('stepTargetTypeMessage');
    const labelStepDifficulty = t('stepDifficultyTitle');
    const labelStepDifficultyMsg = t('stepTargetDifficultyMessage');
    const labelStepDate = t('stepDateTitle');
    const labelStepDateMsg = t('stepDateMessage');
    const labelStepGoal = t('stepGoalTitle');
    const labelStepGoalMsg = t('stepGoalMessage');

    const selectedType = answers.find(a => a.questionId === 1)?.value;
    const isBigGoal = selectedType === TARGET_TYPE_IDS.BIG_GOAL;

    const extraStep = (() => {
        if (selectedType === TARGET_TYPE_IDS.REMINDER) {
            return { title: labelStepDate, message: labelStepDateMsg, id: 2, Component: TargetCreateDateTimePicker };
        }
        if (selectedType === TARGET_TYPE_IDS.DURATION) {
            return { title: labelStepDate, message: labelStepDateMsg, id: 2, Component: TargetCreateDatePicker };
        }
        if (selectedType === TARGET_TYPE_IDS.PROGRESSIVE) {
            return { title: labelStepGoal, message: labelStepGoalMsg, id: 2, Component: TargetCreateProgressiveGoalInput };
        }
        return null;
    })();

    const TargetSteps = [
        { title: labelStepName, message: labelStepNameMsg, id: 0, Component: TargetCreateNameDescriptionInput },
        { title: labelStepType, message: labelStepTypeMsg, id: 1, Component: TargenCreateTypeButton },
        ...(extraStep ? [extraStep] : []),
        ...(!isBigGoal ? [{ title: labelStepDifficulty, message: labelStepDifficultyMsg, id: 3, Component: TargetCreateDifficultyButton }] : []),
    ];

    const labelStepPrizeTypeMsg = t('stepPrizeTypeMessage');
    const labelStepPrizeNameMsg = t('stepPrizeNameMessage');
    const labelStepPriceTitle = t('stepPriceTitle');
    const labelStepPrizePriceMsg = t('stepPrizePriceMessage');

    const PrizeSteps = [
        { title: labelStepType, message: labelStepPrizeTypeMsg, id: 0, Component: TargenCreateTypeButton },
        { title: labelStepName, message: labelStepPrizeNameMsg, id: 1, Component: TargetCreateNameInput },
        { title: labelStepPriceTitle, message: labelStepPrizePriceMsg, id: 2, Component: TargetBallPicker },
    ];

    const Steps = type === 'target' ? TargetSteps : PrizeSteps;

    useEffect(() => {
        if (isEditMode && targetData) {
            if (type === 'target') {
                setAnswers([
                    { questionId: 0, value: { name: targetData.name, description: targetData.description ?? '' } },
                    { questionId: 1, value: targetData.type },
                    { questionId: 2, value: targetData.dueDate ?? targetData.goalValue ?? undefined },
                    { questionId: 3, value: targetData.difficulty },
                ]);
            } else {
                setAnswers([
                    { questionId: 0, value: targetData.type },
                    { questionId: 1, value: targetData.name },
                    { questionId: 2, value: targetData.ball },
                ]);
            }
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

    const isCurrentValueValid = () => {
        const val = answers.find(a => a.questionId === Steps[currentLabel].id)?.value;
        if (type === 'target' && currentLabel === 0) {
            return val?.name && val.name.trim().length > 0;
        }
        return val !== undefined && val !== null;
    };

    const handleNext = () => {
        if (currentLabel === Steps.length - 1) {
            if (type === 'target') {
                const nameDesc = answers.find(a => a.questionId === 0)?.value;
                const extraValue = answers.find(a => a.questionId === 2)?.value;
                const targetPayload = {
                    name: nameDesc?.name ?? '',
                    description: nameDesc?.description ?? '',
                    type: selectedType,
                    difficulty: isBigGoal ? DIFFICULTY_IDS.EPIC : answers.find(a => a.questionId === 3)?.value,
                    dueDate: (selectedType === TARGET_TYPE_IDS.REMINDER || selectedType === TARGET_TYPE_IDS.DURATION) ? extraValue : undefined,
                    goalValue: selectedType === TARGET_TYPE_IDS.PROGRESSIVE ? extraValue : undefined,
                    data: new Date().toLocaleDateString("ru-RU").toString(),
                    ball: targetData?.ball || 0,
                    color: targetData?.color || 0,
                    ephir: targetData?.ephir || 0,
                };

                if (isEditMode) {
                    updateTarget(targetIndex, targetPayload);
                } else {
                    addTarget(targetPayload);
                }
                navigation.replace('Target');
            } else {
                const prizePayload = {
                    name: answers.find(a => a.questionId === 1)?.value,
                    data: new Date().toLocaleDateString("ru-RU").toString(),
                    ball: answers.find(a => a.questionId === 2)?.value,
                    type: answers.find(a => a.questionId === 0)?.value,
                    color: targetData?.color || 0,
                    ephir: targetData?.ephir || 0,
                };

                if (isEditMode) {
                    updatePrize(targetIndex, prizePayload);
                } else {
                    addPrize(prizePayload);
                }
                navigation.replace('Prize');
            }
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
      <ProgressBar labels={Steps} currentLabel={currentLabel}/>
      <Question
        item={Steps[currentLabel]}
        isFirst={currentLabel === 0}
        isLast={currentLabel === Steps.length - 1}
        nextLabel={handleNext}
        prevLabel={() => setCurrentLabel((e) => e -= 1)}
        onValueChange={handleSelectAnswer}
        currentValue={answers.find(a => a.questionId === Steps[currentLabel].id)?.value}
        isEditMode={isEditMode}
        onDelete={handleDelete}
        type={type}
        isCurrentValueValid={isCurrentValueValid()}
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
