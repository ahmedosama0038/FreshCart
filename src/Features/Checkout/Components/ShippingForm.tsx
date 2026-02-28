"use client";

import { MapPin, Info, Home, Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckoutSchema,
  CheckoutSchemaValues,
} from "../Schema/CheckoutSchema";
import ErrorMessage from "@/Features/Auth/Components/Error/ErrorMessage";
import {
  Checkoutsession,
  CreateCashOrder,
} from "../Servers/server.actions";
import { useAppDaspatch, useAppSelector } from "@/Store/Store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { clearCart } from "@/Features/Cart/Store/Cart.slice";
import { useEffect, useState } from "react";
import { AddressCard } from "@/Features/Profile/Components/AddressCard";
import { GetLoggedUserAddresses } from "@/Features/Profile/Server/profile.action";

type Address = {
  _id: string;
  name: string;
  city: string;
  details: string;
  phone: string;
};

export const ShippingForm = ({
  selcted,
}: {
  selcted: "cash" | "card";
}) => {
  const { cartId } = useAppSelector((state) => state.cart);
  const router = useRouter();
  const dispatch = useAppDaspatch();

  const [userAddresses, setUserAddresses] = useState<Address[]>([]);
  const [selectedAddrId, setSelectedAddrId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const form = useForm<CheckoutSchemaValues>({
    resolver: zodResolver(CheckoutSchema),
    mode: "onChange",
  });

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = form;

 
/* ---------------- Load Addresses ---------------- */

  useEffect(() => {
    async function load() {
      
      interface ApiResponse {
        status?: string;
        success?: boolean;
        data?: Address[];
        addresses?: Address[];
      }

      // 2. بنعمل cast للـ res بالنوع اللي لسه معرّفينه
      const res = await GetLoggedUserAddresses() as ApiResponse;

      // 3. دلوقتي تقدر تستخدم الخصائص من غير الخطوط الحمراء ومن غير any
      if (res.status === "success" && res.data) {
        setUserAddresses(res.data);
      } else if (res.success && res.addresses) {
        setUserAddresses(res.addresses);
      }
    }
    load();
  }, []);
  const handleSelectAddress = (addr: Address) => {
    setSelectedAddrId(addr._id);

    setValue("city", addr.city, { shouldValidate: true });
    setValue("details", addr.details, { shouldValidate: true });
    setValue("phone", addr.phone, { shouldValidate: true });

    toast.info("Saved address selected");
  };

  /* ---------------- Submit ---------------- */

  const onSubmit: SubmitHandler<CheckoutSchemaValues> =
    async (values) => {
      if (!cartId) {
        toast.error("Cart not found");
        return;
      }

      try {
        setLoading(true);

        if (selcted === "cash") {
          const response = await CreateCashOrder({
            cartId,
            shippingAddress: values,
          });

          if (response.status === "success") {
            toast.success("Order placed successfully 🎉");

            dispatch(clearCart());
            reset();

            setTimeout(() => {
              router.push("/Orders");
            }, 1500);
          }
        } else {
          const res = await Checkoutsession({
            cartId,
            shippingAddress: values,
            url: location.origin,
          });

          if (res.status === "success") {
            dispatch(clearCart());
            toast.loading("Redirecting to secure payment...");

            setTimeout(() => {
              window.location.href = res.session.url;
            }, 1200);
          }
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

  /* ---------------- UI ---------------- */
return (
    <div className="space-y-10 transition-colors duration-500">

      {/* Saved Addresses */}

      {userAddresses.length > 0 && (
        <div className="animate-in fade-in duration-500">

          <div className="flex items-center gap-2 mb-5">
            <Home size={18} className="text-gray-400 dark:text-gray-500" />
            <h3 className="text-xs font-black tracking-widest text-gray-500 dark:text-gray-400 uppercase">
              Select Saved Address
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {userAddresses.map((addr) => (
              <AddressCard
                key={addr._id}
                address={addr}
                isCheckout
                isSelected={selectedAddrId === addr._id}
                onSelect={() => handleSelectAddress(addr)}
              />
            ))}
          </div>

          <div className="flex items-center gap-4 mt-8">
            <div className="h-px bg-gray-100 dark:bg-gray-800 flex-1" />
            <span className="text-[10px] font-bold text-gray-300 dark:text-gray-600 uppercase">
              Or Enter Manually
            </span>
            <div className="h-px bg-gray-100 dark:bg-gray-800 flex-1" />
          </div>
        </div>
      )}

      {/* Shipping Form */}

      <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-100 dark:shadow-none overflow-hidden transition-all">

        {/* Header */}

        <div className="bg-gradient-to-r from-green-600 to-emerald-500 dark:from-[#064e3b] dark:to-emerald-900 p-6 text-white flex items-center gap-3">
          <MapPin size={22} />
          <h2 className="text-lg font-bold">
            Shipping Details
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-10 space-y-6"
        >

          {/* Info Box */}
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 p-4 rounded-2xl flex gap-3">
            <Info size={18} className="text-blue-500 dark:text-blue-400 mt-1" />
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Please verify your delivery information carefully.
            </p>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-bold mb-2 dark:text-gray-200">
              City *
            </label>
            <input
              {...register("city")}
              placeholder="e.g. Cairo"
              className="w-full p-4 rounded-xl bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-green-500 dark:focus:border-green-600 outline-none transition"
            />
            {errors.city && (
              <ErrorMessage message={errors.city.message} />
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-bold mb-2 dark:text-gray-200">
              Street Address *
            </label>
            <input
              {...register("details")}
              placeholder="Building, Street..."
              className="w-full p-4 rounded-xl bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-green-500 dark:focus:border-green-600 outline-none transition"
            />
            {errors.details && (
              <ErrorMessage message={errors.details.message} />
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-bold mb-2 dark:text-gray-200">
              Phone Number *
            </label>
            <input
              {...register("phone")}
              placeholder="01xxxxxxxxx"
              className="w-full p-4 rounded-xl bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-green-500 dark:focus:border-green-600 outline-none transition"
            />
            {errors.phone && (
              <ErrorMessage message={errors.phone.message} />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid || loading}
            className="w-full py-4 rounded-xl font-bold text-white bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-green-100 dark:shadow-none"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Processing...
              </>
            ) : selcted === "cash" ? (
              "Place Order"
            ) : (
              "Proceed to Payment"
            )}
          </button>

        </form>
      </div>
    </div>
  );
};
