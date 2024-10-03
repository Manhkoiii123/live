import { Check } from "lucide-react";

export const VerifiedMark = () => {
  return (
    <div className="p-0.5 flex items-center justify-center h-4 w-4 bg-blue-600 rounded-full">
      <Check className="h-[10px] w-[10px] text-white stroke-[4px]" />
    </div>
  );
};
