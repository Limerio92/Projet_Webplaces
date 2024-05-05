"use client";
import AppLoader from "@/components/loader";
import PlaceForm from "@/components/place-form";
import { useFindPlaceById } from "@/hooks";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();

  const { data: place, isLoading } = useFindPlaceById(params.id as string);
  if (isLoading)
    return (
      <div className="flex items-center justify-center py-10">
        <AppLoader color="text-indigo-600" />
      </div>
    );

  if (!place) return <div>Address non trouvé</div>;

  return <PlaceForm place={place} />;
};

export default Page;
