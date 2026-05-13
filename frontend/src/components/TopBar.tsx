import logo from "../assets/logo.png"

export default function TopBar() {
  return (
<div
  className="navbar"
  style={{
    background: "#2C2C2C",
    height: "53px",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    textAlignLast: "center"
  }}
>
  <img style={{ height: "53px" }} src={logo} alt="" />
</div>
  )
}