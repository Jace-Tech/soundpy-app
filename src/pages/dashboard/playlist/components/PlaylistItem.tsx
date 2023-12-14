import { Box, HStack, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import useColorMode from '../../../../hooks/useColorMode';
import CustomButton from '../../../../components/global/CustomButton';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PlaylistItemProps {
  artist: string;
  price?: string | number;
  album: string;
  image: string;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ album, artist, image, price }) => {
  const { colors } = useColorMode()
  return (
    <Box position={"relative"} py={2}>
      <HStack>
        <Image objectFit={"cover"} width={"90px"} src={image} />

        <Stack spacing={1} flex={1}>
          <Heading color={colors} size={"sm"}>{artist}</Heading>
          <Text fontSize={"sm"} color={colors.TEXT_GRAY}>{album}</Text>
        </Stack>

        {price ? (
          <HStack>
            <Text fontWeight={"semibold"} color={colors.TEXT_WHITE}>{price}π</Text>
            <CustomButton size={"sm"} bg={colors.SECONDARY_COLOR} rounded={"2xl"} px={5}>Buy</CustomButton>
          </HStack>
        ) : (
          <CustomButton size={"sm"} rounded={"2xl"} px={5}>Free</CustomButton>
        )}
      </HStack>
    </Box>
  )
}

export default PlaylistItem