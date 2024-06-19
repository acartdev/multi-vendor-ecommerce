import OrderCard from "@/components/Order/OrderCard";
import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Order() {
  const orders = await getData(`orders`);

  const section = await getServerSession(authOptions);
  if (!section) return;

  const userId = section?.user?.id;
  //   console.log(orders);
  const userOrder = orders.filter((order) => order.userId === userId);

  return (
    <section className="py-12 bg-white rounded-sm dark:bg-slate-900 border shadow-md sm:py-16 lg:py-20">
      <div className="px-4 m-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-50 sm:text-3xl">
              Your Order
            </h1>
            <p className="mt-2 text-sm font-normal text-gray-600 dark:text-slate-400">
              Check the status of recent and old orders & discover more products
            </p>
          </div>

          <ul className="mt-8 space-y-5 lg:mt-12 sm:space-y-6 lg:space-y-10">
            {userOrder.map((order, i) => (
              <OrderCard key={i} order={order} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
