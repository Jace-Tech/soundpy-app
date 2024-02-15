import { Stack } from "@chakra-ui/react"
import React from "react"
// import Mirt  from 'react-mirt';
import 'react-mirt/dist/css/react-mirt.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DisplayCutProps {
    contentType: ContentType;
    file: File | Blob;
}
const DisplayCut:React.FC<DisplayCutProps> = ({ contentType  }) => {
    if(contentType === "music-video") return (
        <Stack>

        </Stack>
    )

    return (
      <Stack>
        {/* <Mirt  />; */}
      </Stack>
    )

}
export default DisplayCut