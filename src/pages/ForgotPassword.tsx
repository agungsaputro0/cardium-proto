import ForgotPasswordForm from "../components/molecules/ForgotPasswordForm";
import LoginTemplate from "../components/templates/LoginTemplate";
import AuthShell from "../components/shell/AuthShell";

const ForgotPassword = () => {
    return (
        <AuthShell>
            <LoginTemplate>
                <ForgotPasswordForm />
            </LoginTemplate>
        </AuthShell>
    )
}

export default ForgotPassword;