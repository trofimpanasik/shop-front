import styles from './container.module.scss';

export const Container = ({children, className}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {children}
    </div>
  )
}