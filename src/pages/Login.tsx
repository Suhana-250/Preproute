import { useState } from "react";
import { loginUser } from "../api/authApi";
import { saveToken, saveUser, type AuthUser as ServiceAuthUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import testtubeman from "../assets/test-tubeman.svg";
import preproute from "../assets/preproute.svg";
function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userId: "",
        password: ""
    })
    const [error, setError] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (
        e: React.BaseSyntheticEvent
    ) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData);
            const token = response.data.data.token;
            const user = response.data.data.user;
            saveToken(token);
            saveUser(user as unknown as ServiceAuthUser);
            navigate("/dashboard");
        }
        catch {
            setError("Invalid credentials");
        }
    }
    return (
        <div className="bg-[#F7FBFF] min-h-screen flex">
            <div className="basis-[50%] flex justify-center items-center">
                <img src={testtubeman} width={467} height={400} alt="Test tubeman" />
            </div>
            <div className="basis-[50%] flex flex-col justify-center px-[100px] bg-white border-[#60A5FA] border-[0.5px] rounded-[8px] m-[20px]">
                <img src={preproute} width={133} height={33} alt="preproute" />
                <h1 className="text-[1.5rem] font-bold text-[#1E3A5F] mb-1">Login</h1>
                <p className="text-[0.875rem] text-[#6B7280] mb-6">
                    Use your company provided Login credentials.
                </p>
                <form onSubmit={handleSubmit} className="w-full max-w-[400px]">
                    <label className="block text-[0.875rem] font-medium text-[#374151] mb-1">
                        User ID
                    </label>
                    <input
                        type="text"
                        name="userId"
                        placeholder="Enter User ID"
                        className="w-full px-[16px] py-[12px] mb-4 rounded-[8px] text-[#374151] placeholder-[#D1D5DB] border-[0.5px] border-[#9CA3AF] text-[0.95rem] font-medium outline-none focus:border-[#5988EF]"
                        onChange={handleChange}
                    />

                    {/* Password */}
                    <label className="block text-[0.875rem] font-medium text-[#374151] mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        className="w-full px-[16px] py-[12px] rounded-[8px] text-[#374151] placeholder-[#D1D5DB] border-[0.5px] border-[#9CA3AF] text-[0.95rem] font-medium outline-none focus:border-[#5988EF]"
                        onChange={handleChange}
                    />

                    {/* Forgot password */}
                    <div className="flex justify-start mt-2 mb-5">
                        <button type="button" className="text-[0.85rem] text-[#5988EF] hover:underline cursor-pointer bg-transparent border-none p-0">
                            Forgot password?
                        </button>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mb-3">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#5988EF] rounded-[8px] text-[1rem] font-medium text-white h-[48px] cursor-pointer hover:bg-[#4a79e0] transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login