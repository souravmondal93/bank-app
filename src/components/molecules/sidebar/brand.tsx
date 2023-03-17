import { Box, Link, Text } from '@chakra-ui/react';
import { Separator } from '@/components/atoms/separator/separator';

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

export default Brand;
