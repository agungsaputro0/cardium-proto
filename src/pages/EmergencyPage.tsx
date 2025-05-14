import Emergency from "../components/molecules/Emergency";
import HomeTemplate from "../components/templates/HomeTemplate";
import AppShell from "../components/shell/Appshell";
const EmergencyPage = () => {
    return (
            <AppShell>
                <HomeTemplate>
                        <Emergency />
                </HomeTemplate>
            </AppShell>
    )
}

export default EmergencyPage;