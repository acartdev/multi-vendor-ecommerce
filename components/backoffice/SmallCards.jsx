import React from "react";
import SmallCard from "./SmallCard";
import { CheckCheck, Loader2, RefreshCcw, ShoppingCart } from "lucide-react";

export default function SmallCards({ orders }) {


  const totalCountOrders = orders.length.toLocaleString().padStart(2, "0");

  const status = {
    pending: "PENDING",
    processing: "PROCESSING",
    shipped: "SHIPPED",
    delivered: "DELIVERED",
    canceled: "CANCELED",
  };

  const getOrdersCountByStatus = (status) => {
    const filteredOrders = orders.filter(
      (order) => order.orderStatus === status
    );
    const count = filteredOrders.length.toLocaleString().padStart(2, "0");
    return count;
  };
  const pendingOrdersCount = getOrdersCountByStatus(status.pending);
  const processingOrdersCount = getOrdersCountByStatus(status.processing);
  const shippedOrdersCount = getOrdersCountByStatus(status.shipped);
  const deliveredOrdersCount = getOrdersCountByStatus(status.delivered);
  const canceledOrdersCount = getOrdersCountByStatus(status.canceled);

  const orderStatus = [
    {
      title: "Total Orders",
      number: totalCountOrders,
      iconBg: "bg-green-600",
      icon: ShoppingCart,
    },
    {
      title: "Orders Pending",
      number: pendingOrdersCount,
      iconBg: "bg-blue-600",
      icon: Loader2,
    },
    {
      title: "Orders Processing",
      number: processingOrdersCount,
      iconBg: "bg-orange-600",
      icon: RefreshCcw,
    },
    {
      title: "Orders Delivered",
      number: deliveredOrdersCount,
      iconBg: "bg-purple-600",
      icon: CheckCheck,
    },
  ];
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2
      md:grid-cols-3 lg:grid-cols-4 gap-4 py-8"
    >
      {orderStatus.map((data, i) => (
        <SmallCard key={i} className=" bg-green-600" data={data} />
      ))}
    </div>
  );
}
