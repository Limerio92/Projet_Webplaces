import queryClient from "@/utils/query-client";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const AppFilters = () => {
  const params = useSearchParams();
  const { push } = useRouter();

  const formik = useFormik({
    initialValues: {
      type: "",
      restaurant_data: {
        type_cuisine: "",
        stars: 0,
        price: 0,
      },
      museum_data: {
        art_movement: "",
        art_type: "",
        free: "",
        price: 0,
      },
      bar_data: {
        bar_type: "",
        price: 0,
      },
      park_data: {
        park_type: "",
        public: "",
        free: "",
        price: 0,
      },
    },
    onSubmit: (values) => {
      const queryParams = new URLSearchParams();
      if (values.type) queryParams.append("type", values.type);
      let obj = {};

      switch (values.type) {
        case "Restaurant":
          obj = values.restaurant_data;
          break;
        case "Musée":
          obj = values.museum_data;
          break;
        case "Bar":
          obj = values.bar_data;
          break;
        case "Parc":
          obj = values.park_data;
          break;
      }

      Object.keys(obj).forEach((key) => {
        if (obj[key as never]) {
          queryParams.append(key, obj[key as never] as string);
        }
      });
      push("/?" + queryParams.toString());
    },
  });

  useEffect(() => {
    const type = params.get("type");
    if (type) {
      formik.setFieldValue("type", type ?? "");
    }
    const restaurant_data = {
      type_cuisine: params.get("type_cuisine") ?? "",
      stars: params.get("stars") ?? "",
      price: params.get("price") ?? "",
    };

    const museum_data = {
      art_movement: params.get("art_movement") ?? "",
      art_type: params.get("art_type") ?? "",
      free: params.get("free") ?? "",
      price: params.get("price") ?? "",
    };

    const bar_data = {
      bar_type: params.get("bar_type") ?? "",
      price: params.get("price") ?? "",
    };

    const park_data = {
      park_type: params.get("park_type") ?? "",
      public: params.get("public") ?? "",
      free: params.get("free") ?? "",
      price: params.get("price") ?? "",
    };

    formik.setFieldValue("restaurant_data", restaurant_data);
    formik.setFieldValue("museum_data", museum_data);
    formik.setFieldValue("bar_data", bar_data);
    formik.setFieldValue("park_data", park_data);
  }, [params]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col items-start gap-1"
    >
      <div className="w-full">
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
          <div className="text-red-500 text-xs mt-1">{formik.errors.type}</div>
        ) : null}
      </div>

      {formik.values.type == "Restaurant" && (
        <>
          <div className="w-full">
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
          </div>
          <div className="w-full">
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
          </div>
          <div className="w-full">
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
          </div>
        </>
      )}

      {formik.values.type == "Musée" && (
        <>
          <div className="w-full">
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
          </div>
          <div className="w-full">
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
          </div>
          <div className="w-full">
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
            <div className="w-full">
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
            </div>
          )}
        </>
      )}

      {formik.values.type == "Bar" && (
        <>
          <div className="w-full">
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
          </div>
          <div className="w-full">
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
          </div>
        </>
      )}

      {formik.values.type == "Parc" && (
        <>
          <div className="w-full">
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
          </div>
          <div className="w-full">
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
          </div>
          <div className="w-full">
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
          </div>
          {formik.values?.park_data?.free === "Non" && (
            <div className="w-full">
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
            </div>
          )}
        </>
      )}

      <button
        type="submit"
        className="bg-indigo-600 mt-1 w-full border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Appliquer
      </button>
      <Link
        href="/"
        onClick={() => {
          queryClient.invalidateQueries();
        }}
        className="text-indigo-600 w-full text-center decoration-indigo-600 decoration-1 underline"
      >
        Réinitialiser
      </Link>
    </form>
  );
};

export default AppFilters;
