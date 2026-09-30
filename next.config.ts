import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    // يحدد المجلد الحالي كمجلد رئيسي، أو يمكنك تعديله ليشير للمجلد الأب حسب بنية مشروعك
    root: process.cwd(),
  },
};

export default nextConfig;
