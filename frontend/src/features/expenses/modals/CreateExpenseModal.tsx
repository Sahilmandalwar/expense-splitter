import { useState } from "react";
import {
  useForm,
  type Resolver,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import type { Member } from "../../groups/types";

import {
  createExpenseSchema,
  type CreateExpenseInput,
} from "../validation";

import { ExpenseBasicInfo } from "../components/ExpenseBasicInfo";
import { ParticipantSelector } from "../components/ParticipantSelector";
import { useCreateExpense } from "../hooks";

interface Props {
  open: boolean;
  groupId: string;
  members: Member[];
  onClose: () => void;
}

export function CreateExpenseModal({
  open,
  groupId,
  members,
  onClose,
}: Props) {
  const [splitType, setSplitType] =
    useState<
      "EQUAL" | "EXACT" | "PERCENTAGE"
    >("EQUAL");



 const {
  register,
  handleSubmit,
  reset,
  watch,
  setValue,
  formState: { errors },
} = useForm<CreateExpenseInput>({
  resolver: zodResolver(createExpenseSchema) as Resolver<CreateExpenseInput>,

  defaultValues: {
    title: "",
    description: "",
    amount: 0,
    splitType: "EQUAL",
    participants: [],
  },
});

const participants = watch("participants");

  const mutation =
    useCreateExpense(groupId);

  if (!open) return null;

  async function submit(
    data: CreateExpenseInput
  ) {
    try {
      await mutation.mutateAsync({
        ...data,
        splitType,
        participants,
      });

      toast.success(
        "Expense created successfully."
      );

      reset();

      setValue("participants", []);

      setSplitType("EQUAL");

      onClose();
    } catch (error) {
      toast.error(
        "Unable to create expense."
      );
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6">

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Add Expense
            </h2>

            <p className="text-sm text-gray-500">
              {
                participants.length
              }{" "}
              participant(s)
              selected
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ✕
          </button>

        </div>

        <form
          onSubmit={handleSubmit(
            submit
          )}
          className="space-y-8"
        >

          <ExpenseBasicInfo
            register={register}
            errors={errors}
            splitType={splitType}
            onSplitTypeChange={
              setSplitType
            }
          />

          <ParticipantSelector
            members={members}
            splitType={splitType}
            participants={participants}
            setParticipants={(value) => {
                const next =
                typeof value === "function"
                    ? value(participants)
                    : value;

                setValue("participants", next);
            }}
            />

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                mutation.isPending
              }
              className="rounded-lg bg-blue-600 px-5 py-2 text-white disabled:bg-gray-400"
            >
              {mutation.isPending
                ? "Creating..."
                : "Create Expense"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}