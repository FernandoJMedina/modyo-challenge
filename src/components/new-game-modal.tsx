import { AnimatePresence, motion } from "framer-motion";

import { SubmitHandler, useForm } from "react-hook-form";
import { cn } from "../lib/utils";
import { memo, useState } from "react";

interface NewGameModalProps {
  visible: boolean;
  onClose: () => void;
}

type Input = {
  name: string;
};

export const NewGameModal = memo(({ visible, onClose }: NewGameModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const [player] = useState(() => localStorage.getItem("player"));

  const onSubmit: SubmitHandler<Input> = (data) => {
    localStorage.setItem("player", data.name);
    onClose();
  };

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          layout
          className="backdrop-blur absolute z-10 flex justify-center items-center inset-0 mx-auto"
        >
          <div className="bg-white rounded-xl p-4 sm:p-10 font-sans w-80">
            <h2 className="text-center font-semibold text-2xl">New game</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                defaultValue={player ?? undefined}
                {...register("name", { required: true })}
                placeholder="Enter your name"
                className={cn(
                  "w-full p-3 border rounded-xl my-4",
                  errors?.name && "border-red-500 outline-red-500"
                )}
              />

              {errors.name && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500"
                >
                  This field is required
                </motion.span>
              )}
              <button className="p-3 bg-green-400 rounded-xl w-full mt-5 text-white">
                Play!
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
