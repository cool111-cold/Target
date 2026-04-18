import Svg, { Path } from "react-native-svg"

export const ChevronLeftIcon = ({ size = 24, color = '#000' }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M15 17L10 12L15 7"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}
