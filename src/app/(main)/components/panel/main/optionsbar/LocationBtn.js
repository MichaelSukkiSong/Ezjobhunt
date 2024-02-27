"use client";

import { useState, useEffect } from "react";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import Select from "react-select";
import { ChevronDownIcon } from "../../../../icons";

const LocationBtn = ({ setFilteringOptions }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("1");
  const [countryOptions, setCountryOptions] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const getCountry = async () => {
      let options;
      try {
        const res = await fetch("/api/fetchCountry");
        const result = await res.json();

        options = result.data.map((el) => {
          return {
            value: el.name.common,
            label: el.name.common,
          };
        });
      } catch (err) {
        options = [
          { label: "United States", value: "United States" },
          { label: "North America", value: "North America" },
          { label: "South America", value: "South America" },
          { label: "Europe", value: "Europe" },
          { label: "Asia", value: "Asia" },
          { label: "Africa", value: "Africa" },
          { label: "Oceania", value: "Oceania" },
          { label: "Middle East", value: "Middle East" },
          { label: "Central America", value: "Central America" },
          { label: "Caribbean", value: "Caribbean" },
        ];
      } finally {
        setCountryOptions(options);
      }
    };

    getCountry();
  }, []);

  return (
    <div className="flex flex-row items-center space-x-2 border rounded-xl grow outline-none false">
      <button
        onClick={onOpen}
        className="flex w-full items-center justify-center space-x-4 p-2 "
      >
        <div className="flex items-center space-x-2 px-2 justify-between   w-full">
          <span>Location</span>
          <ChevronDownIcon boxSize={4} />
        </div>
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Location Preferences</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="mb-8">
              <RadioGroup onChange={setValue} value={value}>
                <Stack direction="column">
                  <Radio value="1">Country</Radio>
                  {value === "1" ? (
                    <div>
                      <Select
                        isMulti
                        name="countries"
                        options={countryOptions}
                        onChange={(selected) => {
                          setSelected(selected);
                          setFilteringOptions((prev) => {
                            return {
                              ...prev,
                              locations: selected.map((el) => el.value),
                            };
                          });
                        }}
                      />
                    </div>
                  ) : null}
                  {/* <Radio value="2">City</Radio>
                  <div>-</div> */}
                </Stack>
              </RadioGroup>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LocationBtn;
