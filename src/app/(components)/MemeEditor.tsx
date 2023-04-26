"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { MemeDisplay } from "./MemeDisplay";

import { MemeTemplate } from "@/app/(data)/types";

const textValues = (template: MemeTemplate) =>
  template.textareas.reduce(
    (values, ta) => ({
      ...values,
      [ta.id]: ta.text,
    }),
    {} as Record<string, string>
  );

export const MemeEditor = ({ templates }: { templates: MemeTemplate[] }) => {
  const { register, handleSubmit, watch, setValue } = useForm<{
    template: string;
    values: Record<string, string>;
  }>({
    defaultValues: {
      template: templates[0].id,
      values: textValues(templates[0]),
    },
  });

  const templateId = watch("template");
  const template = templates.find((template) => template.id === templateId)!;

  const values = watch("values");

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const onSubmit = async (data: {
    template: string;
    values: Record<string, string>;
  }) => {
    await fetch("http://localhost:3000/api/memes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        template: data.template,
        values: data.values,
      }),
    });
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid xs:grid-cols-1 md:grid-cols-[60%_40%]">
        <MemeDisplay template={template} values={values} />
        <div className="px-2">
          <select
            className="select select-bordered w-full"
            value={templateId}
            onChange={(evt) => {
              const newTemplate = templates.find(
                (template) => template.id === evt.target.value
              )!;

              setValue("template", newTemplate.id);
              setValue("values", textValues(newTemplate));
            }}
          >
            <option disabled>Pick your template</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.id}
              </option>
            ))}
          </select>
          {template.textareas.map((textarea, index) => (
            <div key={index} className="mt-5">
              <label htmlFor={textarea.id}>{textarea.id}</label>
              <div>
                <input
                  className="input w-full input-bordered"
                  type="text"
                  {...register(`values.${textarea.id}`)}
                />
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <button
              className="btn btn-accent mt-5 min-w-[200px]"
              type="submit"
              disabled={isPending}
            >
              Let&apos;s Go!
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
