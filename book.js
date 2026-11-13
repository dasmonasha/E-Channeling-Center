const sel = document.getElementById('doctor');
const date = document.getElementById('date');
const box = document.getElementById('confirm');

sel.innerHTML = doctors.map((d, i) =>
  `<option value="${i}">${d.name} - ${d.spec} (${centers[d.center].name})</option>`).join('');

sel.value = new URLSearchParams(location.search).get('doc') || 0;

date.min = new Date().toISOString().split('T')[0];

function setError(id, message) {
  document.getElementById(id).textContent = message;
  return message === '';
}

document.getElementById('bookForm').onsubmit = e => {
  e.preventDefault();
  const name = document.getElementById('pname').value.trim();
  const phone = document.getElementById('phone').value.trim();

  const okName = setError('e1', name.length < 3 ? 'Enter your full name' : '');
  const okPhone = setError('e2', /^0\d{9}$/.test(phone) ? '' : 'Enter a valid 10-digit phone number');
  const okDate = setError('e3', date.value ? '' : 'Choose a date');
  if (!(okName && okPhone && okDate)) return;

  const d = doctors[sel.value];
  const ref = 'EC' + Math.floor(1000 + Math.random() * 9000);
  const safeName = name.replace(/[<>&"]/g, '');

  box.innerHTML = `
    <h2>✅ Booking Confirmed</h2>
    <p><strong>Ref:</strong> ${ref}</p>
    <p>${safeName}, ${d.name} (${d.spec})</p>
    <p>${centers[d.center].name}</p>
    <p>${date.value} at ${d.time}</p>
    <p><strong>Fee: Rs. ${d.fee}</strong></p>`;
  box.style.display = 'block';
  box.scrollIntoView({ behavior: 'smooth' });
};