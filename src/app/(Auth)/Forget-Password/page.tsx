import ForgetPassowrdScreen from "@/Features/Auth/Screens/ForgetPassowrd.Screen";

export const metadata = {
  title: 'Forgetpassword', 
};
export default function ForgetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-evenly gap-5 bg-gray-50 px-4  dark:bg-[#050505]">
      <ForgetPassowrdScreen/>
    </div>
  )
}
