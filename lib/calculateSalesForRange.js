export function calculateSalesForRange(sales, range) {

  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const dateRanges = {
    today: {
      start: todayStart,
      end: today,
    },
    week: {
      start: new Date(todayStart.getTime() - 7 * 24 * 60 * 60 * 1000),
      end: today,
    },
    month: {
      start: new Date(todayStart.getFullYear(), todayStart.getMonth()),
      end: today,
    },
  };

  const rangeDates = dateRanges[range];

  const filteredOrders = sales.filter((order) => {
    const orderDate = new Date(order.createdAt); // Assuming your order data includes a date property
    return orderDate >= rangeDates.start && orderDate <= rangeDates.end;
  });

  const totalSales = filteredOrders.reduce((total, order) => {
    // Assuming your order data includes a totalPrice property
    return total + order.total;
  }, 0);
  return totalSales;
}
