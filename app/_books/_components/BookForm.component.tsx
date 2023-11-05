"use client";
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button, Input, Image } from "@nextui-org/react";
import { XMarkIcon } from "@heroicons/react/20/solid";

import { DropdownZone } from "@/app/_images/_components/DropdownZone";

import {
  Book as BookModel,
  Genre as GenreModel,
  Image as ImageModel,
  User as UserModel,
} from "@prisma/client";

interface BookFormProps {
  initialValues?: BookModel;
  images: ImageModel[];
  users: UserModel[];
  genres: GenreModel[];
}

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  type: yup.string().required(),
  publicationDate: yup.date().required(),
  cover: yup.string().required(),
  secondaryImage: yup.string().required(),
  genreId: yup.string().required(),
  illustratorId: yup.string().required(),
  publisherId: yup.string().required(),
});

type BookFormValues = yup.InferType<typeof schema>;

const resolver: Resolver<BookFormValues> = yupResolver(schema);

export const BookForm: React.FC<BookFormProps> = ({
  initialValues,
  images,
  users,
  genres,
}) => {
  const [cover, setCover] = useState<string>("");
  const [secondaryImage, setSecondaryImage] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<BookFormValues>({
    resolver,
    defaultValues: {
      title: "",
      description: "",
      type: "",
      publicationDate: undefined,
      cover: "",
      secondaryImage: "",
      genreId: "",
      illustratorId: "",
      publisherId: "",
    },
  });

  const onSubmit: SubmitHandler<BookFormValues> = (data) => {
    console.log(data);
  };

  const handleCoverChange = (file: FileList | File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const previewURL = e.target.result;
          setCover(previewURL as string);
        }
      };
      reader.readAsDataURL(file instanceof File ? file : file[0]);
    }
  };

  const handleSecondaryImageChange = (file: FileList | File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const previewURL = e.target.result;
          setSecondaryImage(previewURL as string);
        }
      };
      reader.readAsDataURL(file instanceof File ? file : file[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-5 gap-5">
      <span className="col-span-5 flex justify-end">
        <Button
          type="submit"
          color="primary"
          variant={isValid ? "shadow" : "flat"}
          disabled={!isDirty || !isValid}
        >
          Crear libro
        </Button>
      </span>

      <fieldset className="col-span-3">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Title"
              placeholder="Title"
              fullWidth
              size="lg"
              validationState={errors.title?.message ? "invalid" : "valid"}
              errorMessage={errors.title?.message}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Description"
              placeholder="Description"
              fullWidth
              size="lg"
              validationState={
                errors.description?.message ? "invalid" : "valid"
              }
              errorMessage={errors.description?.message}
            />
          )}
        />

        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Type"
              placeholder="Type"
              fullWidth
              size="lg"
              validationState={errors.type?.message ? "invalid" : "valid"}
              errorMessage={errors.type?.message}
            />
          )}
        />

        <Controller
          name="genreId"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Genre Id"
              placeholder="Genre Id"
              fullWidth
              size="lg"
              validationState={errors.genreId?.message ? "invalid" : "valid"}
              errorMessage={errors.genreId?.message}
            />
          )}
        />

        <Controller
          name="illustratorId"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Illustrator Id"
              placeholder="Illustrator Id"
              fullWidth
              size="lg"
              validationState={
                errors.illustratorId?.message ? "invalid" : "valid"
              }
              errorMessage={errors.illustratorId?.message}
            />
          )}
        />

        <Controller
          name="publisherId"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Publisher Id"
              placeholder="Publisher Id"
              fullWidth
              size="lg"
              validationState={
                errors.publisherId?.message ? "invalid" : "valid"
              }
              errorMessage={errors.publisherId?.message}
            />
          )}
        />
      </fieldset>

      <fieldset className="col-span-2">
        <DropdownZone onDrop={handleCoverChange}>
          <div className="relative flex h-full items-center justify-center">
            {cover ? (
              <>
                <Button
                  color="primary"
                  variant="ghost"
                  isIconOnly
                  className="absolute right-0 top-0"
                  onClick={() => setCover("")}
                >
                  <XMarkIcon className="h-6 w-6" />
                </Button>
                <Image src={cover} width={200} height={200} alt="Cover" />
              </>
            ) : (
              <span className="text-center">
                <p>Arrastra una imagen</p>
                <p>o</p>
                <p>Click para seleccionar</p>
              </span>
            )}
          </div>
        </DropdownZone>
      </fieldset>
    </form>
  );
};
