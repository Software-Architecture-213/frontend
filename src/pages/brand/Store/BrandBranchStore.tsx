import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { brandApi } from "../../../api/brandClient/brandApi";

interface Branch {
  id: string;
  name: string;
  address: string;
  gps: {
    lat: number;
    lng: number;
  };
}

const BrandBranchStore = () => {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false); // Controls the popup visibility
  const [newBranch, setNewBranch] = useState({
    name: "",
    address: "",
    gps: { lat: 10.8231, lng: 106.6297 }, // Default location
  });

  useEffect(() => {
    brandApi.getBranches()
      .then((response) => {
        setBranches(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch branches:', error);
      });
  }, []);

  const handleCreateBranch = async () => {
    try {
      const response = await brandApi.createBranch(newBranch);
      setBranches([...branches, response.data]); // Add the new branch to the list
      setIsFormOpen(false); // Close the form after successful creation
    } catch (error) {
      console.error('Failed to create branch:', error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewBranch({
      ...newBranch,
      [name]: value,
    });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>, type: "lat" | "lng") => {
    setNewBranch({
      ...newBranch,
      gps: {
        ...newBranch.gps,
        [type]: parseFloat(e.target.value),
      },
    });
  };

  const NavigateToBranch = ({ location }: { location: [number, number] }) => {
    const map = useMap();
    React.useEffect(() => {
      map.flyTo(location, 14);
    }, [location, map]);
    return null;
  };

  return (
    <div className="flex h-screen relative">
      {/* Map Section */}
      <div className="flex-1 w-3/4 z-0">
        <MapContainer
          center={[10.8231, 106.6297]}
          zoom={13}
          className="h-full w-full"
          attributionControl
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {branches.map((branch) => (
            <Marker
              key={branch.id}
              position={[branch.gps.lat, branch.gps.lng]}
              eventHandlers={{
                click: () => setSelectedBranch(branch),
              }}
            />
          ))}
          {selectedBranch && <NavigateToBranch location={[selectedBranch.gps.lat, selectedBranch.gps.lng]} />}
        </MapContainer>
      </div>

      {/* Branch List Section */}
      <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Branch List</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-md mb-4"
        >
          Create Branch
        </button>
        <div className="space-y-4">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className={`p-4 bg-white shadow rounded-lg flex flex-col space-y-2 transition-transform duration-200 cursor-pointer ${
                selectedBranch?.id === branch.id ? "bg-orange-100 ring-2 ring-orange-500" : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedBranch(branch)}
            >
              <h3 className="text-md font-semibold">{branch.name}</h3>
              <p className="text-sm text-gray-600">{branch.address}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Create Branch Form (Popup) */}
      {isFormOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl z-60">
            <h3 className="text-xl font-semibold mb-4">Create New Branch</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateBranch();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Branch Name</label>
                <input
                  type="text"
                  name="name"
                  value={newBranch.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={newBranch.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4 flex space-x-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Latitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={newBranch.gps.lat}
                    onChange={(e) => handleLocationChange(e, "lat")}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Longitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={newBranch.gps.lng}
                    onChange={(e) => handleLocationChange(e, "lng")}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Create Branch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandBranchStore;
