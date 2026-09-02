export function Editor({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 10,
  readOnly = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  rows?: number;
  readOnly?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        readOnly={readOnly}
        spellCheck={false}
        className="tool-textarea w-full resize-y rounded-xl px-4 py-3 text-sm leading-relaxed"
      />
    </div>
  );
}
