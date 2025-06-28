import React, { useContext, useState } from "react";
import { Hero } from "../hero";
import KeysCard from "./KeysCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KeysContext } from "../../context/KeysContext";

const Home = () => {
  const [isRandom, setIsRandom] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState("");
  const { allKeysData, allProviders } = useContext(KeysContext);

  const handleOnSelect = (value) => {
    console.log("Selected value:", value);
    setSelectedProvider(value);
    setIsRandom(false);
  };
  return (
    <div>
      <Hero
        setIsRandom={setIsRandom}
        isRandom={isRandom}
        setSelectedProvider={setSelectedProvider}
        title="Unsecured"
        subtitle={'The Wall  of "Well, That Wasn\'t Supposed to Go Live"'}
        actions={[
          {
            label: "Watch Video",
            href: "#",
            variant: "outline",
          },
          {
            label: "Get Random Key",
            href: "#",
            variant: "default",
          },
        ]}
        titleClassName="text-5xl md:text-6xl font-extrabold"
        subtitleClassName="text-lg md:text-xl max-w-[600px]"
        actionsClassName="mt-8"
      />
      <div className="flex items-center justify-center mb-4">
        <Select
          value={selectedProvider}
          onValueChange={(value) => handleOnSelect(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Providers ({allProviders?.length})</SelectLabel>
              {/* TODO: will map through the list of providers */}
              {allProviders?.map((provider) => (
                <SelectItem key={provider._id} value={provider.name}>
                  {provider.name} ({provider.count})
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {isRandom ? (
        <div className="container mx-auto px-4 py-2.5 max-w-4xl border rounded-md shadow-lg bg-white h-[35rem] mb-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-800 text-lg font-semibold">Random</h2>
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => setIsRandom(false)}
            >
              View All
            </button>
          </div>
        </div>
      ) : (
        //container for the main content
        <>
          <KeysCard selectedProvider={selectedProvider} />
        </>
      )}
    </div>
  );
};

export default Home;
