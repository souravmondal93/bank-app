import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Link,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Separator } from "@/components/Separator/Separator";

const Brand = ({ logoText }: { logoText: string }) => (
  <Box pt={'35px'} mb='8px'>
    <Link
      href={`${process.env.PUBLIC_URL}/#/`}
      target='_blank'
      display='flex'
      lineHeight='100%'
      mb='30px'
      fontWeight='bold'
      justifyContent='center'
      alignItems='center'
      fontSize='11px'
    >
      {/* <SimmmpleLogoWhite w='22px' h='22px' me='10px' mt='2px' /> */}
      <Box
        bg='linear-gradient(97.89deg, #FFFFFF 70.67%, rgba(117, 122, 140, 0) 108.55%)'
        bgClip='text'
      >
        <Text fontSize='sm' letterSpacing='3px' mt='3px' color='transparent'>
          {logoText}
        </Text>
      </Box>
    </Link>
    <Separator></Separator>
  </Box>
);

export default Brand
