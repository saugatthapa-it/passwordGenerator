function generatePassword() {
  const length = Math.max(6, Math.min(32, parseInt(document.getElementById('length').value) || 14));
  const useUpper = document.getElementById('upper').checked;
  const useLower = document.getElementById('lower').checked;
  const useNumber = document.getElementById('number').checked;
  const useSpecial = document.getElementById('special').checked;

  let chars = '';
  if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (useNumber) chars += '0123456789';
  if (useSpecial) chars += '!@#$%^&*()_+[]{}|;:,.<>?';

  if (!chars) {
    document.getElementById('generated-password').value = '';
    return;
  }

  let password = '';
  // Ensure at least one of each selected type
  let required = [];
  if (useUpper) required.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  if (useLower) required.push('abcdefghijklmnopqrstuvwxyz');
  if (useNumber) required.push('0123456789');
  if (useSpecial) required.push('!@#$%^&*()_+[]{}|;:,.<>?');
  for (let set of required) {
    password += set[Math.floor(Math.random() * set.length)];
  }
  for (let i = password.length; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  // Shuffle password
  password = password.split('').sort(() => Math.random() - 0.5).join('');
  document.getElementById('generated-password').value = password;
}

function copyGeneratedPassword() {
  const gen = document.getElementById('generated-password');
  if (gen && gen.value) {
    gen.select();
    document.execCommand('copy');
  }
}
