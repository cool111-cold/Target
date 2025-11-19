import Svg, { Path } from "react-native-svg"
import { ProjectColors } from "../colors"

export const InfoIcon = ({ width = 30, height = 30, color = ProjectColors.black }) => {
    return (
        <Svg  
            width={width}
            height={height}
            viewBox="0 0 24 24"
        >
            <Path 
                stroke={color}
                d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm1,15a1,1,0,0,1-2,0V11a1,1,0,0,1,2,0ZM12,8a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,8Z"/>
        </Svg>
    )
}