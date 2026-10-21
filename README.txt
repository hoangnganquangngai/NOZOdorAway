NOZOdorAway - WEBSITE DA TRANG
================================

1. CHAY WEBSITE
- Mo thu muc bang Visual Studio Code.
- Cai extension Live Server.
- Mo index.html.
- Chuot phai > Open with Live Server.

2. CAC TRANG
- index.html: Trang chu
- gioi-thieu.html: Gioi thieu
- san-pham.html: Ve san pham
- cach-su-dung.html: Cach su dung
- blog.html: Danh sach 6 bai blog
- blog-1.html ... blog-6.html: 6 bai viet rieng
- faq.html: FAQ
- gio-hang.html: Gio hang
- dat-hang.html: Dat hang

3. CAP NHAT GIA SAN PHAM
Mo script.js, tim:
const PRODUCT_PRICE = 0;
Vi du gia 49.000d:
const PRODUCT_PRICE = 49000;

4. CAP NHAT GMAIL SHOP
Mo script.js, tim:
const SHOP_EMAIL = "yourshop@gmail.com";
Thay bang Gmail that cua shop.

Luu y:
Website chay HTML/CSS/JS local KHONG the tu dong gui email an toan ma khong co backend/dich vu email.
Ban hien tai se mo cua so Gmail voi noi dung don hang da soan san.
Nguoi dung can bam Send trong Gmail.

Neu muon gui tu dong hoan toan:
- Co the tich hop EmailJS, FormSubmit, Formspree, Firebase Functions hoac backend rieng.
- Khong nen dat mat khau Gmail hoac SMTP password trong JavaScript frontend.

5. CAP NHAT ZALO
Trong moi file HTML, tim:
class="zalo-floating"
va thay href="#" bang link Zalo that.

6. THAY ANH SAN PHAM
Dat anh that vao thu muc images.
Vi du:
images/nozodoraway.png
Sau do thay:
src="images/product-placeholder.svg"
bang:
src="images/nozodoraway.png"

7. MANG XA HOI / FOOTER
Cac link Facebook, TikTok, Instagram va thong tin lien he dang la placeholder.
Hay thay bang thong tin that cua shop.

8. GIO HANG
Gio hang luu so luong bang localStorage.
Du lieu se duoc giu khi chuyen trang trong cung trinh duyet.


=== CẬP NHẬT THEO YÊU CẦU 21/10/2026 ===
1. 3 ảnh nổi bật trang chủ: images/product-1.svg, product-2.svg, product-3.svg. Click sẽ tới san-pham.html#product-1/2/3.
2. Ảnh full phần giải pháp chăm sóc giày: images/home-care-full.svg. Có thể thay bằng JPG/PNG/WebP và sửa src trong index.html (data-image-slot="home-care-full").
3. Trang sản phẩm có 3 card; trang chi tiết: san-pham-1.html, san-pham-2.html, san-pham-3.html. Mỗi trang có thêm giỏ hàng và mua ngay.
4. Blog có tác giả, giờ/ngày đăng và lượt xem. Muốn sửa lượt xem, tìm data-view-count trong blog.html hoặc blog-1.html ... blog-6.html rồi thay số giữa thẻ <strong>.
5. Các khu vực ảnh sản phẩm/blog chính đã dùng thẻ <img> và có data-image-slot để dễ tìm/thay.
6. Giá 3 sản phẩm: sửa data-product-price="0" trong từng trang san-pham-1.html ... và đồng thời sửa price trong PRODUCTS ở script.js nếu muốn giỏ hàng tính tiền.
