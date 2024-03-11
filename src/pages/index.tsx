import { useFetch } from "@/hooks/fetching";
import { ContainerProps, Flex, Spinner, Text } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { PokeCard } from "@/components/ui/pokeCard";
import { SectionContainer } from "@/components/sectionContainer";
import { FC } from "react";

const Home: FC<ContainerProps> = ({ ...rest }) => {
  const { data, loading, error } = useFetch("/api/pokemon/getPokemon");

  const [ref, inView] = useInView({
    triggerOnce: true, // Animation triggers only once when entering viewport
  });

  const movemente = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (error) {
    return <Text>Error : {error}</Text>;
  }

  return (
    <>
      <SectionContainer
        pt={{ base: 8, md: 4 }}
        pb={{ base: 20, md: 28 }}
        {...rest}
      >
        <Text
          w="fit-content"
          mx="auto"
          my="2rem"
          fontSize={{ base: "1.5rem", md: "1.8rem" }}
          fontWeight="bold"
        >
          Welcome to My Pokemon Gallery! 🖼️
        </Text>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={movemente}
          transition={{ duration: 1.5, staggerChildren: 1.3 }}
        >
          <Flex
            justifyContent="center"
            gap={{ base: 12, md: 4 }}
            flexWrap="wrap"
            w={{ md: "fit-content" }}
            mx={{ base: 6, lg: "auto" }}
            pt={{ base: 6, md: 6 }}
            pb={{ sm: 8, md: 12 }}
          >
            {loading || data.length < 1 ? (
              <Flex
                justifyContent="center"
                alignContent="center"
                margin="auto"
                h="100vh"
              >
                <Spinner size="xl" color="#77002e" />
              </Flex>
            ) : (
              data.map((poke, i) => {
                return (
                  <motion.div variants={movemente} key={i}>
                    <PokeCard data={poke} key={poke.id} index={i} />
                  </motion.div>
                );
              })
            )}
          </Flex>
        </motion.div>
      </SectionContainer>
    </>
  );
};

export default Home;
