import { HomeHeader } from '@/components/pages/home-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Clock, Github, Mail, MapPin, Phone, Shield, Star, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800'>
      {/* Header */}
      <header className='relative z-10 bg-black/20 backdrop-blur-sm border-b border-white/10'>
        <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Image
              src='/logo-removebg.png'
              alt='Blue Moon Logo'
              width={60}
              height={60}
              className='object-contain'
            />
            <div>
              <h1 className='text-xl font-bold text-white'>BLUE MOON</h1>
              <p className='text-sm text-blue-200'>Quản lý chung cư</p>
            </div>
          </div>
          <nav className='hidden md:flex items-center gap-6'>
            <Link href='#features' className='text-white hover:text-blue-300 transition-colors'>
              Tính năng
            </Link>
            <Link href='#about' className='text-white hover:text-blue-300 transition-colors'>
              Giới thiệu
            </Link>
            <Link href='#contact' className='text-white hover:text-blue-300 transition-colors'>
              Liên hệ
            </Link>
            <HomeHeader />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className='relative py-20 px-4'>
        <div className='absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:20px_20px]'></div>
        <div className='container mx-auto text-center relative z-10'>
          <div className='max-w-4xl mx-auto'>
            <Image
              src='/logo-removebg.png'
              alt='Blue Moon Logo'
              width={200}
              height={200}
              className='mx-auto mb-8 object-contain'
            />
            <h1 className='text-5xl md:text-7xl font-bold text-white mb-6'>BLUE MOON</h1>
            <p className='text-xl md:text-2xl text-blue-200 mb-4'>
              Hệ thống quản lý chung cư thông minh
            </p>
            <p className='text-lg text-gray-300 mb-8 max-w-2xl mx-auto'>
              Giải pháp toàn diện cho việc quản lý chung cư hiện đại, giúp ban quản lý quản lý, theo
              dõi hiệu quả
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                target='_blank'
                rel='noopener noreferrer'
                passHref
                href='https://github.com/LangChien/blue-moon-v2'
              >
                <Button size='lg' className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3'>
                  <Github className='w-5 h-5 mr-2 inline' />
                  Xem mã nguồn
                </Button>
              </Link>
              <Button
                size='lg'
                variant='outline'
                className='border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3'
              >
                Xem demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id='features' className='py-20 px-4 bg-black/20'>
        <div className='container mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>Tính năng nổi bật</h2>
            <p className='text-xl text-gray-300 max-w-2xl mx-auto'>
              Hệ thống quản lý chung cư Blue Moon cung cấp đầy đủ các tính năng cần thiết
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <Card className='bg-white/10 border-white/20 backdrop-blur-sm'>
              <CardHeader className='text-center'>
                <Building2 className='w-12 h-12 text-blue-400 mx-auto mb-4' />
                <CardTitle className='text-white'>Quản lý căn hộ</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className='text-gray-300 text-center'>
                  Theo dõi thông tin chi tiết về từng căn hộ, cư dân và tình trạng sử dụng
                </CardDescription>
              </CardContent>
            </Card>

            <Card className='bg-white/10 border-white/20 backdrop-blur-sm'>
              <CardHeader className='text-center'>
                <Users className='w-12 h-12 text-blue-400 mx-auto mb-4' />
                <CardTitle className='text-white'>Quản lý cư dân</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className='text-gray-300 text-center'>
                  Hệ thống thông tin cư dân, đăng ký tạm trú, tạm vắng một cách dễ dàng
                </CardDescription>
              </CardContent>
            </Card>

            <Card className='bg-white/10 border-white/20 backdrop-blur-sm'>
              <CardHeader className='text-center'>
                <Shield className='w-12 h-12 text-blue-400 mx-auto mb-4' />
                <CardTitle className='text-white'>An ninh & Bảo mật</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className='text-gray-300 text-center'>
                  Bảo mật thông tin cư dân, quản lý truy cập và an ninh khu vực chung cư
                </CardDescription>
              </CardContent>
            </Card>

            <Card className='bg-white/10 border-white/20 backdrop-blur-sm'>
              <CardHeader className='text-center'>
                <Clock className='w-12 h-12 text-blue-400 mx-auto mb-4' />
                <CardTitle className='text-white'>Tiện ích 24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className='text-gray-300 text-center'>
                  Web socket thông báo tức thì, hỗ trợ ban quản lý 24/7
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id='about' className='py-20 px-4'>
        <div className='container mx-auto'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-4xl font-bold text-white mb-6'>Về Blue Moon</h2>
              <p className='text-lg text-gray-300 mb-6'>
                Blue Moon là hệ thống quản lý chung cư hiện đại, được thiết kế để đáp ứng mọi nhu
                cầu của cư dân và ban quản lý. Với giao diện thân thiện và tính năng đa dạng, chúng
                tôi cam kết mang đến trải nghiệm sống tốt nhất.
              </p>
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <Star className='w-5 h-5 text-yellow-400' />
                  <span className='text-gray-300'>Giao diện thân thiện, dễ sử dụng</span>
                </div>
                <div className='flex items-center gap-3'>
                  <Star className='w-5 h-5 text-yellow-400' />
                  <span className='text-gray-300'>Bảo mật thông tin tuyệt đối</span>
                </div>
                <div className='flex items-center gap-3'>
                  <Star className='w-5 h-5 text-yellow-400' />
                  <span className='text-gray-300'>Hỗ trợ 24/7</span>
                </div>
                <div className='flex items-center gap-3'>
                  <Star className='w-5 h-5 text-yellow-400' />
                  <span className='text-gray-300'>Tích hợp đầy đủ tính năng</span>
                </div>
              </div>
            </div>
            <div className='relative'>
              <div className='bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10'>
                <Image
                  src='/logo-removebg.png'
                  alt='Blue Moon Logo'
                  width={300}
                  height={300}
                  className='mx-auto object-contain'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id='contact' className='py-20 px-4 bg-black/20'>
        <div className='container mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>Liên hệ với chúng tôi</h2>
            <p className='text-xl text-gray-300'>Sẵn sàng hỗ trợ bạn 24/7</p>
          </div>

          <div className='grid md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
            <Card className='bg-white/10 border-white/20 backdrop-blur-sm text-center'>
              <CardHeader>
                <Phone className='w-8 h-8 text-blue-400 mx-auto mb-2' />
                <CardTitle className='text-white'>Điện thoại</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-300'>+84 349 174 556</p>
              </CardContent>
            </Card>

            <Card className='bg-white/10 border-white/20 backdrop-blur-sm text-center'>
              <CardHeader>
                <Mail className='w-8 h-8 text-blue-400 mx-auto mb-2' />
                <CardTitle className='text-white'>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-300'>langtienk4@gmail.com</p>
              </CardContent>
            </Card>

            <Card className='bg-white/10 border-white/20 backdrop-blur-sm text-center'>
              <CardHeader>
                <MapPin className='w-8 h-8 text-blue-400 mx-auto mb-2' />
                <CardTitle className='text-white'>Địa chỉ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-300'>
                  Số 1 Đại Cồ Việt, phường Bách Khoa, quận Hai Bà Trưng, TP. Hà Nội
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-8 px-4 bg-black/40 border-t border-white/10'>
        <div className='container mx-auto text-center'>
          <div className='flex items-center justify-center gap-3 mb-4'>
            <Image
              src='/logo-removebg.png'
              alt='Blue Moon Logo'
              width={40}
              height={40}
              className='object-contain'
            />
            <span className='text-xl font-bold text-white'>BLUE MOON</span>
          </div>
          <p className='text-gray-400'>© 2024 Blue Moon. Tất cả quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  )
}
