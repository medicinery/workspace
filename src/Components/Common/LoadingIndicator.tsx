import "./LoadingIndicator.scss"

export default function LoadingIndicator(props: { small?: boolean }) {
   return <div className={`LoadingIndicatorComponent ${props.small ? "small" : ""}`}></div>
}
