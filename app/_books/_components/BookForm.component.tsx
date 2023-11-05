"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";

import {
  Button,
  Input,
  Image,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { XMarkIcon } from "@heroicons/react/20/solid";

import { DropdownZone } from "@/app/_images/_components/DropdownZone";

import { booksService } from "../_service/books.service";
import { imagesService } from "@/app/_images/_service/images.service";

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
      publicationDate: "",
      genreId: "",
      illustratorId: "",
      publisherId: "",
    },
  });

  const onSubmit: SubmitHandler<BookFormValues> = async (data) => {
    console.log(data);
    // if (!cover || !secondaryImage) {
    //   toast.error("Debes seleccionar una imagen y una imagen secundaria", {
    //     duration: 3000,
    //   });
    //   return;
    // }
    // // Crear un objeto FormData para enviar la imagen al servidor
    // const formData = new FormData();
    // formData.append("images", cover);
    // formData.append("images", secondaryImage);

    // const createdImages = (await imagesService.create(
    //   formData
    // )) as unknown as ImageModel[];

    // // Obtener urls de las imágenes creadas
    // const coverUrl = createdImages[0].url;
    // const secondaryImageUrl = createdImages[1].url;

    // // Formatear date a type Date

    // const formattedData = {
    //   ...data,
    //   cover: coverUrl,
    //   secondaryImage: secondaryImageUrl,
    //   publicationDate: new Date(data.publicationDate),
    // };

    // const createdBook = await booksService.create(formattedData);

    // if (createdBook) {
    //   toast.success("Libro creado con éxito", { duration: 3000 });
    // }
  };

  const handleCoverChange = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const previewURL = e.target.result;
          setCover(previewURL as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSecondaryImageChange = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const previewURL = e.target.result;
          setSecondaryImage(previewURL as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col gap-5"
    >
      <span className="col-span-5 flex justify-end">
        <Button type="submit" color="primary">
          Crear libro
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
              <Input
                {...field}
                label="Genre Id"
                placeholder="Genre Id"
                fullWidth
                size="lg"
                variant="bordered"
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
                variant="bordered"
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
              <Select
                {...field}
                items={users}
                label="Publisher Id"
                placeholder="Publisher Id"
                fullWidth
                size="lg"
                variant="bordered"
                validationState={
                  errors.publisherId?.message ? "invalid" : "valid"
                }
                errorMessage={errors.publisherId?.message}
              >
                {(user) => (
                  <SelectItem key={user.id} textValue={user.id}>
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
          <DropdownZone onDrop={handleCoverChange} className="flex-1">
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
                  <p>Arrastra o selecciona la tapa del libro</p>
                </span>
              )}
            </div>
          </DropdownZone>

          <DropdownZone
            onDrop={handleSecondaryImageChange}
            className="flex-0 min-h-[30%]"
          >
            <div className="relative flex h-full items-center justify-center">
              {secondaryImage ? (
                <>
                  <Button
                    color="primary"
                    variant="ghost"
                    isIconOnly
                    className="absolute right-0 top-0"
                    onClick={() => setSecondaryImage("")}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </Button>
                  <Image
                    src={secondaryImage}
                    width={200}
                    height={200}
                    alt="Secondary Image"
                  />
                </>
              ) : (
                <span className="text-center">
                  <p>Arrastra o selecciona la imagen secundaria del libro</p>
                </span>
              )}
            </div>
          </DropdownZone>
        </fieldset>
      </div>
    </form>
  );
};
