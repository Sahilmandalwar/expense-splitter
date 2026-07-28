import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  addMemberSchema,
  type AddMemberInput,
} from "../validation";

import { useAddMember } from "../hooks";

interface AddMemberModalProps {
  open: boolean;
  groupId: string;
  onClose: () => void;
}

export function AddMemberModal({
  open,
  groupId,
  onClose,
}: AddMemberModalProps) {
  const mutation = useAddMember(groupId);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<AddMemberInput>({
    resolver: zodResolver(addMemberSchema),
  });

  if (!open) return null;

  async function onSubmit(
    data: AddMemberInput
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
          "Unable to add member"
      );
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-xl bg-white p-6">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Add Member
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ✕
          </button>

        </div>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-5"
        >

          <div>

            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              {...register("email")}
              placeholder="member@email.com"
              className="w-full rounded-lg border p-3"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.email?.message}
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
                mutation.isPending ||
                isSubmitting
              }
              className="rounded-lg bg-blue-600 px-5 py-2 text-white disabled:bg-gray-400"
            >
              {mutation.isPending
                ? "Adding..."
                : "Add Member"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}