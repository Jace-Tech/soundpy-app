import { ToastId, useToast } from "@chakra-ui/react"
import { MAX_DEPTH } from "../utils/constant"

interface IuseAlert  {
    showAlert: (title: string, status?: StatusType, text?: string) => ToastId;
}
type StatusType = "info" | "warning" | "success" | "error" | "loading" | undefined
const useAlert = (): IuseAlert => {
  const toast = useToast({ isClosable: true, position: "top", duration: 6000, containerStyle: { zIndex: MAX_DEPTH + 10 } })
  const showAlert = (title: string, status: StatusType = "error", text?: string) => (
    toast({
      status,
      title,
      description: text
    })
  )
  return { showAlert }


}

export default useAlert