import Svg, { Path } from "react-native-svg"

export const ChevronDoubleRightIcon = ({ size = 24, color = '#000' }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M13.4 5.8L19 11.4L13.4 17M5 5.8L10.6 11.4L5 17"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}
