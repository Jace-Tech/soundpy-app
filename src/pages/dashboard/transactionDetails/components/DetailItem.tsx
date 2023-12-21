import { Badge, HStack, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import React from "react"
import useColorMode from "../../../../hooks/useColorMode";
import { IoCopyOutline } from "react-icons/io5";
import { SECONDARY_COLOR } from "../../../../utils/colors";
import useAlert from "../../../../hooks/useAlert";

interface DetailItemProps {
    title: string;
    value: string;
    canCopy?: boolean;
    isStatus?: boolean;
}
const DetailItem:React.FC<DetailItemProps> = ({ title, value, isStatus, canCopy }) => {
    const { colors } = useColorMode()
    const { isOpen: isCopying, onOpen: openCopy, onClose: closeCopy } = useDisclosure()
    const { showAlert } = useAlert()


    const handleCopy = async () => {
        openCopy()
        await navigator.clipboard.writeText(value)
        showAlert("Text copied", "success")
        closeCopy()
    } 

    const isPending = value?.toLowerCase()?.includes("pending")
    const isSuccess = value?.toLowerCase()?.includes("success")
    return(
       <HStack alignItems={"flex-start"} w={"full"} py={2} borderBottom={`1px solid ${colors.DIVIDER}`}>
        <Text whiteSpace={"nowrap"} fontSize={"sm"} fontWeight={"medium"} color={colors.TEXT_WHITE}>{title}</Text>
        <HStack flex={1} justifyContent={"flex-end"} alignItems={"flex-start"}>
            { isStatus ? <Badge fontSize={"xs"} rounded={"full"} textTransform={"lowercase"} fontWeight={"normal"} colorScheme={isSuccess ? "green" : isPending ? "orange" : "red"} px={4} py={1}>{value}</Badge> : 
                <Text wordBreak={"break-all"} flex={1} fontSize={"sm"} textAlign={"right"} noOfLines={2} color={colors.TEXT_GRAY}>{value}</Text>
            }
            { canCopy &&  <IconButton 
                size={"sm"}
                aria-label="copy"
                color={SECONDARY_COLOR}
                icon={<IoCopyOutline />}
                isLoading={isCopying}
                onClick={handleCopy}
            />}
        </HStack>
       </HStack>
    )
}

export default DetailItem