🛒 Ecom – E-commerce Backend with NestJS

Một hệ thống backend mạnh mẽ được xây dựng với NestJS, hỗ trợ quản lý người dùng, sản phẩm, thanh toán và phân quyền.
Dự án này được thiết kế để dễ dàng mở rộng, bảo trì và triển khai trong môi trường thực tế.

📑 Mục lục

Giới thiệu

Tính năng chính

Cài đặt

Cách sử dụng

Cấu trúc thư mục

Đóng góp

Giấy phép

Liên hệ
🚀 Giới thiệu

Ecom là một nền tảng backend thương mại điện tử được phát triển bằng NestJS + TypeScript, hướng tới:

Hiệu suất cao và dễ mở rộng

Hỗ trợ i18n (đa ngôn ngữ: EN, VI)

Xử lý background jobs (queues, cronjobs)

Dễ dàng tích hợp với frontend (React, Vue, Angular…)
✨ Tính năng chính

🔐 Xác thực & phân quyền (JWT, Refresh Token, Permissions)

👤 Quản lý người dùng (đăng ký, đăng nhập, quên mật khẩu, OTP qua email)

📦 Quản lý sản phẩm & danh mục

💳 Thanh toán & hóa đơn (Payment queue, consumer)

🌍 Hỗ trợ đa ngôn ngữ (i18n)

🛠️ Cronjobs: Xoá refresh token cũ, quản lý session

📧 Email service: Gửi OTP & thông báo
⚙️ Cài đặt

Clone dự án:

git clone https://github.com/your-username/ecom.git
cd ecom
Cài dependencies:

npm install
# hoặc
yarn install
Chạy dự án ở chế độ phát triển:

npm run start:dev
🖥️ Cách sử dụng

Ví dụ sử dụng API:

# Đăng nhập
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com", "password":"123456"}'
Ví dụ code NestJS (trích từ app.controller.ts):

import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello from Ecom API!';
  }
}
📂 Cấu trúc thư mục
ecom/
├── src/
│   ├── app.module.ts
│   ├── auth/
│   ├── users/
│   ├── products/
│   ├── payments/
│   ├── cronjobs/
│   └── queues/
├── dist/              # build files
├── test-script.ts
├── package.json
├── tsconfig.json
└── .env
🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! 🚀

Fork repo

Tạo branch mới: git checkout -b feature/my-feature

Commit: git commit -m "Add my feature"

Push branch: git push origin feature/my-feature

Tạo Pull Request

Quy tắc code:

Tuân thủ Prettier & ESLint

Viết test khi thêm tính năng mới
