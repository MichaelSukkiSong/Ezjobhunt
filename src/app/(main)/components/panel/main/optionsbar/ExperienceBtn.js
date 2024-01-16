"use client";

import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";

const ExperienceBtn = ({ setFilteringOptions }) => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [experienceRange, setExperienceRange] = useState([]);

  return (
    <Popover>
      <PopoverTrigger>
        <button className="border rounded-xl p-2">
          <span>Experience</span>
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>Experience</PopoverHeader>
        <PopoverBody>
          <div>
            <span>
              <input
                type="checkbox"
                className="mr-2 my-2"
                onChange={() => setCheckboxChecked(!checkboxChecked)}
              />
              Filter by Experience:
              {experienceRange.length !== 0
                ? `${experienceRange[0]} - ${experienceRange[1]} Years`
                : "Any"}
            </span>
            {checkboxChecked ? (
              <RangeSlider
                aria-label="experience-slider"
                defaultValue={[0, 21]}
                min={0}
                max={21}
                onChangeEnd={(val) => {
                  setExperienceRange(val);
                  setFilteringOptions((prev) => {
                    return { ...prev, experience: val };
                  });
                }}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb bg="blue.100" index={0} />
                <RangeSliderThumb bg="blue.100" index={1} />
              </RangeSlider>
            ) : null}
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ExperienceBtn;
