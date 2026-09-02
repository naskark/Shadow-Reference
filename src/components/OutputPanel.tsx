export function OutputPanel({
  id,
  label,
  value,
  rows = 10,
}: {
  id: string;
  label: string;
  value: string;
  rows?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        readOnly
        rows={rows}
        spellCheck={false}
        className="tool-textarea w-full resize-y rounded-xl px-4 py-3 text-sm leading-relaxed"
        aria-readonly="true"
      />
    </div>
  );
}
