import Svg, { Path } from "react-native-svg"

export const SaveIcon = ({size = 30, color = '#000'}) => {
    return (
        <Svg 
            width={size}
            height={size}
            viewBox="0 0 24 24"
        >
            <Path 
                stroke={color}
                d="M21 20V8.414a1 1 0 0 0-.293-.707l-4.414-4.414A1 1 0 0 0 15.586 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1zM9 8h4a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2zm7 11H8v-4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
        </Svg>
    )
}