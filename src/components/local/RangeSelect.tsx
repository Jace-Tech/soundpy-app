import { Box, Flex, Text, useRangeSlider } from '@chakra-ui/react';
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface

interface RangeSelectProps  {
  onChange: (data: any) => void;
  min: number;
  max: number;
  stepToNumber?: number;
  stepToIndex?: number;
  stepByNumber?: number;
  defaultValue?: [number, number];
  'aria-label': [string, string];
}

const RangeSelect: React.FC<RangeSelectProps> = ({ min, max, stepToNumber, stepToIndex, stepByNumber, defaultValue, onChange, ...rest }) => {
  const {
    state,
    actions,
    getInnerTrackProps,
    getInputProps,
    getRootProps,
    getThumbProps,
    getTrackProps,
  } = useRangeSlider({ min, max, defaultValue, ...rest })

  const { onKeyDown: onThumbKeyDownFirstIndex, ...thumbPropsFirstIndex } = getThumbProps({ index: 0, })

  const { onKeyDown: onThumbKeyDownSecondIndex, ...thumbPropsSecondIndex } = getThumbProps({ index: 1, })

  const onKeyDownStepBy = (e: React.KeyboardEvent<HTMLDivElement>, thumbIndex: number) => {
    if (e.code === 'ArrowRight') actions.stepUp(thumbIndex, stepByNumber)
    else if (e.code === 'ArrowLeft')
      actions.stepDown(thumbIndex, stepByNumber)
    else
      thumbIndex === 0
        ? onThumbKeyDownFirstIndex?.(e)
        : onThumbKeyDownSecondIndex?.(e)
  }

  return (
    <Box
      mt={2}
      cursor='pointer'
      w={{ base: '96%', lg: '98%' }}
      ml={{ base: '2%', lg: '1%' }}
      {...getRootProps()}
    >
      <input {...getInputProps({ index: 0 })} hidden />
      <input {...getInputProps({ index: 1 })} hidden />
      <Box
        h='7px'
        bgColor='teal.100'
        borderRadius='full'
        {...getTrackProps()}
      >
        <Box
          h='7px'
          bgColor='teal.500'
          borderRadius='full'
          {...getInnerTrackProps()}
        />
      </Box>
      <Thumb
        value={state.value[0]}
        thumbIndex={0}
        thumbProps={thumbPropsFirstIndex}
        onKeyDownStepBy={onKeyDownStepBy}
        bgColor='teal.500'
      />
      <Thumb
        value={state.value[1]}
        thumbIndex={1}
        thumbProps={thumbPropsSecondIndex}
        onKeyDownStepBy={onKeyDownStepBy}
        bgColor='teal.500'
      />
    </Box>
  );
}


interface ThumbProp {
  value: number;
  thumbIndex: number;
  thumbProps: any;
  bgColor: string;
  onKeyDownStepBy: (e: React.KeyboardEvent<HTMLDivElement>, thumbIndex: number) => void;
}

const Thumb: React.FC<ThumbProp> = ({ value, bgColor, thumbIndex, thumbProps, onKeyDownStepBy }) => {
  return (
    <Box
      top='1%'
      boxSize={8}
      bgColor={bgColor}
      borderRadius='full'
      _focusVisible={{
        outline: 'none',
      }}
      onKeyDown={(e) => onKeyDownStepBy(e, thumbIndex)}
      {...thumbProps}
    >
      <Flex w='100%' h='100%' alignItems='center' justifyContent='center'>
        <Text fontSize={"sm"} color='white'>{value}</Text>
      </Flex>
    </Box>
  );
};

export default RangeSelect