import { useEffect, useState } from "react";
import useSession from "./use-session";

export default function useAuth() {
    const [userSession, setUserSession] = useState(false);
    const [user, setUser] = useState<User>();
    
    const { getUser } = useSession();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await getUser();

                if (user && user.id) {
                    setUserSession(true);
                    setUser(user);
                } else {
                    setUserSession(false);
                    // setUser(undefined);
                }
            } catch {
                setUserSession(false);
                setUser(undefined);
            }
        };

        checkUser();
    }, []);

    return { userSession, user };
}