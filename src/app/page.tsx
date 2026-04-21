import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const App = async () => {

    const cookieStore = await cookies();

    const TOKEN = cookieStore.get("token")?.value;

    if (!TOKEN) redirect("/login");

    return redirect("/dashboard");

};

export default App;