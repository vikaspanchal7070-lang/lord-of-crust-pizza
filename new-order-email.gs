// ===== Lord of Crust: email on every new order =====
// 1) Put YOUR email(s) below.  2) Put a long random text in SECRET (keep it private).
const OWNER_EMAILS = ["PUT-YOUR-EMAIL@gmail.com"];
const SECRET = "PUT-A-LONG-RANDOM-TEXT-HERE";
const ADMIN_URL = "https://lordofcrust.com/admin.html";

// Supabase calls this automatically whenever a new order is saved.
function doPost(e) {
  try {
    if (!e || !e.parameter || e.parameter.key !== SECRET) return out("forbidden");
    const body = JSON.parse(e.postData.contents);
    if (body.type !== "INSERT" || body.table !== "orders") return out("ignored");
    sendOrderEmail(body.record);
    return out("ok");
  } catch (err) {
    return out("error: " + err);
  }
}

function out(text) {
  return ContentService.createTextOutput(text);
}

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function sendOrderEmail(o) {
  let items = o.items;
  if (typeof items === "string") {
    try { items = JSON.parse(items); } catch (e) { items = []; }
  }
  items = items || [];

  const rows = items.map(function (i) {
    return "<tr><td style='padding:4px 16px 4px 0'>" + esc(i.qty) + " x " + esc(i.name) +
           "</td><td align='right'>&#8377;" + esc(Number(i.price) * Number(i.qty)) + "</td></tr>";
  }).join("");

  let where = "Pickup at store";
  if (o.order_type === "Delivery") where = "Delivery to: " + esc(o.address);
  if (o.order_type === "Dine-in") where = "Dine-in, Table " + esc(o.table_no);

  const html =
    "<div style='font-family:Arial,sans-serif;max-width:480px'>" +
    "<h2 style='margin:0 0 4px'>New order " + esc(o.id) + "</h2>" +
    "<p style='margin:0 0 12px;color:#555'>" + esc(o.order_type) + " &middot; Total <b>&#8377;" + esc(o.total) + "</b></p>" +
    "<p style='margin:0 0 4px'><b>" + esc(o.customer) + "</b> &middot; <a href='tel:" + esc(o.phone) + "'>" + esc(o.phone) + "</a></p>" +
    "<p style='margin:0 0 12px'>" + where + "</p>" +
    "<table style='border-collapse:collapse;margin-bottom:12px'>" + rows + "</table>" +
    (o.notes ? "<p style='background:#fff6e0;padding:8px'><b>Note:</b> " + esc(o.notes) + "</p>" : "") +
    "<p><a href='" + ADMIN_URL + "' style='background:#E85D2C;color:#1C1410;padding:10px 16px;text-decoration:none;font-weight:bold'>Open admin panel</a></p>" +
    "</div>";

  MailApp.sendEmail({
    to: OWNER_EMAILS.join(","),
    subject: "New order " + o.id + " - Rs " + o.total + " (" + o.order_type + ")",
    htmlBody: html,
    name: "Lord of Crust Orders"
  });
}

// Run this once from the editor to check that emails reach you.
function testEmail() {
  sendOrderEmail({
    id: "LOCTEST", order_type: "Delivery", total: 760, customer: "Test Customer", phone: "9999999999",
    address: "Sector 8 - H-12, near park", table_no: "", notes: "less spicy",
    items: [{ name: "Classic Margarita", qty: 1, price: 350 }, { name: "Cold Coffee", qty: 2, price: 90 }]
  });
}
