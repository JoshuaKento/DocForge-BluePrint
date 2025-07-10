'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Stepper from './components/Stepper';
import Card from './components/Card';
import Input from './components/Input';
import Textarea from './components/Textarea';
import Button from './components/Button';
import MarkdownPreview from './components/MarkdownPreview';

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
    watch,
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

  const values = watch();
  const preview = `# ${values.projectName || ''}

${values.problem || ''}

## Persona
${values.persona || ''}

## KPI
${values.kpi || ''}

Author: ${values.authorName || ''}
License: ${values.license || ''}`;

  return (
    <div className="grid md:grid-cols-[200px_1fr] min-h-screen">
      <aside className="p-4 border-r border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900">
        <Stepper step={step} />
      </aside>
      <main className="p-4 space-y-4">
        {step === 1 && (
          <div className="grid md:grid-cols-2 gap-4">
            <form onSubmit={handleSubmit(() => setStep(2))} className="space-y-4">
              <Input placeholder="Project Name" {...register('projectName')} />
              {errors.projectName && <p className="text-red-500 text-sm">Required</p>}
              <Textarea placeholder="Problem" {...register('problem')} />
              <Input placeholder="Persona" {...register('persona')} />
              <Input placeholder="KPI" {...register('kpi')} />
              <Input placeholder="Author Name" {...register('authorName')} />
              <select {...register('license')} className="w-full rounded border border-gray-300 bg-white dark:bg-neutral-800 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="MIT">MIT</option>
                <option value="Apache-2.0">Apache-2.0</option>
                <option value="GPL-3.0">GPL-3.0</option>
              </select>
              <Input placeholder="GitHub Token" {...register('gitToken')} />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...register('generatePdf')} className="accent-blue-600" /> Generate PDF
              </label>
              <Button type="submit">Next</Button>
            </form>
            <Card>
              <MarkdownPreview source={preview} />
            </Card>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <Button onClick={() => setStep(1)} className="bg-transparent text-blue-600 px-0 underline shadow-none hover:text-blue-700">
              Back
            </Button>
            <Button onClick={handleSubmit(onSubmit)}>Generate</Button>
            <Card>
              <MarkdownPreview source={preview} />
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
