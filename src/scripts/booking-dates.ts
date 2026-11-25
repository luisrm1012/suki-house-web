const toISO = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const plusOneDay = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return toISO(new Date(y, m - 1, d + 1));
};

/** Busca [data-in] y [data-out] dentro de `form`: mínimo hoy; salida ≥ llegada + 1 noche. */
export function bindBookingDates(form: ParentNode): void {
  const inp = form.querySelector<HTMLInputElement>('[data-in]');
  const out = form.querySelector<HTMLInputElement>('[data-out]');
  if (!inp || !out) return;
  const today = toISO(new Date());
  inp.min = today;
  out.min = plusOneDay(today);
  inp.addEventListener('change', () => {
    if (!inp.value) return;
    const min = plusOneDay(inp.value);
    out.min = min;
    if (out.value && out.value < min) out.value = min;
  });
}
