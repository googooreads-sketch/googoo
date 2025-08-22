export function getPasswordStrength(password) {
  let strength = 0;

  // Scoring rules
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  // Determine strength label
  if (strength <= 2) return { label: 'Weak', color: 'red' };
  if (strength === 3 || strength === 4) return { label: 'Medium', color: 'orange' };
  if (strength === 5) return { label: 'Strong', color: 'green' };

  return { label: 'Weak', color: 'red' };
}
