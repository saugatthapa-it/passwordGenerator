function generatePassword() {
  const length = parseInt(document.getElementById('length').value) || 14;
  const useUpper = document.getElementById('upper').checked;
  const useLower = document.getElementById('lower').checked;
  const useNumber = document.getElementById('number').checked;
  const useSpecial = document.getElementById('special').checked;
  const resultDiv = document.getElementById('gen-result');
  resultDiv.textContent = '';

  if (length < 10) {
    resultDiv.textContent = 'Password length must be at least 10.';
    document.getElementById('generated-password').value = '';
    return;
  }
  if (length > 32) {
    resultDiv.textContent = 'Password length must not exceed 32.';
    document.getElementById('generated-password').value = '';
    return;
  }

  let chars = '';
  if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (useNumber) chars += '0123456789';
  if (useSpecial) chars += '!@#$%^&*()_+[]{}|;:,.<>?';

  if (!chars) {
    resultDiv.textContent = 'Select at least one character type.';
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
