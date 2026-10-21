
// =============================
// NOZOdorAway - Shared JavaScript
// =============================
const SHOP_EMAIL = "odorawaynoz@gmail.com";
const CART_KEY = "nozodoraway_cart_v2";
const PRODUCTS = {
  "product-1": { id:"product-1", name:"Miếng dán khử mùi NOZ Hương chanh", price:49000, image:"images/chanh.jpg" },
  "product-2": { id:"product-2", name:"Miếng dán khử mùi NOZ Hương Oải Hương", price:49000, image:"images/tim.jpg" },
  "product-3": { id:"product-3", name:"Miếng dán khử mùi NOZ Hương Bạc Hà", price:49000, image:"images/bacha.jpg" }
};

function formatPrice(value){
  return value && value > 0 ? new Intl.NumberFormat("vi-VN").format(value)+"₫" : "[Giá sản phẩm]";
}
function getCart(){
  try { const v=JSON.parse(localStorage.getItem(CART_KEY)||"[]"); return Array.isArray(v)?v:[]; } catch(e){ return []; }
}
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartBadges(); }
function cartQuantity(){ return getCart().reduce((n,x)=>n+(Number(x.qty)||0),0); }
function addToCart(product, qty){
  const cart=getCart(); const found=cart.find(x=>x.id===product.id);
  if(found) found.qty=Math.min(99,(Number(found.qty)||0)+qty);
  else cart.push({...product,qty:Math.min(99,qty)});
  saveCart(cart); return cartQuantity();
}
function updateCartBadges(){ document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=cartQuantity()); }
function updatePriceLabels(){
  document.querySelectorAll('.product-info').forEach(scope=>{
    const price=Number(scope.dataset.productPrice||0);
    scope.querySelectorAll('[data-product-price-label]').forEach(el=>el.textContent=formatPrice(price));
  });
}

// Menu
const menuToggle=document.getElementById('menuToggle'); const navMenu=document.getElementById('navMenu');
if(menuToggle&&navMenu){ menuToggle.addEventListener('click',()=>{const open=navMenu.classList.toggle('active');menuToggle.setAttribute('aria-expanded',open)}); navMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navMenu.classList.remove('active');menuToggle.setAttribute('aria-expanded','false')})); }
const currentPage=document.body.dataset.page; if(currentPage) document.querySelectorAll('[data-nav]').forEach(a=>{if(a.dataset.nav===currentPage)a.classList.add('active')});

// Quantity + product detail cart
function productFromScope(scope){
  const id=scope?.dataset.productId || 'product-1';
  return { id, name:scope?.dataset.productName || PRODUCTS[id]?.name || 'NOZOdorAway', price:Number(scope?.dataset.productPrice||PRODUCTS[id]?.price||0), image:scope?.dataset.productImage || PRODUCTS[id]?.image || 'images/product-1.svg' };
}
document.querySelectorAll('[data-qty-input]').forEach(input=>{
  const scope=input.closest('.product-info')||document; const minus=scope.querySelector('[data-qty-minus]'); const plus=scope.querySelector('[data-qty-plus]');
  if(minus) minus.addEventListener('click',()=>input.value=Math.max(1,Number(input.value||1)-1));
  if(plus) plus.addEventListener('click',()=>input.value=Math.min(99,Number(input.value||1)+1));
  input.addEventListener('change',()=>{let v=Number(input.value)||1; input.value=Math.max(1,Math.min(99,v));});
});
document.querySelectorAll('[data-add-to-cart]').forEach(button=>button.addEventListener('click',()=>{
  const scope=button.closest('.product-info'); const input=scope?.querySelector('[data-qty-input]'); const qty=Math.max(1,Number(input?.value||1)); const total=addToCart(productFromScope(scope),qty); const notice=scope?.querySelector('[data-cart-notice]'); if(notice) notice.textContent=`Đã thêm ${qty} sản phẩm. Giỏ hàng hiện có ${total} sản phẩm.`;
}));
document.querySelectorAll('[data-buy-now]').forEach(button=>button.addEventListener('click',()=>{
  const scope=button.closest('.product-info'); const input=scope?.querySelector('[data-qty-input]'); addToCart(productFromScope(scope),Math.max(1,Number(input?.value||1))); window.location.href='dat-hang.html';
}));

// FAQ
document.querySelectorAll('.faq-item').forEach(item=>{const q=item.querySelector('.faq-question'),a=item.querySelector('.faq-answer');if(!q||!a)return;q.addEventListener('click',()=>{const active=item.classList.contains('active');document.querySelectorAll('.faq-item').forEach(o=>{o.classList.remove('active');const x=o.querySelector('.faq-answer');if(x)x.style.maxHeight=null});if(!active){item.classList.add('active');a.style.maxHeight=a.scrollHeight+'px'}})});

// Cart page
const cartEmpty=document.getElementById('cartEmpty'), cartContent=document.getElementById('cartContent'), cartItems=document.getElementById('cartItems');
const summaryQuantity=document.getElementById('summaryQuantity'), summarySubtotal=document.getElementById('summarySubtotal'), summaryTotal=document.getElementById('summaryTotal'), checkoutButton=document.getElementById('checkoutButton');
function calcTotal(cart){ return cart.reduce((n,x)=>n+(Number(x.price)||0)*(Number(x.qty)||0),0); }
function renderCartPage(){
  if(!cartEmpty||!cartContent)return; const cart=getCart(), has=cart.length>0; cartEmpty.hidden=has; cartContent.hidden=!has;
  if(cartItems){cartItems.innerHTML=cart.map(x=>`<article class="cart-line-item" data-cart-id="${x.id}"><img src="${x.image}" alt="${x.name}" data-image-slot="cart-${x.id}"><div><span class="eyebrow">NOZODORAWAY</span><h2>${x.name}</h2><p>Giá: <strong>${formatPrice(x.price)}</strong></p><div class="cart-line-actions"><span>Số lượng</span><div class="quantity-control"><button type="button" data-cart-minus>−</button><input type="number" min="1" max="99" value="${x.qty}" data-cart-qty><button type="button" data-cart-plus>+</button></div><button class="text-button danger" type="button" data-cart-remove>Xóa</button></div></div></article>`).join('');}
  const qty=cart.reduce((n,x)=>n+Number(x.qty||0),0), total=calcTotal(cart); if(summaryQuantity)summaryQuantity.textContent=qty; const totalText=total>0?formatPrice(total):'[Cập nhật giá]'; if(summarySubtotal)summarySubtotal.textContent=totalText;if(summaryTotal)summaryTotal.textContent=totalText;if(checkoutButton){checkoutButton.style.pointerEvents=has?'auto':'none';checkoutButton.style.opacity=has?'1':'0.5'};
}
if(cartItems) cartItems.addEventListener('click',e=>{const item=e.target.closest('[data-cart-id]');if(!item)return;const id=item.dataset.cartId;const cart=getCart();const x=cart.find(v=>v.id===id);if(!x)return;if(e.target.matches('[data-cart-minus]'))x.qty=Math.max(1,x.qty-1);if(e.target.matches('[data-cart-plus]'))x.qty=Math.min(99,x.qty+1);if(e.target.matches('[data-cart-remove]')){saveCart(cart.filter(v=>v.id!==id));renderCartPage();return;}saveCart(cart);renderCartPage();});
if(cartItems) cartItems.addEventListener('change',e=>{if(!e.target.matches('[data-cart-qty]'))return;const item=e.target.closest('[data-cart-id]'),cart=getCart(),x=cart.find(v=>v.id===item.dataset.cartId);if(!x)return;x.qty=Math.max(1,Math.min(99,Number(e.target.value)||1));saveCart(cart);renderCartPage();});

// Order page
const orderQuantity=document.getElementById('orderQuantity'), orderTotal=document.getElementById('orderTotal'), orderItems=document.getElementById('orderItems'), orderForm=document.getElementById('orderForm');
function renderOrderSummary(){const cart=getCart(),qty=cart.reduce((n,x)=>n+Number(x.qty||0),0),total=calcTotal(cart);if(orderQuantity)orderQuantity.textContent=qty;if(orderTotal)orderTotal.textContent=total>0?formatPrice(total):'[Cập nhật giá]';if(orderItems)orderItems.innerHTML=cart.map(x=>`<div class="order-line-item"><img src="${x.image}" alt="${x.name}" data-image-slot="order-${x.id}"><div><strong>${x.name}</strong><span>Số lượng: ${x.qty} · ${formatPrice(x.price)}</span></div></div>`).join('');}
if(orderForm) orderForm.addEventListener('submit',e=>{e.preventDefault();const cart=getCart();if(!cart.length){alert('Giỏ hàng đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng.');window.location.href='san-pham.html';return;}const name=document.getElementById('customerName').value.trim(),phone=document.getElementById('customerPhone').value.trim(),email=document.getElementById('customerEmail').value.trim(),address=document.getElementById('customerAddress').value.trim(),note=document.getElementById('customerNote').value.trim();const lines=cart.map((x,i)=>`${i+1}. ${x.name} | SL: ${x.qty} | Đơn giá: ${formatPrice(x.price)}`);const total=calcTotal(cart);const body=['ĐƠN HÀNG NOZODORAWAY','',`Khách hàng: ${name}`,`Số điện thoại: ${phone}`,`Email: ${email||'Không cung cấp'}`,`Địa chỉ: ${address}`,'','SẢN PHẨM:',...lines,'',`Tổng dự kiến: ${total>0?formatPrice(total):'[Shop xác nhận giá]'}`,'',`Ghi chú: ${note||'Không có'}`].join('\n');const url='https://mail.google.com/mail/?view=cm&fs=1&to='+encodeURIComponent(SHOP_EMAIL)+'&su='+encodeURIComponent(`Đơn hàng NOZOdorAway - ${name}`)+'&body='+encodeURIComponent(body);window.open(url,'_blank','noopener,noreferrer');});

const currentYear=document.getElementById('currentYear');if(currentYear)currentYear.textContent=new Date().getFullYear();
updateCartBadges();updatePriceLabels();renderCartPage();renderOrderSummary();
