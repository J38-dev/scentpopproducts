document.addEventListener("DOMContentLoaded", () => {

const menuBtn = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });
}
  
  /* ================= FILTER DROPDOWNS ================= */
  function toggleFilter(element) {
    const dropdown = element.nextElementSibling;

    // close others
    document.querySelectorAll(".filter-dropdown").forEach(d => {
      if (d !== dropdown) d.classList.remove("show");
    });

    // toggle current
    dropdown.classList.toggle("show");
  }

  // make global for onclick
  window.toggleFilter = toggleFilter;

  // close when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".filter-item")) {
      document.querySelectorAll(".filter-dropdown")
        .forEach(d => d.classList.remove("show"));
    }
  });

  /* ================= CART SYSTEM ================= */
  let total = 0;

  function changeQty(btn, amount) {
    const qtySpan = btn.parentElement.querySelector(".qty");
    let qty = parseInt(qtySpan.innerText);

    const price = parseInt(
      btn.closest(".product-card")
         .querySelector(".price")
         .dataset.price
    );

    qty += amount;
    if (qty < 0) qty = 0;

    qtySpan.innerText = qty;

    updateTotal();
  }

  window.changeQty = changeQty;

  function updateTotal() {
    total = 0;

    document.querySelectorAll(".product-card").forEach(card => {
      const qty = parseInt(card.querySelector(".qty").innerText);
      const price = parseInt(card.querySelector(".price").dataset.price);

      total += qty * price;
    });

    document.getElementById("total").innerText = total;
  }

  /* ================= CHECKOUT ================= */
  function openCheckout() {
    document.getElementById("modal-total").innerText = total;
    document.getElementById("checkoutModal").style.display = "flex";
  }

  function closeCheckout() {
    document.getElementById("checkoutModal").style.display = "none";
  }

  window.openCheckout = openCheckout;
  window.closeCheckout = closeCheckout;

  /* ================= FILTER SYSTEM ================= */
  function applyFilters() {
    const min = parseInt(document.getElementById("minPrice").value) || 0;
    const max = parseInt(document.getElementById("maxPrice").value) || Infinity;

    const stock = document.querySelector('input[name="stock"]:checked').value;

    document.querySelectorAll(".product-card").forEach(card => {
      const price = parseInt(card.querySelector(".price").dataset.price);

      // default stock = in
      const stockStatus = card.dataset.stock || "in";

      let show = true;

      // price filter
      if (price < min || price > max) show = false;

      // stock filter
      if (stock === "in" && stockStatus !== "in") show = false;
      if (stock === "out" && stockStatus !== "out") show = false;

      card.style.display = show ? "block" : "none";
    });
  }

  window.applyFilters = applyFilters;

});