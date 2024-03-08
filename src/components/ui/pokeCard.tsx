import { pokemonDT } from "@/types";
import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";

interface Props extends FlexProps {
  data: pokemonDT;
  index: number;
}

interface myLoaderProps {
  src: string;
}

export const PokeCard: FC<Props> = ({ data, index, ...rest }) => {
  const myLoader = ({ src }: myLoaderProps) => {
    return `${src}`;
  };

  const { name, image } = data;

  return (
    <>
      <Flex
        flexDir="column"
        textAlign="center"
        height="fit-content"
        mt={{ lg: index === 1 ? "5rem" : "" }}
        opacity={0.5}
        _hover={{ opacity: 1 }}
        {...rest}
      >
        <Box display="flex" justifyContent="center">
          <Image
            loader={myLoader}
            src={image || ""}
            alt={name}
            width={340}
            height={450}
            unoptimized={true}
          />
        </Box>
        <Text fontSize={{ base: "1.2rem", md: "1.5rem" }}>{name}</Text>
      </Flex>
    </>
  );
};
