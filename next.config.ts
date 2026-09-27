import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  turbopack: {
    // يحدد المجلد الحالي كمجلد رئيسي، أو يمكنك تعديله ليشير للمجلد الأب حسب بنية مشروعك
    root: path.join(__dirname, '.'), 
  },
};

export default nextConfig;
