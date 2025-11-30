import { Pressable, StyleSheet, Text, Vibration, View } from "react-native"
import { ProjectColors } from "../../../../assets/colors"
import { Pizza, Target } from "../../../../assets/icons"
import React, { useState } from "react"
import { Modal } from "../../../feauters/modal";
import { useAppStore } from "../../../hooks/store";

interface TaskProps {
    name: string;
    date: string;
    type: 'target' | 'prize';
    price: string | number;
}

interface TrackListProps {
    list: TaskProps[];
}

const EmptyBLock = () => {
    return (
        <View style={styles.emptyContainer}>
            <Text style={[styles.taskText, {textAlign: 'center'}]}>Make a transaction to make it appear here</Text>
        </View>
    )
}

const Task = ({ name, date, type, price }: TaskProps) => {
    const isTarget = type === 'target';

    const [visibleModal, setVisibleModal] = useState(false);
    const clearUserData = useAppStore((s) => s.clearUserData);

    const handleHoldPress = () => {
        Vibration.vibrate(10);
        setVisibleModal(true);
    }
    
    return (
        <>
        <Pressable onLongPress={handleHoldPress}>
        <View style={styles.taskContainer}>
            <View style={styles.iconContainer}>
                {isTarget ? 
                    <Target width={25} height={25} color={ProjectColors.black} /> :
                    <Pizza width={25} height={25} color={ProjectColors.black} /> 
                }
                
            </View>
            <View style={styles.taskTextBlock}>
                <Text style={styles.taskText}>{name}</Text>
                <Text style={styles.taskMiniText}>{date}</Text>
            </View>
            <View style={styles.priceBlock}>
                <Text style={styles.priceText}>{`${isTarget ? '+' : '-'} ${price}.00`}</Text>
            </View>
        </View>
        </Pressable>

        <Modal 
            buttonTitle="Deleted" 
            message="Are you sure you want to delete the operation?" 
            onClose={() => setVisibleModal(false)} 
            title="Delete operation?" 
            visible={visibleModal}
            onConfirm={clearUserData}
        />
        </>
    )
}

const TaskList = ({list}: TrackListProps) => {

    if (list.length === 0) return <EmptyBLock />

    return(
        <View style={{marginTop: 6}}>
            {list.map((item, index) => (
                <Task 
                    key={index} 
                    name={item.name} 
                    date={item.date}
                    price={item.price}
                    type={item.type}
                />
            ))}
        </View>
    )
}

export const MainTasks = () => {
    // const testData = [
    // {
    //     name: 'Чипсы',
    //     date: '21.12.2025 18:00',
    //     type: 'prize',
    //     price: 30
    // },
    // {
    //     name: 'Зал',
    //     date: '21.12.2025 18:00',
    //     type: 'target',
    //     price: 3
    // },
    // {
    //     name: 'Чипсы',
    //     date: '21.12.2025 18:00',
    //     type: 'prize',
    //     price: 30
    // },
    // {
    //     name: 'Зал',
    //     date: '21.12.2025 18:00',
    //     type: 'target',
    //     price: 3
    // },
    // ];
    const userData = useAppStore((s) => s.userData);
    const testData = userData?.history ?? []
    
    return (
        <View style={styles.container}>
            <Text style={styles.miniText}>Recent</Text>
            <Text style={styles.text}>Transactions</Text>
            <TaskList list={testData} />
            {/* <TaskList list={EmptyTestData} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        marginTop: 12
    },
    text: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        color: ProjectColors.black,
        fontSize: 36,
    },
    miniText: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '500',
        color: ProjectColors.grey,
        fontSize: 14,
        marginTop: 8,
        marginLeft: 6,
    },
    taskContainer: {
        width: '100%',
        height: 55,
        backgroundColor: ProjectColors.lightGrey,
        borderRadius: 25,
        marginBottom: 14,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 12
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: ProjectColors.darkGrey,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    taskText: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        color: ProjectColors.black,
        fontSize: 18,
    },
    taskMiniText: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '500',
        color: ProjectColors.grey,
        fontSize: 12,
    },
    taskTextBlock: {
        marginLeft: 18
    },
    priceBlock: {
        flex: 1,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginRight: 12
    },
    priceText: {
        fontFamily: 'StackSansTextVariableFont',
        fontWeight: '700',
        color: ProjectColors.black,
        fontSize: 16,
    },
    emptyContainer: {
        width: '100%',
        height: 300,
        borderWidth: 2,
        borderColor: ProjectColors.black,
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        marginTop: 12
    }

})