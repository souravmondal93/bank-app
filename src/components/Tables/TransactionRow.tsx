import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import {
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";

import CONSTANTS from '@/common/constants';

type TransactionRowProps = {
  name: string;
  date: string;
  price: string;
  type: string;
};

function TransactionRow(props: TransactionRowProps) {
  const { name, date, price, type } = props;

  return (
    <Flex mb='24px' justifyContent='space-between'>
      <Flex alignItems='center'>
        <Box
          me='14px'
          borderRadius='50%'
          color={
            type === CONSTANTS.DEBIT_TRANSACTION
              ? "#01B574"
              : type === CONSTANTS.CREDIT_TRANSACTION
              ? "red.500"
              : "gray.400"
          }
          border='1px solid'
          display='flex'
          alignItems='center'
          justifyContent='center'
          w='35px'
          h='35px'>
          <Icon as={type === CONSTANTS.DEBIT_TRANSACTION ? FaArrowUp : FaArrowDown} w='12px' h='12px' />
        </Box>
        <Flex direction='column'>
          <Text fontSize='sm' color='#fff' mb='4px'>
          {name}
          </Text>
          <Text fontSize={{ sm: "xs", md: "sm" }} color='gray.400'>
            {date}
          </Text>
        </Flex>
      </Flex>
      <Box
        color={
          type === CONSTANTS.DEBIT_TRANSACTION
            ? "#01B574"
            : type === CONSTANTS.CREDIT_TRANSACTION
            ? "red.500"
            : "gray.400"
        }>
        <Text fontSize='sm'>{
            type === CONSTANTS.DEBIT_TRANSACTION
              ? "+"
              : type === CONSTANTS.CREDIT_TRANSACTION
              ? "-"
              : ""
          } £{price}</Text>
      </Box>
    </Flex>
  );
}

export default TransactionRow;
