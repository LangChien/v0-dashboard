'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUser } from '@/hooks/use-account'
import { useFormSubmit } from '@/hooks/use-form-submit'
import { protectedRequest } from '@/services/routes/protected.request'
import { UpdateProfileSchema } from '@/services/schemas/protected.schema'
import { UpdateProfileDto } from '@/services/types/protected.dto'
import { User } from '@/services/types/user.dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function ProfileInfo({ profile }: { profile: User }) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const setUser = useUser((state) => state.setUser)
  const form = useForm<UpdateProfileDto>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
      avatar: profile?.avatar ?? '',
    },
  })

  const onSubmit = useFormSubmit(async (values: UpdateProfileDto) => {
    const res = await protectedRequest.updateProfile(values)
    setUser(res.data)
    return res
  }, form.setError)

  const handleChangeAvatar = () => {
    toast.warning('Chức năng này đang được phát triển!')
    // fileInputRef.current?.click()
  }
  return (
    <div className='space-y-6'>
      {/* Avatar Section */}
      <Card>
        <CardHeader>
          <CardTitle>Ảnh đại diện</CardTitle>
          <CardDescription>Cập nhật ảnh đại diện của bạn</CardDescription>
        </CardHeader>
        <CardContent className='flex items-center gap-6'>
          <Avatar className='w-24 h-24'>
            <AvatarImage src={profile?.avatar || ''} alt={profile?.fullName} />
            <AvatarFallback className='text-lg'>
              {profile?.firstName?.[0]}
              {profile?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>

          <div className='space-y-2'>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={handleChangeAvatar}
                disabled={isUploading}
                className='flex items-center gap-2'
              >
                <Upload className='w-4 h-4' />
                {isUploading ? 'Đang tải...' : 'Tải ảnh lên'}
              </Button>
              {profile?.avatar && (
                <Button variant='outline' size='sm'>
                  Xóa ảnh
                </Button>
              )}
            </div>
            <p className='text-sm text-gray-500'>JPG, PNG hoặc WebP. Tối đa 5MB.</p>
          </div>

          <input
            ref={fileInputRef}
            type='file'
            accept='image/jpeg,image/png,image/webp'
            className='hidden'
          />
        </CardContent>
      </Card>

      {/* Profile Form */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin cá nhân</CardTitle>
          <CardDescription>Cập nhật thông tin cá nhân của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ</FormLabel>
                      <FormControl>
                        <Input placeholder='Nhập họ' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên</FormLabel>
                      <FormControl>
                        <Input placeholder='Nhập tên' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='avatar'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avartar</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhập dịa chỉ hình ảnh'
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full md:w-auto'>
                Cập nhật thông tin
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
