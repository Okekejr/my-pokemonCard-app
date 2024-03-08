import Link from "next/link";
import { Flex, FlexProps, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Logo } from "../logo";

export const MainNavigation: FC<FlexProps> = (props) => {
  return (
    <Flex
      w="auto"
      h={{ base: "5rem" }}
      justifyContent="center"
      align="center"
      bgColor="#77002e"
      color="#ffff"
      {...props}
    >
      <Stack
        direction="row"
        w={{ base: "95%", md: "32rem" }}
        justifyContent="space-between"
        alignItems="center"
        fontSize={{ base: "1.2rem", md: "1.4rem" }}
        fontWeight="bold"
      >
        <Link href="/add-pokemon">
          <Text
            fontSize={{ base: "1rem", md: "1.3rem" }}
            _hover={{ color: "#02041C" }}
          >
            Add Pokemon
          </Text>
        </Link>
        <Link href="/">
          <Logo w={32} h={14} />
        </Link>
        <Link href="/gallery">
          <Text
            fontSize={{ base: "1rem", md: "1.3rem" }}
            _hover={{ color: "#02041C" }}
          >
            My Pokemons
          </Text>
        </Link>
      </Stack>
    </Flex>
  );
};
