import  {useEffect} from "react";
import  {useNavigate} from "react-router-dom";

export default function CallbackPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.slice(1));
        const accessToken = params.get("access_token");

        if(accessToken) {
            localStorage.setItem("reddit_access_token", accessToken);
            navigate("/");
        }
    }, [navigate]);

    return(
        <div className="font-bold text-5xl"> Logging in...</div>
    );
}