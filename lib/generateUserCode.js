export function generateUserCode(prefix, fullName) {
  // ลบช่องว่างจากชื่อเต็มและแบ่งออกเป็นส่วนย่อย
  const initials = fullName.split(' ').map(name => name[0]).join('').toUpperCase();
  // ดึงเวลาปัจจุบัน
  const now = new Date();
  const timeCode = `${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}${now
    .getHours()
    .toString()
    .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;

  // รวมคำนำหน้า ชื่อย่อ และรหัสเวลาเพื่อสร้างรหัสที่ไม่ซ้ำกัน
  const userCode = `${prefix}-${initials}-${timeCode}`;

  return userCode;
}

// การใช้ตัวอย่าง:
// const prefix = "LFF";
// const fullName = "MUKE JOHN";

// const code = generateUserCode(prefix, fullName);
// console.log(code); // Output: LFF-MJ-20240512150223
