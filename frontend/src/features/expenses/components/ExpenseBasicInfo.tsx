import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { CreateExpenseInput } from "../types";

interface ExpenseBasicInfoProps {
  register: UseFormRegister<CreateExpenseInput>;
  errors: FieldErrors<CreateExpenseInput>;

  splitType: "EQUAL" | "EXACT" | "PERCENTAGE";

  onSplitTypeChange: (
    value: "EQUAL" | "EXACT" | "PERCENTAGE"
  ) => void;
}

export function ExpenseBasicInfo({
  register,
  errors,
  splitType,
  onSplitTypeChange,
}: ExpenseBasicInfoProps) {
  return (
    <div className="space-y-5">

      <div>

        <label className="mb-1 block font-medium">
          Title
        </label>

        <input
          {...register("title")}
          className="w-full rounded-lg border p-3"
        />

        <p className="text-sm text-red-500">
          {errors.title?.message}
        </p>

      </div>

      <div>

        <label className="mb-1 block font-medium">
          Description
        </label>

        <textarea
          rows={3}
          {...register("description")}
          className="w-full rounded-lg border p-3"
        />

      </div>

      <div>

        <label className="mb-1 block font-medium">
          Amount
        </label>

        <input
          type="number"
          {...register("amount")}
          className="w-full rounded-lg border p-3"
        />

        <p className="text-sm text-red-500">
          {errors.amount?.message}
        </p>

      </div>

      <div>

        <label className="mb-1 block font-medium">
          Split Type
        </label>

        <select
          value={splitType}
          onChange={(e) =>
            onSplitTypeChange(
              e.target.value as
                | "EQUAL"
                | "EXACT"
                | "PERCENTAGE"
            )
          }
          className="w-full rounded-lg border p-3"
        >
          <option value="EQUAL">
            Equal
          </option>

          <option value="EXACT">
            Exact
          </option>

          <option value="PERCENTAGE">
            Percentage
          </option>

        </select>

      </div>

    </div>
  );
}