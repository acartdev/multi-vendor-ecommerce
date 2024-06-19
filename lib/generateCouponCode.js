export const generateCouponCode = (title='', expiryDate='') => {
  // Convert title to uppercase and remove spaces
  const formattedTitle = title.toUpperCase().replace(/\s/g, "");

  // Format the expiry date as DDMMYYYY
  const formattedExpiryDate = expiryDate
    .split("-")
    .reverse()
    .join("")

  // Combine the formatted title and expiry date to create the coupon code
  const couponCode = `${formattedTitle}-${formattedExpiryDate}`;

  return couponCode;
};
