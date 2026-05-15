import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { create{{Name}}InputSchema, type Create{{Name}}Input } from '../schemas';
import { useCreate{{Name}} } from '../hooks/use{{Name}}';

export function {{Name}}Form() {
  const create = useCreate{{Name}}();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Create{{Name}}Input>({
    resolver: zodResolver(create{{Name}}InputSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await create.mutateAsync(data);
      reset();
      toast.success('Criado');
    } catch {
      toast.error('Falha ao criar');
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-3" aria-label="Criar {{name}}">
      {/* TODO: trocar pelo campo real do schema */}
      <div>
        <Input
          {...register('field' as never)}
          aria-invalid={errors ? 'true' : 'false'}
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>Salvar</Button>
    </form>
  );
}
