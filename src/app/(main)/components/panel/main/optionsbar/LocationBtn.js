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
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getCountry = async () => {
      const res = await fetch("/api/fetchCountry");
      const result = await res.json();

      const options = result.data.map((el) => {
        return {
          value: el.name.common,
          label: el.name.common,
        };
      });

      setOptions(options);
    };

    getCountry();
  }, []);

  return (
    <div className="flex flex-row items-center space-x-2 border rounded-xl outline-none basis-1/2 ">
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
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
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
