import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { Card } from "./ui/card";
import { SectionContainer } from "./sectionContainer";
import { useFeedback } from "@/hooks/feedback";

const initialState = {
  name: "",
  image: "",
  description: "",
  card: "",
};

const AddPokemonPage: FC = () => {
  const [formData, setFormData] = useState(initialState);
  const { toasting } = useFeedback();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearForm = () => {
    setFormData(initialState);
  };

  const saveData = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const postReq = await fetch("/api/pokemon/createPokemon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          image: formData.image,
          description: formData.description,
          card: formData.card,
        }),
      });

      if (postReq.ok) {
        toasting({
          _title: "Pokemon added!.",
          status: "success",
        });

        clearForm();
      } else {
        toasting({
          _title: "FAILED",
          desc: "Failed to save data. Please try again.",
          status: "error",
        });
      }
    } catch (error) {
      toasting({
        _title: "POKEMON NOT ADDED",
        desc: "An error occurred. Please try again later.",
        status: "error",
      });
    }
  };

  return (
    <>
      <SectionContainer pt={{ base: 8, md: 4 }} pb={{ base: 20, md: 28 }}>
        <Text
          textAlign="center"
          my={{ base: "2rem", md: "2rem" }}
          fontSize={{ base: "1rem", md: "1.5rem" }}
          fontWeight="bold"
        >
          Add a Pokemon
        </Text>

        <Card>
          <form onSubmit={saveData}>
            <FormControl isRequired>
              <Stack gap={4} w={{ base: "19rem", md: "30rem" }}>
                <Box>
                  <FormLabel>Pokemon Name</FormLabel>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Pokemon name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Box>

                <Flex flexDir="column">
                  <FormLabel>Image URL</FormLabel>
                  <Input
                    name="image"
                    type="url"
                    placeholder="Image Link"
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                </Flex>

                <Flex flexDir="column">
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    placeholder="Pokemon description text"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </Flex>

                <Flex flexDir="column">
                  <FormLabel>Pokemon Card</FormLabel>
                  <Input
                    name="card"
                    type="url"
                    placeholder="Pokemon Card Link"
                    value={formData.card}
                    onChange={handleInputChange}
                  />
                </Flex>

                <Button my={4} colorScheme="teal" type="submit">
                  Add Pokemon
                </Button>
              </Stack>
            </FormControl>
          </form>
        </Card>
      </SectionContainer>
    </>
  );
};

export default AddPokemonPage;
