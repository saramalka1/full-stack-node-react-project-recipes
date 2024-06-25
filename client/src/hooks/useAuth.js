import { useSelector } from "react-redux"
import { selectToken } from "../features/auth/authSlice"
import {jwtDecode} from "jwt-decode"
const useAuth = () => {
    const token = useSelector(selectToken)
    let isAdmin = false
    let isUser = false
    if (token) {
        const userDecoded = jwtDecode(token)
        console.log("userDecoded", userDecoded);
        const { _id, username, roles, name, email, phone } = userDecoded
        isAdmin = roles === "ADMIN"
        isUser = roles === "USER"

        return { _id,username, roles, name, email, phone, isAdmin, isUser }
    }
    return { _id: '', username: '', name: '', isAdmin, isUser, roles: '', email: '' }
}

export default useAuth