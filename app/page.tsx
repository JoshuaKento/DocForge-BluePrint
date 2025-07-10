'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  projectName: z.string(),
  problem: z.string(),
  persona: z.string(),
  kpi: z.string(),
  authorName: z.string(),
  license: z.enum(['MIT', 'Apache-2.0', 'GPL-3.0']),
  gitToken: z.string().optional(),
  generatePdf: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function Home() {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    const res = await fetch('/api/gen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'docs.zip';
    a.click();
  };

  if (step === 2) {
    return (
      <div className="p-8 space-y-4">
        <button onClick={() => setStep(1)} className="underline">
          Back
        </button>
        <button onClick={handleSubmit(onSubmit)} className="bg-blue-500 px-4 py-2 text-white">
          Generate
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(() => setStep(2))} className="p-8 space-y-4">
      <input placeholder="Project Name" {...register('projectName')} className="border p-2 w-full" />
      {errors.projectName && <p className="text-red-500">Required</p>}
      <textarea placeholder="Problem" {...register('problem')} className="border p-2 w-full" />
      <input placeholder="Persona" {...register('persona')} className="border p-2 w-full" />
      <input placeholder="KPI" {...register('kpi')} className="border p-2 w-full" />
      <input placeholder="Author Name" {...register('authorName')} className="border p-2 w-full" />
      <select {...register('license')} className="border p-2 w-full">
        <option value="MIT">MIT</option>
        <option value="Apache-2.0">Apache-2.0</option>
        <option value="GPL-3.0">GPL-3.0</option>
      </select>
      <input placeholder="GitHub Token" {...register('gitToken')} className="border p-2 w-full" />
      <label className="flex items-center gap-2">
        <input type="checkbox" {...register('generatePdf')} /> Generate PDF
      </label>
      <button type="submit" className="bg-blue-500 px-4 py-2 text-white">
        Next
      </button>
    </form>
  );
}
