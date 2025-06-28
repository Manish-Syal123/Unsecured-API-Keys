import React, { useState } from "react";
import { Hero } from "../hero";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Home = () => {
  const [isRandom, setIsRandom] = useState(true);
  return (
    <div>
      <Hero
        title="Unsecured"
        subtitle={'The Wall  of "Well, That Wasn\'t Supposed to Go Live"'}
        actions={[
          {
            label: "Try Demo",
            href: "#",
            variant: "outline",
          },
          {
            label: "Start Now",
            href: "#",
            variant: "default",
          },
        ]}
        titleClassName="text-5xl md:text-6xl font-extrabold"
        subtitleClassName="text-lg md:text-xl max-w-[600px]"
        actionsClassName="mt-8"
      />
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
        <div className="container mx-auto px-4 py-2.5 max-w-4xl border rounded-md shadow-lg bg-white">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2.5">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Dialog>
                <DialogTrigger>
                  {/* Grid */}
                  <div className="bg-gray-800 p-4 rounded-md shadow">
                    {/*Provider, View , status, foundfirst. will sort based on found first*/}
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-white text-lg font-semibold mb-2">
                        Provider
                      </h2>
                      <p className="text-gray-300">View: Public</p>
                    </div>
                    <hr />
                    <div className="flex justify-center items-center mt-4">
                      <p className="text-gray-400">Status: Active</p>
                    </div>
                    <p className="text-gray-400 mt-2">
                      Found First: 2023-10-01
                    </p>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
