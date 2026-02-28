// app/Profile/layout.tsx

import { MyAccountLayout } from "@/Features/Profile/Components/AccountLayout";


export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <MyAccountLayout>
      
      {children} 
    </MyAccountLayout>
  );
}