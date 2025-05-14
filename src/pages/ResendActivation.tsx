import ResendActivationForm from "../components/molecules/ResendActivationForm";
import LoginTemplate from "../components/templates/LoginTemplate";
import AuthShell from "../components/shell/AuthShell";

const resendActivation = () => {
    return (
        <AuthShell>
            <LoginTemplate>
                <ResendActivationForm />
            </LoginTemplate>
        </AuthShell>
    )
}

export default resendActivation;