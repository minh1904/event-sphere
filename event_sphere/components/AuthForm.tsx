'use client';

import Image from 'next/image';
import { registerUser } from '@/lib/auth';

import { signIn } from 'next-auth/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Link from 'next/link';
import { toast } from 'sonner';
import FormField from './FormField';
import { useRouter } from 'next/navigation';

type FormType = 'sign-in' | 'sign-up';

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = authFormSchema(type);

  const router = useRouter();

  const isSignIn = type === 'sign-in';
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === 'sign-up') {
        await registerUser({
          name: values.name!,
          email: values.email,
          password: values.password,
          role: 'user',
        });
        toast.success('Tạo tài khoản thành công');
        router.push('/sign-in');
      } else {
        toast.success('Đăng nhập thành công');
        router.push('/');
      }
      console.log(values);
    } catch (error: unknown) {
      console.log(error);
      toast.error(`Xuất hiện lỗi: ${error.message}`);
    }
  }
  return (
    <div className="flex flex-col items-center gap-1   ">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-2xl mb-1.5">XIN CHÀO</h2>
        <p className="font-semibold">Đăng nhập để tham gia</p>
        <p className="font-semibold">EventSphere</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
          {!isSignIn && (
            <FormField
              control={form.control}
              name="name"
              placeholder="Tên"
              type="text"
            />
          )}

          <FormField
            control={form.control}
            name="email"
            placeholder="Nhập email"
            type="email"
          />

          <FormField
            control={form.control}
            name="password"
            placeholder="Nhập mật khẩu"
            type="password"
          />

          <Button
            type="submit"
            className="rounded-[3px] w-56 h-12 text-mc cursor-pointer mt-6"
          >
            {isSignIn ? 'Đăng nhập' : 'Đăng ký'}
          </Button>
        </form>
        <Button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="rounded-[3px] border-[1px] border-black w-56 h-12 bg-mc text-black cursor-pointer"
        >
          {isSignIn ? 'Đăng nhập bằng Google' : 'Đăng ký bằng Google'}{' '}
          <Image
            src="/imgs/google.svg"
            alt="logo google"
            width={18}
            height={18}
          />
        </Button>
      </Form>
      <div className="flex flex-col items-center">
        <p>{isSignIn ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}</p>
        <Link
          href={isSignIn ? '/sign-up' : '/sign-in'}
          className="font-semibold"
        >
          {isSignIn ? 'Đăng ký ngay' : 'Đăng nhập ngay'}
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
