"use client";
import { useCreatePlace, useUpdatePlace } from "@/hooks";
import { Place, placeSchema } from "@/types/place";
import { useFormik } from "formik";
import AppLoader from "./loader";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type PlaceFormProps = {
  place?: Place;
};

const PlaceForm: React.FC<PlaceFormProps> = ({ place }) => {
  const { mutate: create, isLoading } = useCreatePlace();
  const { mutate: update, isLoading: isUpdating } = useUpdatePlace();
  const router = useRouter();
  const handleFormSubmit = (values: Place) => {
    const fn = values._id ? update : create;

    fn(values, {
      onSuccess: () => {
        formik.resetForm();
        router.push("/");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      _id: place?._id,
      type: place?.type || "",
      place_name: place?.place_name || "",
      address: place?.address || "",
      city: place?.city || "",
      postal_code: place?.postal_code || "",
      country: place?.country || "",
      restaurant_data: place?.restaurant_data || ({} as any),
      museum_data: place?.museum_data || ({} as any),
      bar_data: place?.bar_data || ({} as any),
      park_data: place?.park_data || ({} as any),
    },
    validationSchema: placeSchema,
    onSubmit: handleFormSubmit,
  });

  console.log(formik.errors);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {place?._id ? "Modifier" : "Ajouter"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
            </p>
          </div>

          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Type de lieu
              </label>
              <select
                id="type"
                name="type"
                autoComplete="type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.type}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Choisir un type
                </option>
                <option>Restaurant</option>
                <option>Musée</option>
                <option>Bar</option>
                <option>Parc</option>
              </select>
              {formik.touched.type && formik.errors.type ? (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.type}
                </div>
              ) : null}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="place_name"
                className="block text-sm font-medium text-gray-700"
              >
                Nom du lieu
              </label>
              <input
                type="text"
                name="place_name"
                id="place_name"
                autoComplete="place-name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.place_name}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {formik.touched.place_name && formik.errors.place_name ? (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.place_name}
                </div>
              ) : null}
            </div>

            {formik.values.type == "Restaurant" && (
              <>
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="restaurant_data.type_cuisine"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type de cuisine
                  </label>
                  <input
                    type="text"
                    name="restaurant_data.type_cuisine"
                    id="restaurant_data.type_cuisine"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values?.restaurant_data?.type_cuisine}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {formik.touched?.restaurant_data?.type_cuisine &&
                  formik.errors?.restaurant_data?.type_cuisine ? (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors?.restaurant_data?.type_cuisine}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="restaurant_data.stars"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre d&apos;étoiles
                  </label>
                  <input
                    type="number"
                    name="restaurant_data.stars"
                    id="restaurant_data.stars"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.restaurant_data?.stars}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {formik.touched.restaurant_data?.stars &&
                  formik.errors.restaurant_data?.stars ? (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.restaurant_data?.stars}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="restaurant_data.price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Prix moyen
                  </label>
                  <input
                    type="number"
                    name="restaurant_data.price"
                    id="restaurant_data.price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.restaurant_data?.price}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {formik.touched.restaurant_data?.price &&
                  formik.errors.restaurant_data?.price ? (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.restaurant_data?.price}
                    </div>
                  ) : null}
                </div>
              </>
            )}

            {formik.values.type == "Musée" && (
              <>
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="museum_data.art_movement"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Courant artistique
                  </label>
                  <input
                    type="text"
                    name="museum_data.art_movement"
                    id="museum_data.art_movement"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values?.museum_data?.art_movement}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {formik.touched?.museum_data?.art_movement &&
                  formik.errors?.museum_data?.art_movement ? (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors?.museum_data?.art_movement}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="museum_data.art_type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type d&apos;art
                  </label>
                  <input
                    type="text"
                    name="museum_data.art_type"
                    id="museum_data.art_type"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.museum_data?.art_type}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {formik.touched.museum_data?.art_type &&
                  formik.errors.museum_data?.art_type ? (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.museum_data?.art_type}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-6 sm:col-span-1">
                  <label
                    htmlFor="museum_data.free"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gratuit ?
                  </label>
                  <select
                    id="museum_data.free"
                    name="museum_data.free"
                    autoComplete="museum_data.free"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values?.museum_data?.free}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="" disabled>
                      Gratuit
                    </option>
                    <option>Oui</option>
                    <option>Non</option>
                  </select>
                </div>
                {formik.values?.museum_data?.free === "Non" && (
                  <div className="col-span-6 sm:col-span-1">
                    <label
                      htmlFor="museum_data.price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Prix
                    </label>
                    <input
                      type="number"
                      name="museum_data.price"
                      id="museum_data.price"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values?.museum_data?.price}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {formik.touched?.museum_data?.price &&
                    formik.errors?.museum_data?.price ? (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors?.museum_data?.price}
                      </div>
                    ) : null}
                  </div>
                )}
              </>
            )}

            {formik.values.type == "Bar" && (
              <>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="bar_data.bar_type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type de bar
                  </label>
                  <input
                    type="text"
                    name="bar_data.bar_type"
                    id="bar_data.bar_type"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values?.bar_data?.bar_type}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {formik.touched?.bar_data?.bar_type &&
                  formik.errors?.bar_data?.bar_type ? (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors?.bar_data?.bar_type}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="bar_data.price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Prix moyen
                  </label>
                  <input
                    type="number"
                    name="bar_data.price"
                    id="bar_data.price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values?.bar_data?.price}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {formik.touched?.bar_data?.price &&
                  formik.errors?.bar_data?.price ? (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors?.bar_data?.price}
                    </div>
                  ) : null}
                </div>
              </>
            )}

            {formik.values.type == "Parc" && (
              <>
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="park_data.park_type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type de parc
                  </label>
                  <input
                    type="text"
                    name="park_data.park_type"
                    id="park_data.park_type"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values?.park_data?.park_type}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {formik.touched?.park_data?.park_type &&
                  formik.errors?.park_data?.park_type ? (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors?.park_data?.park_type}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="park_data.public"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Public ou privé
                  </label>
                  <select
                    id="park_data.public"
                    name="park_data.public"
                    autoComplete="park_data.public"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values?.park_data?.public}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="" disabled>
                      Choisir un type
                    </option>
                    <option>Public</option>
                    <option>Privé</option>
                  </select>
                  {formik.touched?.park_data?.public &&
                  formik.errors?.park_data?.public ? (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors?.park_data?.public}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-6 sm:col-span-1">
                  <label
                    htmlFor="park_data.free"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gratuit
                  </label>
                  <select
                    id="park_data.free"
                    name="park_data.free"
                    autoComplete="park_data.free"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values?.park_data?.free}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="" disabled>
                      Choisir un type
                    </option>
                    <option>Oui</option>
                    <option>Non</option>
                  </select>
                  {formik.touched?.park_data?.free &&
                  formik.errors?.park_data?.free ? (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors?.park_data?.free}
                    </div>
                  ) : null}
                </div>
                {formik.values?.park_data?.free === "Non" && (
                  <div className="col-span-6 sm:col-span-1">
                    <label
                      htmlFor="park_data.price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Prix
                    </label>
                    <input
                      type="number"
                      name="park_data.price"
                      id="park_data.price"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values?.park_data?.price}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {formik.touched?.park_data?.price &&
                    formik.errors?.park_data?.price ? (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors?.park_data.price}
                      </div>
                    ) : null}
                  </div>
                )}
              </>
            )}

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Adresse
              </label>
              <input
                type="text"
                name="address"
                id="address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                autoComplete="address"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.address}
                </div>
              ) : null}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                Ville
              </label>
              <input
                type="text"
                name="city"
                id="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                autoComplete="city"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {formik.touched.city && formik.errors.city ? (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.city}
                </div>
              ) : null}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="postal_code"
                className="block text-sm font-medium text-gray-700"
              >
                Code postal
              </label>
              <input
                type="text"
                name="postal_code"
                id="postal_code"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.postal_code}
                autoComplete="postal_code"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {formik.touched.postal_code && formik.errors.postal_code ? (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.postal_code}
                </div>
              ) : null}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Pays
              </label>
              <input
                type="text"
                name="country"
                id="country"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {formik.touched.country && formik.errors.country ? (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.country}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading || isUpdating ? <AppLoader /> : null}
            {place?._id ? "Modifier" : "Ajouter"}
          </button>

          {place?._id && (
            <Link href={`/details/${place?._id}`}>
              <button
                type="button"
                className="bg-red-600 mx-1 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Annuler
              </button>
            </Link>
          )}
        </div>
      </div>
    </form>
  );
};

export default PlaceForm;
