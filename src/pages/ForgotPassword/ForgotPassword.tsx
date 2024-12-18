import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// import './login.css';

const forgotSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

const ForgotPass: React.FC = () => {
  useEffect(() => {
    // 修改 body 样式
    document.body.style.overflowY = 'hidden';

    // 返回一个清理函数，在组件卸载时执行
    return () => {
      document.body.style.overflowY = '';
    };
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = (data: ForgotFormData) => {
    console.log('Login data:', data);
    // Here you would typically send the data to your backend
  };


  const images = [
    'https://picsum.photos/800/600?random=1',
    'https://picsum.photos/400/300?random=2',
    'https://picsum.photos/300/400?random=3',
    'https://picsum.photos/300/200?random=4',
    'https://picsum.photos/700/500?random=5',
    'https://picsum.photos/800/600?random=6',
    'https://picsum.photos/300/400?random=8',
    'https://picsum.photos/400/300?random=9',
    'https://picsum.photos/800/1000?random=10',
  ];

  return (
    <div className='relative overflow-hidden h-screen'>
      <div className="container mx-auto">
        
        {/* 瀑布流布局 */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((image, index) => (
            <div key={index} className="break-inside-avoid cursor-pointer">
              <img
                src={image} 
                alt={`Gallery image ${index + 1}`}
                className="w-full rounded-lg shadow-md hover:opacity-90 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* 登录框 */}
      <div className="w-2/5 max-md:w-4/5 mx-auto bg-[#fff] rounded-2xl p-6 z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-3xl font-bold mb-6">Frogot</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;