import { Slider, SliderFilledTrack, SliderMark, SliderProps, SliderThumb, SliderTrack } from "@chakra-ui/react"
import React from "react"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SliderItemProps extends SliderProps {}
const SliderItem: React.FC<SliderItemProps> = ({value, ...props}) => {
    return (
        <Slider aria-label='slider-ex-6' value={value} {...props}>
            <SliderMark
                value={value as number}
                textAlign='center'
                bg='blue.500'
                color='white'
                fontSize={"xs"}
                mt='4'
                ml='-5'
                px={1}
            >
                {value || 0}{value! < 1 ? "sec" : "mins"}
            </SliderMark>
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
        </Slider>
    )

}
export default SliderItem