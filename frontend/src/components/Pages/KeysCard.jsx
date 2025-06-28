import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";

const KeysCard = ({ selectedProvider }) => {
  const [providerDetails, setProviderDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Selected Provider:", selectedProvider);
    const fetchProviderDetails = async () => {
      if (selectedProvider) {
        setLoading(true);
        // Fetch provider details from the API
        try {
          //keys?provider=GoogleAI
          const response = await axios.get(
            `${import.meta.env.VITE_BACE_URL}/keys?provider=${selectedProvider}`
          );
          const data = response.data;
          console.log("Provider Details:", data);
        } catch (error) {
          console.error("Error fetching provider details:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProviderDetails();
  }, [selectedProvider]);

  return (
    <div className="container mx-auto px-4 py-2.5 max-w-4xl border rounded-md shadow-lg bg-white">
      {loading && (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      )}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2.5">
        {[1, 2, 3, 4, 5].map((item, index) => (
          <Dialog key={index}>
            <DialogTrigger>
              {/* Grid */}
              <div className="bg-gray-800 p-4 rounded-md shadow">
                {/*Provider, View , status, foundfirst. will sort based on found first*/}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-white text-lg font-semibold mb-2">
                    Provider: prov
                  </h2>
                  <p className="text-gray-300">View: 23 </p>
                </div>
                <hr />
                <div className="flex justify-center items-center mt-4">
                  <p className="text-gray-400">Status: Active</p>
                </div>
                <p className="text-gray-400 mt-2">Found First: 2023-10-01</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Provider</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default KeysCard;
