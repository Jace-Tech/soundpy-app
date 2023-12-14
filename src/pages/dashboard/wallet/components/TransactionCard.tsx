import { HStack, Heading, Icon, IconButton, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { IoReturnDownForward, IoReturnUpBack } from 'react-icons/io5'
import { IoIosArrowForward } from 'react-icons/io'
import useColorMode from '../../../../hooks/useColorMode';
import { TERTIARY_COLOR } from '../../../../utils/colors'; 
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../../../components/global/CustomButton';
import { useAppSelector } from '../../../../store/hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TransactionCardProps {
  outgoing?: boolean;
  title?: string;
  date?: string;
  price?: string;
  claimed?: boolean;
  id?: string;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ outgoing, claimed, date, id, price, title }) => {
  const { colors, hoverColor } = useColorMode()
  const navigate = useNavigate()
  const { hideAmount } = useAppSelector(state => state.settingStore)

  return (
    <HStack alignItems={"center"} bgColor={hoverColor} p={2} px={4} spacing={4}>
      <Icon
        fontSize={"2xl"}
        color={outgoing ? colors.SECONDARY_COLOR : colors.PRIMARY_COLOR}
        as={outgoing ? IoReturnUpBack : IoReturnDownForward} />

      <Stack spacing={1} flex={1} onClick={() => navigate(`/transaction/${id}`)}>
        <Heading noOfLines={1} color={colors.TEXT_WHITE} size={"md"}>{title || "Onyinye"}</Heading>
        <Text noOfLines={1} fontSize={"sm"} color={colors.TEXT_GRAY}>{date || "May 23, 2019 20:12 pm"}</Text>
      </Stack>

      <HStack alignItems={"center"}>
        {outgoing ? (
          <>
            <Text color={TERTIARY_COLOR} filter={hideAmount ? "blur(6px)" : undefined} fontWeight={"semibold"}>{price || 0.23}π</Text>
            <IconButton
              bg={"transparent"}
              color={colors.TEXT_GRAY}
              aria-label='view'
              fontSize={"xl"}
              icon={<IoIosArrowForward />}
            />
          </>
        ) : claimed ? (
            <HStack>
              <Text color={TERTIARY_COLOR} filter={hideAmount ? "blur(6px)" : undefined} fontWeight={"semibold"}>{price || 0.23}π </Text>
              <CustomButton isDisabled rounded={"full"} fontSize={"xs"} h={8} px={6}>Claimed</CustomButton>
            </HStack>
        ) : (
          <>
            <Text color={TERTIARY_COLOR} filter={hideAmount ? "blur(6px)" : undefined} fontWeight={"semibold"}>{price || 0.23}π</Text>
            <CustomButton rounded={"full"} fontSize={"xs"} h={8} px={6}>Claim</CustomButton>
          </>
        )}
      </HStack>
    </HStack>
  )
}

export default TransactionCard