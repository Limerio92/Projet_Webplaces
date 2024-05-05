"use client";
import AppLoader from "@/components/loader";
import { useDeletePlace, useFindPlaceById } from "@/hooks";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();
  const router = useRouter();

  const { data: place, isLoading } = useFindPlaceById(params.id as string);
  const { mutate: deletePlace } = useDeletePlace();

  const handleDelete = async () => {
    const isOK = confirm("Voulez-vous vraiment supprimer cette adresse ?");
    if (isOK) {
      deletePlace(params?.id as string, {
        onSuccess: () => {
          router.push("/");
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-10">
        <AppLoader color="text-indigo-600" />
      </div>
    );

  if (!place) return <div>Address non trouvé</div>;

  return (
    <section aria-labelledby="applicant-information-title">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2
            id="applicant-information-title"
            className="text-lg leading-6 font-medium text-gray-900"
          >
            Address détails
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Détails concernant l&apos;adresse.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Type de lieu
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{place.type}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Nom du lieu</dt>
              <dd className="mt-1 text-sm text-gray-900">{place.place_name}</dd>
            </div>

            {place.type === "Restaurant" && (
              <>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Type de cuisine
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {place.restaurant_data.type_cuisine}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Étoiles</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {place.restaurant_data.stars}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Prix moyen
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }).format(place.restaurant_data.price)}
                  </dd>
                </div>
              </>
            )}

            {place.type === "Musée" && (
              <>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Courant artistique
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {place.museum_data.art_movement}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Type d&apos;art
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {place.museum_data.art_type}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Gratuit</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {place.museum_data.free}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Prix</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }).format(place.museum_data?.price || 0)}
                  </dd>
                </div>
              </>
            )}

            {place.type === "Bar" && (
              <>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Type de bar
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {place.bar_data.bar_type}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Prix moyen
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }).format(place.bar_data.price)}
                  </dd>
                </div>
              </>
            )}

            {place.type === "Parc" && (
              <>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    Type de parc
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {place.park_data.park_type}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Public</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {place.park_data.public}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Gratuit</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {place.park_data.free}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Prix</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }).format(place.park_data?.price || 0)}
                  </dd>
                </div>
              </>
            )}

            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900">{place.address}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Ville</dt>
              <dd className="mt-1 text-sm text-gray-900">{place.city}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Code postal</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {place.postal_code}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Pays</dt>
              <dd className="mt-1 text-sm text-gray-900">{place.country}</dd>
            </div>
          </dl>
        </div>
        <div>
          <div className="flex justify-center items-center gap-3 bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg">
            <Link href={`/edit/${place._id}`}>
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
              >
                Modifier
              </button>
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
