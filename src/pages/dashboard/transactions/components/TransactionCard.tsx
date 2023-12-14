import { HStack, Heading, Icon, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { IoReturnDownForward, IoReturnUpBack } from 'react-icons/io5'
import { IoIosArrowForward } from 'react-icons/io'
import useColorMode from '../../../../hooks/useColorMode';
import { TERTIARY_COLOR } from '../../../../utils/colors'; 
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../store/hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TransactionCardProps  extends TransactionDataType {}

const TransactionCard: React.FC<TransactionCardProps> = ({ amount, _id, createdAt, isCredit, desc, status, meta }) => {
  const { colors, hoverColor } = useColorMode()
  const navigate = useNavigate()
  const { hideAmount } = useAppSelector(state => state.settingStore)

  return (
    <HStack cursor={"pointer"} onClick={() => navigate(`/transaction/${_id}`)} alignItems={"center"} bgColor={hoverColor} p={2} px={4} spacing={4}>
      <Icon
        fontSize={"2xl"}
        color={!isCredit ? colors.SECONDARY_COLOR : colors.PRIMARY_COLOR}
        as={!isCredit ? IoReturnUpBack : IoReturnDownForward} />

      <Stack spacing={1} flex={1} onClick={() => navigate(`/transaction/${_id}`)}>
        <Heading noOfLines={2} fontSize={".95rem"} color={colors.TEXT_WHITE} size={"md"}>{desc || "Onyinye"}</Heading>
        <Text noOfLines={1} fontSize={"sm"} color={colors.TEXT_GRAY}>{(new Date(createdAt)).toDateString()}</Text>
      </Stack>

      <HStack alignItems={"center"}>
        <Text color={TERTIARY_COLOR} filter={hideAmount ? "blur(6px)" : undefined} fontWeight={"semibold"}>{amount || 0.23}π</Text>
        <Icon
          as={IoIosArrowForward}
          color={colors.TEXT_GRAY}
          fontSize={"xl"}
        />
      </HStack>
    </HStack>
  )
}

export default TransactionCard