import Svg, { Path } from "react-native-svg"

export const PenIcon = ({size = 30, color = '#000'}) => {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
        >
            <Path 
                stroke={color}
                d="M8.661,19.113,3,21l1.887-5.661ZM20.386,7.388a2.1,2.1,0,0,0,0-2.965l-.809-.809a2.1,2.1,0,0,0-2.965,0L6.571,13.655l3.774,3.774Z"/>
        </Svg>
    )
}