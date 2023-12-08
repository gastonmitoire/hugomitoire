"use client";
import React from "react";
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

import { Chapter as ChapterModel } from "@prisma/client";

interface ChapterFormProps {
  initialValues?: ChapterModel;
  bookId: string;
  currentOrder: number;
}

const schema = yup.object().shape({
  title: yup.string().required(),
  order: yup.string().required(),
  type: yup.string(),
  bookId: yup.string().required(),
});

type ChapterFormValues = yup.InferType<typeof schema>;

const resolver: Resolver<ChapterFormValues> = yupResolver(schema);

export const ChapterForm: React.FC<ChapterFormProps> = ({
  initialValues,
  bookId,
  currentOrder,
}) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<ChapterFormValues>({
    resolver,
    defaultValues: {
      title: "",
      order: (currentOrder + 1).toString(),
      type: "",
      bookId: bookId,
    },
  });

  const onSubmit: SubmitHandler<ChapterFormValues> = async (data) => {
    try {
      console.log("SUBMIT DATA: ", data);
    } catch (error) {
      console.log("SUBMIT ERROR: ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-1 dark"
    >
      <Controller
        name="order"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Order"
            placeholder="Order"
            type="number"
            fullWidth
            size="lg"
            variant="bordered"
            validationState={errors.order?.message ? "invalid" : "valid"}
            errorMessage={errors.order?.message}
          />
        )}
      />
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
        name="bookId"
        control={control}
        render={() => <input type="hidden" />}
      />

      <Button type="submit" size="sm">
        Crear
      </Button>
    </form>
  );
};
