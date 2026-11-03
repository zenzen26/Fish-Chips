import { Link } from 'react-router-dom';

// `to` renders a router Link, `href` a plain anchor, neither a <button>.
export default function Button({ to, href, variant = 'primary', className = '', children, ...rest }) {
  const classes = `btn btn-${variant} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
