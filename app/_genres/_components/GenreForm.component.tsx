"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";

import { Button, Input } from "@nextui-org/react";

import { genresService } from "../_service/genres.service";

const schema = yup.object().shape({
  name: yup.string().required(),
  ageRange: yup.string().required(),
});

type GenreFormValues = yup.InferType<typeof schema>;

const resolver: Resolver<GenreFormValues> = yupResolver(schema);

export const GenreForm: React.FC = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GenreFormValues>({
    resolver,
    defaultValues: {
      name: "",
      ageRange: "",
    },
  });

  const onSubmit: SubmitHandler<GenreFormValues> = async (data) => {
    try {
      await genresService.create(data);
      toast.success("Genre created successfully");

      reset();
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Title"
            placeholder="Title"
            fullWidth
            size="lg"
            variant="bordered"
            validationState={errors.name?.message ? "invalid" : "valid"}
            errorMessage={errors.name?.message}
          />
        )}
      />
      <Controller
        name="ageRange"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Age Range"
            placeholder="Age Range"
            fullWidth
            size="lg"
            variant="bordered"
            validationState={errors.ageRange?.message ? "invalid" : "valid"}
            errorMessage={errors.ageRange?.message}
          />
        )}
      />

      <Button type="submit">Create</Button>
    </form>
  );
};
