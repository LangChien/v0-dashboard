'use client'

import { PasswordInput } from '@/components/common/custom-input'
import { Button } from '@/components/ui/button'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFormSubmit } from '@/hooks/use-form-submit'
import { USER_ROLE_LABELS, USER_STATUS_LABELS } from '@/services/enum-label'
import { accountRequest } from '@/services/routes/account.request'
import {
  CreateUserSchema,
  UpdateUserSchema,
  USER_ROLE,
  USER_STATUS,
} from '@/services/schemas/user.schema'
import { CreateUserDto, UpdateUserDto, User } from '@/services/types/user.dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

// Tách phần form fields thành component tái sử dụng
const UserFormFields = (props: {
  form: any
  onSubmit: (values: any) => void
  isUpdate?: boolean
}) => {
  const { form, onSubmit, isUpdate } = props
  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((oninvalid: any) => onSubmit(oninvalid))}
          // className='grid gap-5 grid-cols-1 md:grid-cols-2'
          className='space-y-5 w-full'
        >
          <div className='gap-5 grid grid-cols-2 w-full'>
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>Họ</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập Họ' {...field} />
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
                  <FormLabel className='capitalize'>Tên</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập Tên' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='capitalize'>email</FormLabel>
                <FormControl>
                  <Input type='email' placeholder='Nhập email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='capitalize'>Mật khẩu</FormLabel>
                <FormControl>
                  <PasswordInput placeholder='Nhập mật khẩu (tùy chọn)' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='avatar'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='capitalize'>Avatar</FormLabel>
                <FormControl>
                  <Input
                    type='url'
                    placeholder='Nhập dường dẫn'
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormDescription>Tùy chọn</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='gap-5 grid grid-cols-2 w-full'>
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>Vai trò</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isUpdate}
                      onValueChange={(e) => field.onChange(e)}
                      defaultValue={field.value || USER_ROLE.NORMAL_USER}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn vai trò' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(USER_ROLE)
                          .filter((role) => role != USER_ROLE.SYSTEM_ADMIN)
                          .map((role) => (
                            <SelectItem value={role} key={`role-${role}`}>
                              {USER_ROLE_LABELS[role]}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>Trạng thái</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(e) => field.onChange(e)}
                      defaultValue={field.value || USER_STATUS.ACTIVE}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn trạng thái' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(USER_STATUS).map((userStatus) => (
                          <SelectItem value={userStatus} key={`userStatus-${userStatus}`}>
                            {USER_STATUS_LABELS[userStatus]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' className='w-full md:col-span-2'>
            {isUpdate ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </form>
      </Form>
    </FormProvider>
  )
}

export const UpdateUserForm = ({ account }: { account: User }) => {
  const form = useForm<UpdateUserDto>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: account,
  })
  const handleSubmit = useFormSubmit(
    async (account: User, values: UpdateUserDto) => accountRequest.update(account.id, values),
    form.setError,
    '/dashboard/account',
  )
  return (
    <UserFormFields form={form} onSubmit={(values) => handleSubmit(account, values)} isUpdate />
  )
}

export const CreateUserForm = () => {
  const form = useForm<CreateUserDto>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      avatar: undefined,
      password: undefined,
      status: USER_STATUS.ACTIVE,
      role: USER_ROLE.NORMAL_USER,
    },
  })
  const onSubmit = useFormSubmit(
    async (values: CreateUserDto) => accountRequest.create(values),
    form.setError,
    '/dashboard/account',
  )
  return <UserFormFields form={form} onSubmit={onSubmit} />
}
