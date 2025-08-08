# iMovie Theme Project

โปรเจค SvelteKit ที่ใช้ Skeleton UI framework พร้อม TailwindCSS

## วิธีการติดตั้งโปรเจค

### ข้อกำหนดระบบ

- Node.js (แนะนำเวอร์ชัน 18 หรือสูงกว่า)
- pnpm (Package Manager)

### ขั้นตอนการติดตั้ง

1. **โคลนโปรเจค**
   ```bash
   git clone <repository-url>
   cd imovietheme-xxx
   ```

2. **ติดตั้ง pnpm** (หากยังไม่มี)
   ```bash
   npm install -g pnpm
   ```

3. **ติดตั้ง dependencies**
   ```bash
   pnpm install
   ```

### การพัฒนา

เริ่มต้น development server:

```bash
pnpm dev
```

เปิดแอปในเบราว์เซอร์อัตโนมัติ:
```bash
pnpm dev --open
```

### คำสั่งที่สำคัญ

#### คำสั่งพัฒนา (Development)
- **เริ่ม development server**: `pnpm dev`
- **เริ่มพร้อมเปิดเบราว์เซอร์**: `pnpm dev --open`
- **เริ่มบนพอร์ตเฉพาะ**: `pnpm dev --port 3000`
- **ตรวจสอบ type**: `pnpm check`
- **ตรวจสอบ type แบบ watch**: `pnpm check:watch`
- **Lint และ format โค้ด**: `pnpm lint`
- **Format โค้ด**: `pnpm format`

#### คำสั่งผลิต (Production)
- **Build สำหรับ production**: `pnpm build`
- **Preview production build**: `pnpm preview`
- **Build และ preview**: `pnpm build && pnpm preview`

#### คำสั่งทดสอบ (Testing)
- **รันเทสทั้งหมด**: `pnpm test`
- **รันเทสแบบ watch mode**: `pnpm test:watch`
- **รันเทสพร้อม coverage**: `pnpm test:coverage`
- **รันเทส UI mode**: `pnpm test:ui`

#### คำสั่งฐานข้อมูล (Database)
- **สร้าง migration ใหม่**: `pnpm prisma migrate dev --name migration_name`
- **ใช้ migrations**: `pnpm prisma migrate deploy`
- **Push schema โดยตรง**: `pnpm prisma db push`
- **เปิด Prisma Studio**: `pnpm prisma studio`
- **Generate Prisma Client**: `pnpm prisma generate`
- **Reset ฐานข้อมูล**: `pnpm prisma migrate reset`
- **สร้างข้อมูลเริ่มต้น**: `pnpm prisma db seed`

#### คำสั่งจัดการ Dependencies
- **ติดตั้ง package ใหม่**: `pnpm add package-name`
- **ติดตั้ง dev dependency**: `pnpm add -D package-name`
- **อัปเดต dependencies**: `pnpm update`
- **ตรวจสอบ dependencies ที่ล้าสมัย**: `pnpm outdated`
- **ลบ node_modules และติดตั้งใหม่**: `pnpm clean && pnpm install`

#### คำสั่งเพิ่มเติม
- **วิเคราะห์ bundle size**: `pnpm build && pnpm analyze`
- **ตรวจสอบ security vulnerabilities**: `pnpm audit`
- **เช็คเวอร์ชัน pnpm**: `pnpm --version`

### โครงสร้างโปรเจค

- `src/routes/`: ไฟล์เส้นทาง (routing) ของ SvelteKit
- `src/lib/`: โค้ดที่แชร์ใช้งานร่วมกัน
- `src/app.postcss`: สไตล์ global และการตั้งค่า Tailwind
- `static/fonts/`: ฟอนต์สำหรับธีมต่างๆ

### เทคโนโลยีที่ใช้

- **SvelteKit**: Full-stack framework
- **Skeleton UI**: Component library บน TailwindCSS
- **TailwindCSS**: Utility-first CSS framework
- **TypeScript**: รองรับ TypeScript เต็มรูปแบบ
- **Highlight.js**: ไฮไลต์ syntax โค้ด
- **Floating UI**: ระบบ popup positioning

## ระบบและฟีเจอร์

### ระบบหลัก
- **ระบบหนัง**: จัดการหนัง รายละเอียด หมวดหมู่ และแท็ก
- **ระบบค้นหา**: ค้นหาหนังด้วยชื่อแบบ real-time
- **ระบบหมวดหมู่**: แยกหนังตามประเภทและแท็ก
- **ระบบผู้ดูแล**: จัดการเนื้อหา การตั้งค่า และผู้ใช้
- **ระบบโฆษณา**: จัดการโฆษณาแบบ floating และตำแหน่งต่างๆ
- **ระบบการแชร์**: แชร์เนื้อหาในโซเชียลมีเดีย

### ระบบจัดการผู้ดูแล (Admin Panel)
- **Dashboard**: ภาพรวมระบบและสถิติ
- **จัดการผู้ใช้**: เพิ่ม/ลบ/แก้ไขบัญชีผู้ใช้
- **ตั้งค่าทั่วไป**: จัดการข้อมูลเว็บไซต์พื้นฐาน
- **ตั้งค่า SEO**: จัดการ meta tags และ SEO
- **ตั้งค่าธีม**: เปลี่ยนธีมและฟอนต์
- **จัดการโฆษณา**: อัปโหลดและจัดการโฆษณา
- **ระบบความปลอดภัย**: Two-Factor Authentication (2FA)

### ระบบ SEO ขั้นสูง

#### การรองรับ SEO ระดับ Enterprise
- **Meta Tags ครบชุด**: Title, Description, Keywords, Open Graph, Twitter Cards
- **Structured Data (Schema.org)**:
  - Movie Schema สำหรับหน้าหนัง
  - WebSite Schema พร้อม SearchAction
  - BreadcrumbList Schema สำหรับเส้นทาง
- **Multi-language Support**: รองรับ locale th_TH
- **Canonical URLs**: ป้องกัน duplicate content
- **Robots Meta Tags**: ควบคุมการ index ของ search engine
- **Social Media Optimization**: Open Graph และ Twitter Cards แบบ rich media

#### ฟีเจอร์ SEO เฉพาะ
- **Dynamic SEO**: สร้าง meta tags อัตโนมัติสำหรับแต่ละหนัง
- **Image SEO**: Alt text และ meta tags สำหรับรูปภาพ
- **Video SEO**: Schema markup สำหรับเนื้อหาวิดีโอ
- **Performance SEO**: 
  - Preconnect และ DNS prefetch
  - Critical CSS loading
  - Font optimization
- **Content SEO**: 
  - Automatic description truncation
  - Keyword extraction จาก categories และ tags
  - Rich snippets support

#### เครื่องมือ SEO ในตัว
- **SEO Configuration Panel**: จัดการ SEO settings แบบ GUI
- **Auto-generated Sitemaps**: (พร้อมขยายในอนาคต)
- **Analytics Ready**: รองรับ Google Analytics และ Tag Manager (ไม่แนะนำถ้าเป็นเว็บ 18+)
- **Social Share Optimization**: ปุ่มแชร์พร้อม optimized content

### การรองรับ PWA
- **Theme Color**: กำหนดสีธีมสำหรับ mobile browsers
- **Mobile-first Design**: Responsive ทุกหน้าจอ
- **Viewport Optimization**: การตั้งค่า viewport ที่เหมาะสม
- **Security Headers**: X-Content-Type-Options, Referrer-Policy

### ระบบฐานข้อมูล
- **Prisma ORM**: จัดการฐานข้อมูลแบบ type-safe
- **Authentication**: Lucia Auth พร้อม session management
- **Security**: Argon2 password hashing และ OTP support

#### การเชื่อมต่อฐานข้อมูล

1. **สร้างไฟล์ .env** ในโฟลเดอร์หลัก:
   ```bash
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/imovietheme"
   
   # สำหรับ SQLite (สำหรับ development)
   # DATABASE_URL="file:./dev.db"
   ```

2. **ติดตั้งฐานข้อมูล**:
   ```bash
   # สร้าง schema ฐานข้อมูล
   pnpm prisma db push
   
   # หรือใช้ migrations
   pnpm prisma migrate dev
   
   # สร้างข้อมูลเริ่มต้น (ถ้ามี)
   pnpm prisma db seed
   ```

3. **จัดการฐานข้อมูล**:
   ```bash
   # เปิด Prisma Studio (GUI สำหรับดูข้อมูล)
   pnpm prisma studio
   
   # Reset ฐานข้อมูล
   pnpm prisma migrate reset
   
   # Generate Prisma Client
   pnpm prisma generate
   ```

#### รองรับฐานข้อมูล
- **PostgreSQL** (แนะนำสำหรับ production)
- **MySQL/MariaDB**
- **SQLite** (สำหรับ development)
- **SQL Server**

### การ Deploy

หากต้องการ deploy แอป อาจจำเป็นต้องติดตั้ง [adapter](https://kit.svelte.dev/docs/adapters) สำหรับ environment ที่ต้องการ

### Performance Optimization
- **Code Splitting**: แยกโค้ดเป็น chunks สำหรับโหลดเร็วขึ้น
- **PurgeCSS**: ลบ CSS ที่ไม่ใช้ใน production
- **Asset Optimization**: จัดการ fonts และ images แบบ efficient
- **Bundle Analysis**: ติดตาม bundle size

---

## 📞 ช่องทางติดต่อและการสนับสนุน

### ช่องทางการติดต่อหลัก

#### 💬 LINE Official Account
- **LINE ID**: `@123nqwwe`
- **เวลาตอบกลับ**: จันทร์-ศุกร์ 9:00-22:00 น.
- **บริการ**: สอบถามปัญหา, รายงานบั๊ก, ขอความช่วยเหลือ

#### 📧 Email Support
- **Technical Support**: `imovies.th@gmail.com`

#### 🌐 เว็บไซต์และโซเชียล
- **เว็บไซต์หลัก**: [https://movieforyou2.com](https://movieforyou2.com)

### 🆘 การรายงานปัญหาและข้อเสนอแนะ

#### วิธีรายงานบั๊กหรือปัญหา
1. **ผ่าน LINE Official**: ส่งข้อความพร้อมรายละเอียดปัญหา
2. **Email**: ส่งรายงานไปที่ `imovies.th@gmail.com`

#### ข้อมูลที่ควรระบุเมื่อรายงานปัญหา
- **รายละเอียดปัญหา**: อธิบายปัญหาที่เกิดขึ้น
- **ขั้นตอนการทำซ้ำ**: วิธีทำให้เกิดปัญหาซ้ำ
- **Environment**: Browser, OS, เวอร์ชัน Node.js
- **Screenshot หรือ Error Log**: หากมี

### 💡 การขอความช่วยเหลือ

#### การสอบถามทั่วไป
- **LINE Official Account** (แนะนำ)
- **Email Support** สำหรับปัญหาซับซ้อน

#### การร้องขอฟีเจอร์ใหม่
- **LINE Official** สำหรับข้อเสนะแนะเร่งด่วน
- **Email** สำหรับข้อเสนอแนะโดยละเอียด

---

### 📝 License และ Credits

**License**: MIT License  
**Author**: iMovie Theme Development Team  
**Version**: 1.0.0  
**Last Updated**: 2025

### 🙏 ขอบคุณ

ขอบคุณสำหรับการใช้งาน iMovie Theme! หากมีคำแนะนำหรือต้องการสนับสนุนโปรเจค สามารถติดต่อเราผ่านช่องทางที่แจ้งไว้ข้างต้น
