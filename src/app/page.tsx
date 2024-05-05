"use client";
import AppFilters from "@/components/filters";
import AppLoader from "@/components/loader";
import { useFindPlaces } from "@/hooks";
import { GlobeAltIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const params = useSearchParams();

  const { data: places, isLoading } = useFindPlaces(params.toString());

  return (
    <div className="grid grid-cols-6 gap-6">
      <div className="col-span-6 sm:col-span-2">
        <div className="bg-white overflow-hidden sm:rounded-lg sm:shadow">
          <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Filtres
                </h3>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            <div className="px-4 py-4 sm:px-6">
              <AppFilters />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-6 sm:col-span-4">
        <div className="bg-white overflow-hidden sm:rounded-lg sm:shadow">
          <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Adresses
                </h3>
              </div>
            </div>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-10">
              <AppLoader color="text-indigo-600" />
            </div>
          )}

          <ul className="divide-y divide-gray-200">
            {places?.map((place) => (
              <li key={place?._id}>
                <Link
                  href={`/details/${place?._id}`}
                  className="block hover:bg-gray-50"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-indigo-600 truncate">
                        {place?.place_name}
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {place?.type}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <div className="sm:flex">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPinIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          <p>
                            {place?.postal_code}, {place?.address},{" "}
                            {place?.city}
                          </p>
                        </div>
                      </div>
                      <div className="ml-2 flex items-center text-sm text-gray-500">
                        <GlobeAltIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        <p>{place?.country}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
