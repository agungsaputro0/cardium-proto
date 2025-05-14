import EnsyclocardiumContent from "../components/molecules/EnsyclocardiumContent";
import LoginTemplate from "../components/templates/LoginTemplate";
import AuthShell from "../components/shell/AuthShell";

const Ensyclocardium = () => {
    return (
        <AuthShell>
            <LoginTemplate>
                <EnsyclocardiumContent />
            </LoginTemplate>
        </AuthShell>
    )
}

export default Ensyclocardium;