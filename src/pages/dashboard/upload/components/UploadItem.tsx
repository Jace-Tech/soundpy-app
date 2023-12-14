import { HStack, Heading, Icon, Stack, StackProps, Text } from "@chakra-ui/react";
import useColorMode from "../../../../hooks/useColorMode";
import { IoAddCircle } from "react-icons/io5";
import { IconType } from "react-icons";

interface UploadItemProp extends StackProps {
  icon?: IconType;
  title: string;
  handleClick?: () => void;
  active?: boolean;
  text?: string;
}

const UploadItem: React.FC<UploadItemProp> = ({ icon, title, text, active, handleClick }) => {
  const { colors } = useColorMode()
  return (
    <HStack borderWidth={2} onClick={handleClick} transition={"border .4s ease"} borderColor={active ? colors.PRIMARY_COLOR : "transparent" } _hover={{ borderColor: colors.PRIMARY_COLOR }} spacing={4} w={"full"} bg={colors.DIVIDER} alignItems={"center"} userSelect={"none"} cursor={"pointer"} rounded={"lg"} p={3}>
      <Icon color={colors.TEXT_GRAY} as={icon} fontSize={"5xl"} />
      <Stack spacing={0} flex={1}>
        <Heading size={"md"} color={colors.TEXT_WHITE}>{title}</Heading>
        {text && <Text fontSize={"sm"} fontWeight={"semibold"} color={colors.TEXT_GRAY}>{text}</Text>}
      </Stack>
      <Icon as={IoAddCircle} color={colors.PRIMARY_COLOR} fontSize={"4xl"} />
    </HStack>
  )
}

export default UploadItem