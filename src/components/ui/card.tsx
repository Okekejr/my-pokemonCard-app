import { pokemonDT } from "@/types";
import {
  Box,
  Button,
  Flex,
  FlexProps,
  Image,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";

interface Props extends FlexProps {
  data: pokemonDT;
  refresh: () => Promise<void>;
}

export const Card: FC<FlexProps> = ({ children, ...rest }) => {
  return (
    <Flex
      bgColor="transparent"
      border="2px solid #c7c7c7"
      borderRadius="15px"
      boxShadow="0 2px 8px rgba(0, 0, 0, 0.2)"
      w={{ base: "auto", md: "35rem" }}
      h={{ base: "auto", md: "fit-content" }}
      m="auto"
      p="2rem"
      {...rest}
    >
      {children}
    </Flex>
  );
};

export const Pokemons: FC<Props> = ({ data, refresh, ...rest }) => {
  const { name, card, description, id } = data;

  // delete request to the API using the ID from the API
  const deleteHandler = async (id: number) => {
    try {
      const delreq = await fetch(
        `https://my-pokemon-api.vercel.app/pokemon_okeke/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!delreq.ok) {
        throw new Error(`Failed to delete item with ID ${id}`);
      }
      // If deletion is successful, refetch the updated list of pokemons using the useFetch hook
      refresh();
      console.log(`Pokemon with ID ${id} deleted successfully.`);
    } catch (error) {
      // Handle error appropriately (e.g., logging, showing a notification)
      console.error("Delete request failed:", error);
      // Throw error to be caught by the caller for further handling if needed
      throw error;
    }
  };

  return (
    <>
      <Box
        backdropFilter="blur(5px)"
        backgroundColor="rgba(78, 56, 156, 0.16)"
        borderRadius="1rem"
        padding="2.5rem"
        w={{ lg: "960px", xl: "1140px" }}
      >
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          gap={8}
          {...rest}
        >
          <Box
            borderRadius="5px"
            padding="20px"
            position="relative"
            width={{ lg: "465px", xl: "520px" }}
          >
            <Image
              src={card}
              borderRadius="5px"
              objectFit="contain"
              width="100%"
              objectPosition="center"
              height="345px"
              alt={name}
            />
          </Box>

          <VStack
            w={{ md: "30rem", lg: "25rem", xl: "31.7rem" }}
            height="fit-content"
            textAlign="center"
            spacing={4}
          >
            <Tag
              fontSize="0.9rem"
              bgGradient="linear(to-l, #7143D6, #003DE9, #501681)"
            >
              Pokemon Card
            </Tag>
            <Text
              fontSize={{ base: "1.5rem", md: "1.7rem" }}
              fontWeight="bold"
              lineHeight="2.1rem"
            >
              {`${name} pokemon`}
            </Text>
            <Text as="p" fontSize="1rem">
              {description}
            </Text>

            <Box mx="auto">
              <Button
                border="2px solid"
                borderColor="primary.base"
                backgroundColor="surface.primary"
                borderRadius="2rem"
                type="button"
                _hover={{
                  textDecoration: "none",
                  backgroundColor: "surface.quinary",
                }}
                onClick={() => deleteHandler(id)}
              >
                Delete Pokemon
              </Button>
            </Box>
          </VStack>
        </Flex>
      </Box>
    </>
  );
};
