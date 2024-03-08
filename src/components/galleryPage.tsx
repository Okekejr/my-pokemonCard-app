import { FC, useState } from "react";
import { SectionContainer } from "./sectionContainer";
import { Box, Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import { useFetch } from "@/hooks/fetching";
import { Pokemons } from "./ui/card";

const GalleryPage: FC = () => {
  const { galry, error, refetchData } = useFetch(
    "https://my-pokemon-api.vercel.app/pokemon_okeke"
  );

  return (
    <>
      <SectionContainer pt={{ base: 8, md: 4 }} pb={{ base: 20, md: 28 }}>
        <Text
          w="fit-content"
          mx="auto"
          my="2rem"
          textAlign="center"
          fontSize={{ base: "1.6rem", md: "1.8rem" }}
          fontWeight="bold"
        >
          Gallery currently has ( {galry?.count} ) Pokemons
        </Text>

        <VStack gap={8}>
          {galry && galry.results.length > 0 ? (
            galry.results.map((poke) => {
              return <Pokemons key={poke.id} data={poke} refresh={refetchData} />;
            })
          ) : (
            <Flex
              justifyContent="center"
              alignContent="center"
              margin="auto"
              h="100vh"
            >
              <Spinner size="xl" color="#77002e" />
            </Flex>
          )}
        </VStack>
      </SectionContainer>
    </>
  );
};

export default GalleryPage;
