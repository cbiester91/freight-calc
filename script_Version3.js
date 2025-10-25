const BASE_PER_M3 = 300;
const RUSH_FLAT = 75000000;
const MIN_REWARD = 300;
const el = id => document.getElementById(id);
const fmtISK = n => new Intl.NumberFormat('en-US').format(Math.max(0, Math.floor(n))) + ' ISK';

function calc() {
  const vol = Number(el('volume').value || 0);
  const amt = Number(el('amount').value || 0);
  const rush = document.querySelector('input[name="rush"]:checked')?.value === 'yes';
  const loc = el('location').value;
  if (vol > 325000) {
    alert('Maximum contract size is 325,000 m³');
    return;
  }
  const base = vol * BASE_PER_M3;
  const rushFee = rush ? RUSH_FLAT : 0;
  const total = Math.max(MIN_REWARD, base + rushFee);
  el('q-volume').textContent = vol ? vol.toLocaleString() + ' m³' : '—';
  el('q-base').textContent = fmtISK(base);
  el('q-rush').textContent = rush ? fmtISK(rushFee) : '0 ISK';
  el('q-total').textContent = fmtISK(total);
  el('q-location').textContent = loc;
  el('q-expiration').textContent = "7 days";
  el('q-days').textContent = "3";
  return total;
}

el('calc-btn').addEventListener('click', e => { e.preventDefault(); calc(); });
el('clear-btn').addEventListener('click', e => { 
  e.preventDefault(); 
  el('volume').value='';
  el('amount').value='';
  el('q-volume').textContent='—';
  el('q-base').textContent='—';
  el('q-rush').textContent='—';
  el('q-total').textContent='—';
  el('q-location').textContent='R-AG7W — R A G S T A R';
  el('q-expiration').textContent='7 days';
  el('q-days').textContent='3';
});

document.querySelectorAll('.copyable').forEach(span => {
  span.addEventListener('click', () => {
    navigator.clipboard.writeText(span.textContent.trim());
    span.style.color = '#72d572';
    setTimeout(()=>span.style.color='#ff4a3f',800);
  });
});