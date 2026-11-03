import { useEffect, useId, useRef, useState } from 'react';
import Icon from './Icon';

// Accessible custom drop-down (select-only combobox + listbox) that replaces the browser's default list.
// Keys: Up/Down/Home/End move, Enter/Space pick, Esc closes, a letter jumps to the next match.
export default function Select({ label, name, options, value, onChange }) {
  const id = useId();
  const rootRef = useRef(null);
  const selected = options.indexOf(value);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(selected);

  useEffect(() => {
    if (!open) return undefined;
    const closeOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [open]);

  const openList = () => {
    setActive(selected);
    setOpen(true);
  };

  const commit = (index) => {
    onChange(options[index]);
    setOpen(false);
  };

  const move = (next) => {
    if (!open) openList();
    else setActive(Math.max(0, Math.min(options.length - 1, next)));
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        move(open ? active + 1 : selected);
        break;
      case 'ArrowUp':
        event.preventDefault();
        move(open ? active - 1 : selected);
        break;
      case 'Home':
        event.preventDefault();
        move(0);
        break;
      case 'End':
        event.preventDefault();
        move(options.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (open) commit(active);
        else openList();
        break;
      case 'Escape':
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        break;
      case 'Tab':
        setOpen(false);
        break;
      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
          const letter = event.key.toLowerCase();
          const start = open ? active + 1 : selected + 1;
          const order = [...options.keys()].map((_, i) => (start + i) % options.length);
          const match = order.find((i) => options[i].toLowerCase().startsWith(letter));
          if (match !== undefined) {
            if (!open) setOpen(true);
            setActive(match);
          }
        }
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <label id={`${id}-label`} htmlFor={`${id}-trigger`} className="field-label">
        {label}
      </label>
      <button
        type="button"
        id={`${id}-trigger`}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-activedescendant={open ? `${id}-option-${active}` : undefined}
        className="select-trigger"
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
      >
        <span>{value}</span>
        <Icon name="chevron" className={`h-5 w-5 shrink-0 transition-[rotate] duration-200 ${open ? 'rotate-180' : ''}`} strokeWidth={3} />
      </button>

      {open && (
        <ul id={`${id}-list`} role="listbox" aria-labelledby={`${id}-label`} className="select-list">
          {options.map((option, index) => (
            <li
              key={option}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={index === selected}
              data-active={index === active}
              className="select-option"
              onPointerEnter={() => setActive(index)}
              onClick={() => commit(index)}
            >
              {option}
              {index === selected && <Icon name="check" className="h-5 w-5" strokeWidth={3} />}
            </li>
          ))}
        </ul>
      )}

      <input type="hidden" name={name} value={value} />
    </div>
  );
}
