"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";

import {
  Avatar,
  Button,
  Input,
  Image,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { XMarkIcon } from "@heroicons/react/20/solid";

import { booksService } from "../_service/books.service";

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
  publicationDate: yup.string().required(),
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
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<BookFormValues>({
    resolver,
    defaultValues: {
      title: "",
      description: "",
      type: "",
      publicationDate: "",
      cover: "",
      secondaryImage: "",
      genreId: "",
      illustratorId: "",
      publisherId: "",
    },
  });

  const watchCover = watch("cover");

  console.log(watchCover);

  const onSubmit: SubmitHandler<BookFormValues> = async (data) => {
    // Formatear date a type Date
    const formattedData = {
      ...data,
      publicationDate: new Date(data.publicationDate),
    };

    const createdBook = await booksService.create(formattedData);

    if (createdBook) {
      toast.success("Libro creado con éxito", { duration: 3000 });
    }

    setTimeout(() => {
      router.push("/admin/books");
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col gap-5"
    >
      <span className="col-span-5 flex justify-end">
        <Button type="submit" color="primary">
          Create
        </Button>
      </span>

      <div className="grid h-full grid-cols-5 gap-5">
        <fieldset className="col-span-3 flex flex-col gap-5">
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
                variant="bordered"
                validationState={errors.title?.message ? "invalid" : "valid"}
                errorMessage={errors.title?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                label="Description"
                placeholder="Description"
                fullWidth
                size="lg"
                variant="bordered"
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
                variant="bordered"
                validationState={errors.type?.message ? "invalid" : "valid"}
                errorMessage={errors.type?.message}
              />
            )}
          />

          <Controller
            name="genreId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                items={genres}
                label="Genre"
                placeholder="Genre"
                fullWidth
                size="lg"
                variant="bordered"
                validationState={errors.genreId?.message ? "invalid" : "valid"}
                errorMessage={errors.genreId?.message}
              >
                {(genre) => (
                  <SelectItem
                    key={genre.id}
                    value={genre.id}
                    textValue={genre.name}
                  >
                    {genre.name}
                  </SelectItem>
                )}
              </Select>
            )}
          />

          <Controller
            name="illustratorId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                items={users}
                label="Illustrator"
                placeholder="Illustrator"
                fullWidth
                size="lg"
                variant="bordered"
                validationState={
                  errors.illustratorId?.message ? "invalid" : "valid"
                }
                errorMessage={errors.illustratorId?.message}
              >
                {(user) => (
                  <SelectItem
                    key={user.id}
                    value={user.id}
                    textValue={user.username}
                  >
                    {user.username}
                  </SelectItem>
                )}
              </Select>
            )}
          />

          <Controller
            name="publisherId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                items={users}
                label="Publisher"
                placeholder="Publisher"
                fullWidth
                size="lg"
                variant="bordered"
                validationState={
                  errors.publisherId?.message ? "invalid" : "valid"
                }
                errorMessage={errors.publisherId?.message}
              >
                {(user) => (
                  <SelectItem
                    key={user.id}
                    value={user.id}
                    textValue={user.username}
                  >
                    {user.username}
                  </SelectItem>
                )}
              </Select>
            )}
          />

          <Controller
            name="publicationDate"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="date"
                label="Publication Date"
                placeholder="Publication Date"
                fullWidth
                size="lg"
                variant="bordered"
                validationState={
                  errors.publicationDate?.message ? "invalid" : "valid"
                }
                errorMessage={errors.publicationDate?.message}
              />
            )}
          />
        </fieldset>

        <fieldset className="col-span-2 flex h-full flex-col gap-5">
          <div>
            <Controller
              name="cover"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  items={images}
                  label="Cover"
                  placeholder="Cover"
                  fullWidth
                  size="lg"
                  variant="bordered"
                  validationState={errors.cover?.message ? "invalid" : "valid"}
                  errorMessage={errors.cover?.message}
                  renderValue={(items) => {
                    return items.map((item) => (
                      <div key={item.key} className="flex items-center gap-2">
                        <Avatar
                          alt={item.data?.filename}
                          className="flex-shrink-0"
                          size="sm"
                          src={item.data?.url}
                        />
                        <div className="flex flex-col">
                          <span>{item.data?.filename}</span>
                        </div>
                      </div>
                    ));
                  }}
                >
                  {(image) => (
                    <SelectItem
                      key={image.url}
                      value={image.url}
                      textValue={image.url}
                      startContent={
                        <Image
                          src={image.url}
                          width={50}
                          height={50}
                          alt={image.filename}
                        />
                      }
                    >
                      <div className="flex items-center justify-between">
                        <span>{image.filename}</span>
                      </div>
                    </SelectItem>
                  )}
                </Select>
              )}
            />
          </div>

          <Controller
            name="secondaryImage"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                items={images}
                label="Secondary Image"
                placeholder="Secondary Image"
                fullWidth
                size="lg"
                variant="bordered"
                validationState={
                  errors.secondaryImage?.message ? "invalid" : "valid"
                }
                errorMessage={errors.secondaryImage?.message}
                renderValue={(items) => {
                  return items.map((item) => (
                    <div key={item.key} className="flex items-center gap-2">
                      <Avatar
                        alt={item.data?.filename}
                        className="flex-shrink-0"
                        size="sm"
                        src={item.data?.url}
                      />
                      <div className="flex flex-col">
                        <span>{item.data?.filename}</span>
                      </div>
                    </div>
                  ));
                }}
              >
                {(image) => (
                  <SelectItem
                    key={image.url}
                    value={image.url}
                    textValue={image.url}
                    startContent={
                      <Image
                        src={image.url}
                        width={50}
                        height={50}
                        alt={image.filename}
                      />
                    }
                  >
                    <div className="flex items-center justify-between">
                      <span>{image.filename}</span>
                    </div>
                  </SelectItem>
                )}
              </Select>
            )}
          />
        </fieldset>
      </div>
    </form>
  );
};
