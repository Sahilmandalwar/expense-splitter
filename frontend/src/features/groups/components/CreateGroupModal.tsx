import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createGroupSchema,
  type CreateGroupInput,
} from "../validation";

import { useCreateGroup } from "../hooks";

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateGroupModal({
  isOpen,
  onClose,
}: CreateGroupModalProps) {
  const { mutateAsync, isPending } = useCreateGroup();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateGroupInput>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: CreateGroupInput) => {
    await mutateAsync(data);

    reset();

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold">
          Create Group
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <label>Group Name</label>

            <input
              {...register("name")}
              className="mt-1 w-full rounded border p-2"
            />

            <p className="text-sm text-red-500">
              {errors.name?.message}
            </p>
          </div>

          <div>
            <label>Description</label>

            <textarea
              rows={3}
              {...register("description")}
              className="mt-1 w-full rounded border p-2"
            />

            <p className="text-sm text-red-500">
              {errors.description?.message}
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded border px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              {isPending
                ? "Creating..."
                : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}