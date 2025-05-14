import ActivateUserForm from "../components/molecules/ActivateUserForm";
import LoginTemplate from "../components/templates/LoginTemplate";
import AuthShell from "../components/shell/AuthShell";

const ActivateAccount = () => {
    return (
        <AuthShell>
            <LoginTemplate>
                <ActivateUserForm />
            </LoginTemplate>
        </AuthShell>
    )
}

export default ActivateAccount;