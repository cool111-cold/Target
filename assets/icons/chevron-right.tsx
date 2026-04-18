import Svg, { Path } from "react-native-svg"

export const ChevronRightIcon = ({ size = 24, color = '#000' }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M10 7L15 12L10 17"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}
