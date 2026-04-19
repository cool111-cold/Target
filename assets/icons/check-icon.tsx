import Svg, { Path } from "react-native-svg"

export const CheckIcon = ({ size = 30, color = '#000' }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M16.8 8.3999L9.64043 15.5999L7.19995 13.1456" 
         stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"/>
        </Svg>
    )
}
