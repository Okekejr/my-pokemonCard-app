import { MainNavigation } from "./MainNavigation";
import { Box, Flex, FlexProps } from "@chakra-ui/react";
import { FC } from "react";

export const Layout: FC<FlexProps> = ({ children, ...rest }) => {
  return (
    <Flex flexDirection="column" minH="100vh" w="auto" {...rest}>
      <MainNavigation />
      <Box>{children}</Box>
    </Flex>
  );
};
