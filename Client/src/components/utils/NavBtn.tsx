interface iNavBtnProps {
    isActive: Boolean
}

function NavBtn({ isActive }: iNavBtnProps) {
    return isActive ? <p>X</p> : <p>O</p>
}

export default NavBtn
