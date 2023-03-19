import { Controller } from 'react-hook-form';

// Chakra imports
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';

import GradientBorder from '@/components/atoms/gradient-border/gradient-border';

const InputController = (props) => {
  const {
    control,
    errors,
    errorText,
    label,
    fieldName,
    placeholder,
    type = 'text',
    dataTestId = '',
  } = props;

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <FormControl isInvalid={Boolean(errors[fieldName])}>
          <FormLabel ms='4px' fontSize='sm' fontWeight='normal' color='white'>
            {label}
          </FormLabel>
          <GradientBorder
            mb='24px'
            w={{ base: '100%', lg: 'fit-content' }}
            borderRadius='20px'
          >
            <Input
              color='white'
              bg='rgb(19,21,54)'
              border='transparent'
              borderRadius='20px'
              fontSize='sm'
              size='lg'
              w={{ base: '100%', md: '346px' }}
              maxW='100%'
              h='46px'
              placeholder={placeholder}
              {...field}
              type={type}
              data-testid={dataTestId}
            />
          </GradientBorder>
          {errors[fieldName] && (
            <FormErrorMessage mt='0px' mb='20px'>
              {errorText}
            </FormErrorMessage>
          )}
        </FormControl>
      )}
    />
  );
};

export default InputController;
