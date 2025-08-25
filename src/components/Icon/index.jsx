const Icon = ({ name, ...props }) => {
  return (
    <svg {...props}>
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
};
export default Icon;

// Example <Icon name="umbrella"(Цей id з sprite.svg) width={32} height={32} className={css.icon} або style={{color: 'red'}}/>
