import {
  useForm,
  type Resolver,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  createSettlementSchema,
  type CreateSettlementInput,
} from "../validation";

import { useCreateSettlement } from "../hooks";

import type { Member } from "../../groups/types";
import { useAuthStore } from "../../../stores/authStore";

interface Props {
  open: boolean;
  groupId: string;
  members: Member[];
  onClose: () => void;
}

export function CreateSettlementModal({
  open,
  groupId,
  members,
  onClose,
}: Props) {
  const mutation =
    useCreateSettlement(groupId);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<CreateSettlementInput>({
    resolver: zodResolver(createSettlementSchema) as Resolver<CreateSettlementInput>,
  });

  const currentUser =
    useAuthStore(
        (state) => state.user
    );

    members = members
    .filter(
        member =>
            member.user.id !==
            currentUser?.id
    )


  if (!open) return null;

  async function submit(
    data: CreateSettlementInput
  ) {
    try {
      const response =
        await mutation.mutateAsync(data);

      toast.success(response.message);

      reset();

      onClose();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Unable to create settlement"
      );
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-xl bg-white p-6">

        <h2 className="mb-6 text-2xl font-bold">
          Record Settlement
        </h2>

        <form
          onSubmit={handleSubmit(
            submit
          )}
          className="space-y-5"
        >

          <div>

            <label className="mb-2 block font-medium">
              Receiver
            </label>

            <select
              {...register(
                "receiverId"
              )}
              className="w-full rounded-lg border p-3"
            >
              <option value="">
                Select Member
              </option>

              
              {members.map((member) => (
                <option
                  key={
                    member.user.id
                  }
                  value={
                    member.user.id
                  }
                >
                  {member.user.name}
                  {member.user.email}
                </option>
              ))}

            </select>

            <p className="mt-1 text-sm text-red-500">
              {
                errors.receiverId
                  ?.message
              }
            </p>

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Amount
            </label>

            <input
              type="number"
              {...register("amount")}
              className="w-full rounded-lg border p-3"
            />

            <p className="mt-1 text-sm text-red-500">
              {
                errors.amount
                  ?.message
              }
            </p>

          </div>

          <div>
            <label className="mb-2 block font-medium">
                Description (Optional)
            </label>

            <textarea
                rows={3}
                {...register("description")}
                className="w-full rounded-lg border p-3"
                placeholder="Dinner settled, Cash paid, UPI transfer..."
            />

            <p className="mt-1 text-sm text-red-500">
                {errors.description?.message}
            </p>
        </div>

          <div className="flex justify-end gap-3">

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
              className="rounded-lg bg-blue-600 px-5 py-2 text-white"
            >
              {mutation.isPending
                ? "Recording..."
                : "Record"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}