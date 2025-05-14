import ChangePasswordForm from "../components/molecules/ChangePasswordForm";
import LoginTemplate from "../components/templates/LoginTemplate";
import AuthShell from "../components/shell/AuthShell";

const ChangePassword = () => {
    return (
        <AuthShell>
            <LoginTemplate>
                <ChangePasswordForm />
            </LoginTemplate>
        </AuthShell>
    )
}

export default ChangePassword;