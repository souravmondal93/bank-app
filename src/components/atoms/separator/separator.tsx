import React, { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

type SeparatorProps = {
  rest?: any;
  variant?: string;
  children?: ReactNode | string | null;
};

export function Separator(props: SeparatorProps) {
  const { variant, children, ...rest } = props;
  return (
    <Flex
      h='1px'
      w='100%'
      bg='linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 47.22%, rgba(224, 225, 226, 0.15625) 94.44%)'
      {...rest}>
      {children}
    </Flex>
  );
}
