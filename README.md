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

- **เริ่ม development server**: `pnpm dev`
- **Build สำหรับ production**: `pnpm build`
- **Preview production build**: `pnpm preview`
- **รันเทส**: `pnpm test`
- **ตรวจสอบ type**: `pnpm check`
- **ตรวจสอบ type แบบ watch**: `pnpm check:watch`
- **Lint และ format โค้ด**: `pnpm lint`
- **Format โค้ด**: `pnpm format`

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

### การ Deploy

หากต้องการ deploy แอป อาจจำเป็นต้องติดตั้ง [adapter](https://kit.svelte.dev/docs/adapters) สำหรับ environment ที่ต้องการ

### Performance Optimization
- **Code Splitting**: แยกโค้ดเป็น chunks สำหรับโหลดเร็วขึ้น
- **PurgeCSS**: ลบ CSS ที่ไม่ใช้ใน production
- **Asset Optimization**: จัดการ fonts และ images แบบ efficient
- **Bundle Analysis**: ติดตาม bundle size
